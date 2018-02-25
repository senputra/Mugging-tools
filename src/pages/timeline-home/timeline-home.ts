import { CreatePlanPage } from "./../create-plan/create-plan";
import { Page } from "ionic-angular/navigation/nav-util";
import { AngularFireDatabase } from "angularfire2/database";
import { Matter } from "./../../models/Matter";
import { Day } from "./../../models/Day";
import { Timeline } from "./../../models/Timeline";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
  plans: Day[];
  agenda: Timeline;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fdb: AngularFireDatabase
  ) {}

  ionViewDidLoad() {
    // retrieve the agenda from the parameters
    this.agenda = this.navParams.get("parameter");
    this.page_title = "Agenda: " + this.agenda.title;
    //this.demoCreateActivity();

    this.fdb
      .object<Timeline>("/timelines/" + this.agenda.id)
      .valueChanges()
      .subscribe(_data => {
        // console.log("_data" + _data);
        this.plans = _data.days;
        // console.log(this.plans);
      });
  }

  demoCreateActivity() {
    console.log(this.agenda.id);
    let days: Day[] = [];
    let matters: Matter[] = [];
    matters.push(new Matter("Exam", "", "", true));
    matters.push(new Matter("Quiz", "", "", true));

    days.push(new Day(new Date().getTime(), matters));
    days.push(new Day(new Date().getTime(), matters));

    if (this.agenda.id != null) {
      this.fdb.object("/timelines/" + this.agenda.id).update({ days: days });
    }
  }

  getDate(plan: Day) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = new Date(plan.date).getDate();
    var monthIndex = new Date(plan.date).getMonth();
    var year = new Date(plan.date).getFullYear();

    let dateString = day + " " + monthNames[monthIndex] + " " + year;
    return "On " + dateString;
  }

  getDescription(plan: Day) {
    if (plan.matters.length > 1) {
      return plan.matters.length + " things to do ";
    } else {
      return plan.matters[0].title;
    }
  }

  planClick(plan: Day) {
    // console.log(plan + " clicked.");
  }
  
  deletePlan(plan: Day,index:number) {
    // console.log(plan + " deleted");
    this.fdb.object("/timelines/" + this.agenda.id+"/days/"+index).remove();
  }

  addAgenda() {
    this.navCtrl.push(CreatePlanPage, { parameter: this.agenda.id });
  }
}
