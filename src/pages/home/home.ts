import { Group } from "./../../models/Group";
import { WelcomePage } from "./../welcome/welcome";
import { CreateTodoPage } from "./../create-todo/create-todo";
import { TodoDetailsPage } from "./../todo-details/todo-details";
import { TodoItems } from "./../../models/TodoItems";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import firebase, { User } from "firebase";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  items: TodoItems[] = [];
  fdbItems: Observable<any[]>;
  fdbArray = [];
  page_title: string = "My Fuhrer";

  groups: Group[] = [];

  isOnline = true;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private fdb: AngularFireDatabase,
    private toastCtrl: ToastController
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

    let user: any;

    this.storage.get("user").then(userData => {
      // console.log("userdata :" + JSON.stringify(userData));
      if (userData != null) {
        // console.log("Homepage : " + userData);
        // User is signed in.

        this.page_title = userData["name"];

        user = userData;

        //Toast greeting the user
        let toast = this.toastCtrl.create({
          message: "Welcome back " + userData["name"],
          duration: 3000,
          position: "bottom"
        });
        toast.present();
      } else {
        // No userData is signed in.
        this.navCtrl.push(WelcomePage);
      }
    });

    // set a key/value
    this.storage.set("name", "Max");

    // Or to get a key/value pair
    this.storage.get("name").then(val => {
      console.log("Your age is", val);
    });
  }

  //this is to get group from database and local
  //using the latest and sync the older version.
  setupGroups(user: User) {
    let groupIds: string[] = user.getGroupIds();

    if (this.isOnline) {
      groupIds.forEach(groupId => {
        this.fdb
          .object<Group>("/groups/" + groupId)
          .valueChanges()
          .subscribe(_data => {
            this.groups.push(_data);
            this.storage.set(groupId,_data);
          });
      });
    }else{
      groupIds.forEach(groupId => {
        this.storage.get(groupId).then(_group =>{
          this.groups.push(_group);
        })
      })
    }

    // this.fdb
    //   .list<TodoItems>("/myItems/")
    //   .valueChanges()
    //   .subscribe(_datas => {
    //     let temp: TodoItems[] = [];
    //     _datas.forEach(element => {
    //       temp.push(
    //         new TodoItems(
    //           element.id,
    //           element.date,
    //           element.todos,
    //           element.title,
    //           element.subTitle,
    //           element.isDeadlineSet,
    //           element.deadlineDate,
    //           element.deadlineTime
    //         )
    //       );
    //     });
    //     this.items = temp;
    //     console.log(this.items);
    //   });
  }

  isFirstLoad(storage: Storage): boolean {
    //check if there is some data saved in the DB
    let firstLoad = storage.get("firstLoad");

    return firstLoad == null || firstLoad ? true : false;
  }

  cardClick(item: TodoItems) {
    this.navCtrl.push(TodoDetailsPage, { parameter: item });
  }

  addTodoList() {
    this.navCtrl.push(CreateTodoPage, { params: this.items });
  }

  addGroup() {}
}
