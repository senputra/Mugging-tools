import { Timeline } from "./../../models/Timeline";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { UserId } from "../../models/UserId";

/**
 * Generated class for the CreateGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-create-timeline",
  templateUrl: "create-timeline.html"
})
export class CreateTimelinePage {
  gid: string;
  uid: string;
  adminId: UserId;
  timelineTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }
  /**
   * At create timeline page, tiemlines are created by getting user input of the timeline's name
   * 1. get gid
   * 2. get uid
   * 3. get user input
   * 4. compile the data into a timeline object and push it into 
   *    1. /timelines/ folder
   *    2. /group/{gid}/timelineIds/ folder
   */
  ionViewDidLoad() {
    //create group function here

    //-- Step 1. --get the gid from the passed parameter---
    this.gid = this.navParams.get("parameter");

    //-- Step 2. --get the uID from afAuth------------
    let subscription = this.afAuth.authState.subscribe(_res => {
      this.adminId = {
        uid: _res.uid,
        name: _res.displayName
      }
    })

  }


  doCreateAgenda() {
    //-- Step 3. --get user input---------------
    let newTId = this.afs.createId(); //Create new Timelin Id for the new timeline

    //Ths is a document to store the timeline title and tid
    //Path '/timelines/{timelineID}'
    let timelineRef = this.afs.doc("/timelines/" + newTId);
    timelineRef.set(
      {
        "timelineId": newTId,
        "title": this.timelineTitle,
      }
    )

    //Ths is a collection to store the adminIDs
    //Path '/timelines/{timelineID}/adminIds/'
    let adminIdsRef = this.afs.collection("/timelines/" + newTId + "/adminIds/");
    adminIdsRef.add(this.adminId);

    //This is to add timelineIds to the group
    //Path '/groupIds/{groupId}/timelineIds/' [collection]
    let groupRef = this.afs.doc("/groups/" + this.gid + "/timelineIds/" + newTId);
    groupRef.set(
      {
        "timelineId": newTId,
        "title": this.timelineTitle,
      }
    )
  }

  demoCreateActivity() {
    // console.log(this.id);
    // let days: Day[] = [];
    // let matters: Matter[] = [];
    // matters.push(new Matter("Exam", "", "", true));
    // matters.push(new Matter("Quiz", "", "", true));

    // days.push(new Day(new Date().getTime(), matters));
    // days.push(new Day(new Date().getTime(), matters));

    // if (this.id != null) {
    //   this.fdb.object("/timelines/" + this.id).update({ days: days });
    // }
  }

  // demoCreateTimeline() {
  //   this.storage.get("user").then(_user => {
  //     if (_user.id == null) {
  //       this.adminId = _user.uid;
  //       console.log("use uid");
  //     } else {
  //       this.adminId = _user.id;
  //       console.log("use id");
  //     }

  //     let adminId = [this.adminId];
  //     let title = "Physics H2";
  //     let id = "TL123456789";
  //     let newTimeline: Timeline = new Timeline(title, adminId, id);
  //     this.upload(newTimeline);
  //   });
  // }

  // upload(timeline: Timeline) {
  //   //local----------
  //   this.storage.set(timeline.id, timeline);

  //   this.storage.get(timeline.id).then(_data => {
  //     console.log(_data);
  //   });
  //   //------------------

  //   // //online----------------
  //   // this.fdb.object("/timelines/" + timeline.id).set(timeline);
  //   // this.fdb
  //   //   .object("/timelines/" + timeline.id)
  //   //   .valueChanges()
  //   //   .subscribe(_data => {
  //   //     let newTimeline: any = _data;
  //   //     console.log("fdb" + newTimeline.title);
  //   //     console.log(_data);
  //   //     this.id = newTimeline.id;
  //   //   });
  //   // let sub = this.fdb
  //   //   .list<string>("/groups/" + this.groupId + "/timelineIds/")
  //   //   .valueChanges()
  //   //   .subscribe(_data => {
  //   //     let newTimelineIds = _data;
  //   //     newTimelineIds.push(timeline.id);
  //   //     this.fdb
  //   //       .list<string[]>("/groups/" + this.groupId)
  //   //       .update("timelineIds", newTimelineIds);
  //   //     sub.unsubscribe();
  //   //   });
  //   // //----------------
  // }
}
