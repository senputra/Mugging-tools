import { AuthService } from './../../service/auth.service';
import { GroupHomePage } from "./../group-home/group-home";
import { User } from "./../../models/User";
import { Group } from "./../../models/Group";
import { WelcomePage } from "./../welcome/welcome";
import { CreateTodoPage } from "./../create-todo/create-todo";
import { TodoItems } from "./../../models/TodoItems";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import firebase from "firebase";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  fdbItems: Observable<any[]>;
  fdbArray = [];
  page_title: string = "My Fuhrer";

  groups: Group[] = [];

  isOnline = true;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private fdb: AngularFireDatabase,
    private toastCtrl: ToastController,
    public authService:AuthService
  ) {}

  ionViewDidLoad() {
    /**
     * The very first thing when the users open the app
     * is to check if they are logged in.
     * If yes, 1. sync the user data with firebase
     * 2. save the user data in local storage
     *
     * If no, go to welcome page to log in or make an account
     */

    //checking if this is the first login.
    // if(this.isFirstLoad(storage)){
    // as if this is not the first load

    if(this.authService.authenticated){
      console.log("Authenticated");
    }else{
      this.authService.googleLogin();
      console.log("nope");
    }

    let user: any;
    //check local userdata
    this.storage.get("user").then(userData => {
      // console.log("userdata :" + JSON.stringify(userData));
      if (userData != null) {
        // console.log("Homepage : " + userData);
        // User is signed in.
        this.page_title = userData["name"];

        //check if device is online and update user
        if (this.isOnline) {
          this.fdb
            .object("/users/" + userData.id)
            .valueChanges()
            .subscribe(_data => {
              let onlineUserData: any = _data;
              if (onlineUserData.lastChangeTime < userData.lastChangeTime) {
                this.fdb
                  .list("/users/" + userData.id)
                  .update("lastChangeTime", userData.lastChangeTime);
                this.fdb
                  .list("/users/" + userData.id)
                  .update("groupIds", userData.groupIds);
                user = userData;
              } else {
                user = _data;
              }
              this.storage.set("user", user);
              this.setupGroups(user);
            });
        }
        // user = userData;

        //Toast greeting the user
        let toast = this.toastCtrl.create({
          message: "Welcome back " + userData["name"],
          duration: 3000,
          position: "bottom"
        });
        toast.present();
      } else {
        // No userData is signed in.
        this.navCtrl.setRoot(WelcomePage);
      }
    });
  }

  demoAddGroupId(user: User) {
    if (user.groupIds == null) {
      user.groupIds = [];
    }
    user.groupIds.push("GP123456789");
    user.groupIds.push("GP123456780");
    return user;
  }
  //this is to get group from database and local
  //using the latest and sync the older version.
  setupGroups(user: User) {
    //user = this.demoAddGroupId(user);
    let groupIds: string[] = user.groupIds;
    //console.log(groupIds);
    if (this.isOnline) {
      this.fdb
        .object("/users/" + user.id)
        .valueChanges()
        .subscribe(_data => {
          let newGroups = [];
          groupIds = _data["groupIds"];
          groupIds.forEach(groupId => {
            let subs = this.fdb
              .object<Group>("/groups/" + groupId)
              .valueChanges()
              .subscribe(_data => {
                console.log(groupId);
                if (_data != null) {
                  newGroups.push(_data);
                  this.storage.set(groupId, _data);
                }
                subs.unsubscribe();
              });
          });
          this.groups = newGroups;
        });
    } else {
      groupIds.forEach(groupId => {
        this.storage.get(groupId).then(_group => {
          this.groups.push(_group);
        });
      });
    }
  }

  isFirstLoad(storage: Storage): boolean {
    //check if there is some data saved in the DB
    let firstLoad = storage.get("firstLoad");

    return firstLoad == null || firstLoad ? true : false;
  }

  cardClick(group: any) {
    this.navCtrl.push(GroupHomePage, { parameter: group });
  }

  addTodoList() {}

  addGroup() {}
}
