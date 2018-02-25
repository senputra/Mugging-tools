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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fdb: AngularFireDatabase,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    //create group function here
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
      this.fdb.object("/timelines/" + this.id).update({'days':days});
    }
  }

  demoCreateTimeline() {
    let title = "Physics H2";
    let adminId = ["1A91VdFqSGdpsQMvsHEDXQVZi6M2"];
    let id = "TL123456789";
    let newGroup: Timeline = new Timeline(title, adminId, id);
    this.upload(newGroup);
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
    //----------------
  }
}
