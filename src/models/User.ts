import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";
export class User {
  name: string;
  email: string; // school email if possible
  phoneNumber: number; //65xxxxxxxx
  id: string; //id gotten from firebase;
  timelineIds: string[] = []; // #45A5S6SD, #55F6Q8ER
  groupIds: string[] = []; //#1245SD4F
  lastChangeTime: number; //record the time when the latest change is made
  //this is to compare with the last change made in firebase

  constructor(
    name: string,
    email: string,
    phoneNumber: number = 0,
    id: string,
    groupIds: string[] = [],
    personalTimelineIds: string[] = [],
    personalTimeSchedulaIds: string[] = []
  ) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.id = id;

    this.lastChangeTime = Date.now();
  }

  public getGroupIds(){
    return this.groupIds;
  }

  public checkFirebase(
    storage: Storage,
    fdb: AngularFireDatabase,
    debug?: boolean
  ) {
    //check which one is a newer one.
    let firebaseIsNewer = false;
    let checked = false;

    let firebaseUser = fdb.object("/Users/${this.id}").valueChanges();
    console.log(firebaseUser);
    //TODO: check if the object can be retrieved

    if (checked) {
      if (firebaseIsNewer) {
        this.updateLocal(storage, true);
      } else {
        this.updateFirebase(fdb, true);
      }
    }
  }

  public updateFirebase(fdb: AngularFireDatabase, debug?: boolean) {
    //this line is to save user to firebase
    fdb
      .object("users/$uid")
      .set(this)
      .then(result => console.log("succeed : " + result));
  }

  public updateLocal(storage: Storage, debug?: boolean) {
    //this line is to save to local database
    storage.set("user", this).then(result => console.log(result));
  }
}
