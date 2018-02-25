import { Group } from "./../../models/Group";
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Subject } from "rxjs/Subject";

/**
 * Generated class for the GroupJoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-group-join",
  templateUrl: "group-join.html"
})
export class GroupJoinPage {
  keyWord = new Subject<string>();
  groups: Group[];
  searchKeywordFromInput: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fdb: AngularFireDatabase
  ) {}

  ionViewDidLoad() {
    this.getGroupFromFirebase(this.keyWord).subscribe(
      _data => {
        console.log(_data);
        this.groups = _data;
      }
    );
  }

  search() {
    this.keyWord.next(this.searchKeywordFromInput);
    // console.log(this.searchKeywordFromInput);
  }

  getGroupFromFirebase(keyWord) {
    //switchMap of RxJS is used to return the value when Rxjs.next() is called
    return keyWord.switchMap(keyword =>
      this.fdb
        .list("/groups/", ref =>
          ref
            .orderByChild("name")
            .limitToFirst(10)
            .startAt(keyword)
            .endAt(keyword + "\uf8ff")
        )
        .valueChanges()
    );
  }
}
