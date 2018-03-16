

import { User } from "./../../models/User";
import { HomePage } from "./../home/home";
import { GooglePlus } from "@ionic-native/google-plus";
import { LoginPage } from "./../login/login";
import { SignupPage } from "./../signup/signup";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Platform
} from "ionic-angular";
import * as firebase from 'firebase/app';
import { ToastController } from "ionic-angular";
import { AngularFireAuth } from 'angularfire2/auth';

//TODO: create animation where the welcome page is pushed upwards for login and sign up purposes.

@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  userProfile: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googlePlus: GooglePlus,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public afAuth: AngularFireAuth,
    private platform: Platform,

  ) {
    menuCtrl.enable(false);
  }

  signup(): void {
    this.menuCtrl.enable(true);
    this.navCtrl.push(SignupPage);
  }
  login(): void {
    this.menuCtrl.enable(true);
    this.navCtrl.push(LoginPage);
  }

  doLoginG() {
    if (this.platform.is('cordova')) {
      this.mobileLogin();
    } else {
      this.webLogin();
    }
  }

  async webLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.navCtrl.setRoot(WelcomePage);
    } catch (err) {
      console.log(err);
    }
  }

  async mobileLogin() {
    try {
      const gPlusUser = await this.googlePlus.login({
        webClientId:
          "797472639847-mphniu062nhle2i7dun64v7komac530a.apps.googleusercontent.com",
        offline: true
      }).then(result => {
        return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken))
          .then(_res => {
            //pop a toast
            let toast = this.toastCtrl.create({
              message: _res.displayName + " is logged in.",
              duration: 1500,
              position: "top"
            });
            toast.present();
            this.navCtrl.setRoot(WelcomePage)
          });
      })
    } catch (err) {
      console.log(err);
    }
  }

  /*
  //save user both in firebase Database and local database.
  saveUser(user: any) {
    if (user != null) {
      //the data that can be extracted from user
      let name = user.displayName;
      // console.log("Welcome saveUser() : "+name);
      let email = user.email;
      // console.log("Welcome saveUser() : "+email);
      let photoUrl = user.photoURL;
      // console.log("Welcome saveUser() : "+photoUrl);
      let emailVerified = user.emailVerified;
      // console.log("Welcome saveUser() : "+emailVerified);
      let uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // console.log("Welcome saveUser() : "+uid);
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.

      let subscription = this.mfdb
        .list<string>("/users/" + uid + "/groupIds/")
        .valueChanges()
        .subscribe(_data => {
          let newUser: User = new User(name, email, 0, uid, _data, []);
          console.log("newUser" + newUser);
          //this line is to save user to firebase
          this.mfdb.object("/users/" + uid).update(newUser);

          //this line is to save to local database
          this.storage.set("user", newUser);
          this.storage.set("userId", uid);
          console.log("Welcome : " + JSON.stringify(newUser));
          //TODO: check if the save to local function works properly.



          subscription.unsubscribe();
          return;
        });
    }
  }*/
}
