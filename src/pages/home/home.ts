import { GroupHomePage } from "./../group-home/group-home";

import { WelcomePage } from "./../welcome/welcome";
import { CreateTodoPage } from "./../create-todo/create-todo";
import { TodoItems } from "./../../models/TodoItems";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { ToastController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import firebase from "firebase";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";

import { User } from "./../../models/User";
import { Group } from "./../../models/Group";
import { GroupId } from "./../../models/GroupId";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  fdbItems: Observable<any[]>;
  fdbArray = [];
  page_title: string = "My Fuhrer";

  groupIds: Observable<GroupId[]>;

  isOnline = true;

  user: any;
  userData: User;

  constructor(
    public navCtrl: NavController,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
  ) { }

  ionViewDidLoad() {
    /**
     * Initialization of the app:
     * 1. Check if user exists (if no the go to welcome page)
     * 2. Use the uid to get the groups from Firestore (Setting up the group)
     */

    // Step 1.
    this.user = this.afAuth.authState;
    this.user.subscribe(_data => {
      if (_data == null) {
        console.log("Not logged in");
        this.navCtrl.setRoot(WelcomePage);
      } else {

        this.page_title = _data.displayName;

        console.log("Authenticated");
        //Toast greeting the user
        let toast = this.toastCtrl.create({
          message: "Welcome back!",
          duration: 3000,
          position: "bottom"
        });
        toast.present();

        // Step 2.
        this.setupGroups(_data.uid);
      }
    })

  }

  demoAddGroupId(user: User) {
    if (user.groupIds == null) {
      user.groupIds = [];
    }
    user.groupIds.push("GP123456789");
    user.groupIds.push("GP123456780");
    return user;
  }

  //getting groups from database (input is the userId)
  setupGroups(uid: string) {
    let groupRef = this.afs.collection("/users/"+uid+"/groupIds");
    this.groupIds = groupRef.valueChanges();
    this.groupIds.subscribe(_data => {console.log(_data)});
  }

  cardClick(groupId: GroupId) {
    this.navCtrl.push(GroupHomePage, { parameter: groupId });
  }

  addTodoList() { }

  addGroup() { }
}
