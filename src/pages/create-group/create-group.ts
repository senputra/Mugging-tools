import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";
import { Group } from "./../../models/Group";
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
  selector: "page-create-group",
  templateUrl: "create-group.html"
})
export class CreateGroupPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fdb: AngularFireDatabase,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    //create group function here
  }

  demoCreateGroup() {
    let name = "Demo Group";
    let adminId = ["1A91VdFqSGdpsQMvsHEDXQVZi6M2"];
    let id = "GP123456789";
    let newGroup: Group = new Group(name, adminId, id);
    this.upload(newGroup);
    id = "GP123456780";
    newGroup = new Group(name, adminId, id);
    this.upload(newGroup);
  }

  upload(group: Group) {
    //local----------
    this.storage.set(group.id, group);

    this.storage.get(group.id).then(_data => {
      console.log(_data);
    });
    //------------------

    //online----------------
    this.fdb.object("/groups/" + group.id).set(group);
    this.fdb
      .object("/groups/" + group.id)
      .valueChanges()
      .subscribe(_data => {
        let newGroup:any = _data
        console.log("fdb" + newGroup.name);
        console.log(_data);
      });
    //----------------
  }
}
