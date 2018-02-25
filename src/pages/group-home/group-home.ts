import { AuthService } from './../../service/auth.service';
import { TimelineHomePage } from "./../timeline-home/timeline-home";
import { Timeline } from "./../../models/Timeline";
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CreateTimelinePage } from "../create-timeline/create-timeline";

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
export class GroupHomePage {
  page_title: string;
  timelines: Timeline[];
  gid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fdb: AngularFireDatabase,
    public authService:AuthService,
  ) {}

  ionViewDidLoad() {
    console.log("group home "+ this.authService.authenticated)
    console.log("group home "+ this.authService.currentUserDisplayName)
    console.log("group home "+ this.authService.currentUserId)
    //get the clicked card group
    let group = this.navParams.get("parameter");
    this.page_title = group["name"];
    this.gid = group["id"];
    this.fdb
      .list<string>("/groups/" + group["id"] + "/timelineIds/")
      .valueChanges()
      .subscribe(_data => {
        //getting all the timeline Ids
        let newTimelines: Timeline[] = [];
        _data.forEach(timelineId => {
          let subs = this.fdb //retrieve data of a timeline from a timeline id
            .object<Timeline>("/timelines/" + timelineId)
            .valueChanges()
            .subscribe(_datatimeline => {
              // console.log(timelineId);
              if (_data != null) {
                newTimelines.push(_datatimeline);
                subs.unsubscribe();
              }
            });
        });
        this.timelines = newTimelines;
      });
  }

  addTimeline() {
    this.navCtrl.push(CreateTimelinePage, {
      parameter: this.navParams.get("parameter")["id"]
    });
  }
  agendaClick(agenda: Timeline) {
    // Going to timeline home page with Agenda (containing id, title, and days)
    this.navCtrl.push(TimelineHomePage, { parameter: agenda });
  }

  deleteTimeline(timeline, index) {
    // console.log(index+ " deleted");

    //delete timeline from the timelineIds in the group
    let subscription = this.fdb
      .list<string>("/groups/" + this.gid + "/timelineIds/")
      .valueChanges()
      .subscribe(_data => {
        if (index > -1) {
          _data.splice(index, 1);
        }
        this.fdb.list("/groups/" + this.gid).set("timelineIds", _data);
        subscription.unsubscribe();
      });
    //delete timeline from the firebase
    this.fdb.object("/timelines/" + timeline.id).remove();
  }

  reIndexingArray(array) {
    let newArray = [];
    array.forEach(element => {
      newArray.push(element);
    });
    return newArray;
  }
}
