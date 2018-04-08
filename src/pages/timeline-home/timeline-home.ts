import { CreatePlanPage } from "./../create-plan/create-plan";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TimelineId } from "../../models/TimelineId";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Flag } from '../../models/Flag';
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the TimelineHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: "page-timeline-home",
  templateUrl: "timeline-home.html"
})
export class TimelineHomePage {
  page_title: string;
  timelineId: TimelineId;
  tid: string;
  eventsRef: AngularFirestoreCollection<Flag>;
  events: Observable<Flag[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore
  ) { }

  /*
  * At the home page of timeline, Events with ascending order of deadline are shown.
  * 1. Get the timeline Id
  * 2. Check firebase for the events in that timeline.
  * 3. A function to add the event.
  * 4. A function to delete the event.
  */
  async ionViewDidLoad() {
    //-- Step 1. ------------get the timelineId.-----------
    this.timelineId = this.navParams.get("parameter");
    this.page_title = "Timeline: " + this.timelineId.title;
    this.tid = this.timelineId.timelineId;

    //-- Step 2. --------getting all the events from firestore
    this.eventsRef = this.afs.collection("/timelines/" + this.tid + "/events/")
    this.events = this.eventsRef.valueChanges();

  }

  // demoCreateActivity() {
  //   console.log(this.timelineId.timelineId);
  //   let days: Day[] = [];
  //   let matters: Matter[] = [];
  //   matters.push(new Matter("Exam", "", "", true));
  //   matters.push(new Matter("Quiz", "", "", true));

  //   days.push(new Day(new Date().getTime(), matters));
  //   days.push(new Day(new Date().getTime(), matters));

  //   if (this.timelineId.timelineId != null) {
  //     this.fdb.object("/timelines/" + this.timelineId.timelineId).update({ days: days });
  //   }
  // }

  // getDate(plan: Day) {
  //   var monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December"
  //   ];

  //   var day = new Date(plan.date).getDate();
  //   var monthIndex = new Date(plan.date).getMonth();
  //   var year = new Date(plan.date).getFullYear();

  //   let dateString = day + " " + monthNames[monthIndex] + " " + year;
  //   return "On " + dateString;
  // }

  // getDescription(plan: Day) {
  //   if (plan.matters.length > 1) {
  //     return plan.matters.length + " things to do ";
  //   } else {
  //     return plan.matters[0].title;
  //   }
  // }

  // planClick(plan: Day) {
  //   // console.log(plan + " clicked.");
  // }

  // deletePlan(plan: Day, index: number) {
  //   // console.log(plan + " deleted");
  //   this.fdb.object("/timelines/" + this.timelineId.timelineId + "/days/" + index).remove();
  // }


  //-- Step 3. a function to add event
  addEvent() {
    this.navCtrl.push(CreatePlanPage, { parameter: this.timelineId.timelineId });
  }
}
