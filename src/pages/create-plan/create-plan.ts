import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Flag } from "../../models/Flag";
import { DateTime } from 'luxon';


/**
 * Generated class for the CreatePlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/**
 * Create Plan, adds the number of event in one timeline
 * 1. get the timeline id from the parameter
 * 2. get inputs from the user
 * 3. push it to firestore 
 */
@IonicPage()
@Component({
  selector: "page-create-plan",
  templateUrl: "create-plan.html"
})
export class CreatePlanPage {
  tId: string; //timeline id
  eventTitle: string;
  eventDeadline: Date;
  newEvent: Flag;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore,
  ) { }

  ionViewDidLoad() {
    //retrieve the TimelineId form the paramater
    this.tId = this.navParams.get("parameter");
  }

  doAddPlan() {

    let eventRef = this.afs.collection("/timelines/" + this.tId + "/events/")
    this.newEvent = { title: this.eventTitle, deadline: DateTime.fromISO(this.eventDeadline).toISO() };
    eventRef.add(this.newEvent);
  }
}
