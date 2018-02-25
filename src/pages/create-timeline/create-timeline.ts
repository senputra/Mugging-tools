import { Group } from "./../../models/Group";
import { Matter } from "./../../models/Matter";
import { Day } from "./../../models/Day";
import { Timeline } from "./../../models/Timeline";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
  id: any;
  groupId: string;
  adminId: string;
  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fdb: AngularFireDatabase,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    //create group function here
    this.groupId = this.navParams.get("parameter");
  }

  doCreateAgenda() {
    this.storage.get("user").then(_user => {
      if (_user.id == null) {
        this.adminId = _user.uid;
        console.log("use uid");
      } else {
        this.adminId = _user.id;
        console.log("use id");
      }
      let newTimeline: Timeline = new Timeline(
        this.name,
        [this.adminId],
        "TL" + Date.now().toString(36) + _user.id.slice(-5)
      );
      this.upload(newTimeline);
    });
  }

  demoCreateActivity() {
    console.log(this.id);
    let days: Day[] = [];
    let matters: Matter[] = [];
    matters.push(new Matter("Exam", "", "", true));
    matters.push(new Matter("Quiz", "", "", true));

    days.push(new Day(new Date().getTime(), matters));
    days.push(new Day(new Date().getTime(), matters));

    if (this.id != null) {
      this.fdb.object("/timelines/" + this.id).update({ days: days });
    }
  }

  demoCreateTimeline() {
    this.storage.get("user").then(_user => {
      if (_user.id == null) {
        this.adminId = _user.uid;
        console.log("use uid");
      } else {
        this.adminId = _user.id;
        console.log("use id");
      }

      let adminId = [this.adminId];
      let title = "Physics H2";
      let id = "TL123456789";
      let newTimeline: Timeline = new Timeline(title, adminId, id);
      this.upload(newTimeline);
    });
  }

  upload(timeline: Timeline) {
    //local----------
    this.storage.set(timeline.id, timeline);

    this.storage.get(timeline.id).then(_data => {
      console.log(_data);
    });
    //------------------

    //online----------------
    this.fdb.object("/timelines/" + timeline.id).set(timeline);
    this.fdb
      .object("/timelines/" + timeline.id)
      .valueChanges()
      .subscribe(_data => {
        let newTimeline: any = _data;
        console.log("fdb" + newTimeline.title);
        console.log(_data);
        this.id = newTimeline.id;
      });
    let sub = this.fdb
      .list<string>("/groups/" + this.groupId + "/timelineIds/")
      .valueChanges()
      .subscribe(_data => {
        let newTimelineIds = _data;
        newTimelineIds.push(timeline.id);
        this.fdb
          .list<string[]>("/groups/" + this.groupId)
          .update("timelineIds", newTimelineIds);
        sub.unsubscribe();
      });
    //----------------
  }
}
