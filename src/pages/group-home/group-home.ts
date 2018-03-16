import { AuthService } from './../../service/auth.service';
import { TimelineHomePage } from "./../timeline-home/timeline-home";
import { Timeline } from "./../../models/Timeline";
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CreateTimelinePage } from "../create-timeline/create-timeline";
import { AngularFirestore } from 'angularfire2/firestore';
import { GroupId } from '../../models/GroupId';
import { Observable } from '@firebase/util';
import { TimelineId } from '../../models/TimelineId'

/**
 * Generated class for the GroupHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-group-home",
  templateUrl: "group-home.html"
})
/*
* At Group home page, the contents of group are displayed
* 1. Get gid from parameters passed on from main HomePage
* 2. Show the timelines [focus on this one first], chatrooms, and timeschedule
* 3. When the timeline or othr stuff is clicked, go to those pages
* 4. long press to delete
*/
export class GroupHomePage {
  page_title: string;
  timelineIds: Observable<TimelineId[]>;
  gid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
  ) { }

  ionViewDidLoad() {
    //-- Step 1. ----------------------------------------
    let groupId: GroupId = this.navParams.get("parameter");
    this.page_title = groupId.title;
    this.gid = groupId.groupId

    //-- Step 2. ----------- Showing the timelines from Firestore--------------
    let timelineIdRef = this.afs.collection("/groups/" + this.gid + "/timelineIds/");
    //console.log(this.gid);
    this.timelineIds = timelineIdRef.valueChanges();
  }

  addTimeline() {
    this.navCtrl.push(CreateTimelinePage, {
      parameter: this.navParams.get("parameter")["id"]
    });
  }

  //-- Step 3. -------------- Event when the timeline is tapped---
  agendaClick(timelineId: TimelineId) {
    // Going to timeline home page with Agenda (containing id, title, and days)
    this.navCtrl.push(TimelineHomePage, { parameter: timelineId });
  }

  deleteTimeline(timeline, index) {
    // console.log(index+ " deleted");

    //delete timeline from the timelineIds in the group
    // let subscription = this.fdb
    //   .list<string>("/groups/" + this.gid + "/timelineIds/")
    //   .valueChanges()
    //   .subscribe(_data => {
    //     if (index > -1) {
    //       _data.splice(index, 1);
    //     }
    //     this.fdb.list("/groups/" + this.gid).set("timelineIds", _data);
    //     subscription.unsubscribe();
    //   });
    // //delete timeline from the firebase
    // this.fdb.object("/timelines/" + timeline.id).remove();
  }
}
