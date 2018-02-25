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
  page_title = "Create Group";
  name: any;

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
    //------------------

    //online----------------
    this.fdb.object("/groups/" + group.id).set(group);
    //-------------------
  }

  onChangeTitle() {
    this.page_title = this.name;
  }

  updateUser(user, oldGroupId) {
    //local----------
    this.storage.set("user", user);
    //------------------

    //online----------------
    this.fdb.object("/users/" + user.id).update({ groupIds: oldGroupId });
    //-------------------
  }

  getCurrentGroups(currentUser) {
    return currentUser.groupIds == null ? [] : currentUser.groupIds;
  }

  doCreateGroup() {
    this.storage.get("user").then(_data => {
      let currentUser = _data;
      let oldGroupId = this.getCurrentGroups(_data);

      let newGroup = new Group(
        this.name,
        [currentUser.id],
        "GP" + Date.now().toString(36) + currentUser.id.slice(-5)
      );
      this.upload(newGroup);

      oldGroupId.push(newGroup.id);
      currentUser.groupIds = oldGroupId;

      this.updateUser(currentUser, oldGroupId);
      this.navCtrl.pop();
    });
  }
}
