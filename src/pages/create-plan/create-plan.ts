import { Matter } from "./../../models/Matter";
import { Day } from "./../../models/Day";
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the CreatePlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-create-plan",
  templateUrl: "create-plan.html"
})
export class CreatePlanPage {
  aid: string; //agenda id
  planName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fdb: AngularFireDatabase
  ) {}

  ionViewDidLoad() {
    //retrieve the TimelineId form the paramater
    this.aid = this.navParams.get("parameter");
  }

  doAddPlan() {
    let subscription = this.fdb
      .list<Day>("/timelines/" + this.aid + "/days")
      .valueChanges()
      .subscribe(_data => {
        //this is the data of what is in the day || it will be a list of Day
        let oldPlans = _data;

        let newMatters: Matter[] = [new Matter(this.planName, "", "", true)];
        console.log("planName" + this.planName);
        let newPlan = new Day(new Date().getTime(), newMatters);

        oldPlans.push(newPlan);
        subscription.unsubscribe();
        console.log("_oldplans" + oldPlans);
        oldPlans.forEach(element => {
          console.log("oldplans =>" + element.matters[0].title);
        });
        console.log("_aid" + this.aid);
        this.fdb.object("/timelines/" + this.aid).update({ days: oldPlans });
      });
  }
}
