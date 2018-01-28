import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "./../../models/User";
import { HomePage } from "./../home/home";
import { GooglePlus } from "@ionic-native/google-plus";
import { LoginPage } from "./../login/login";
import { SignupPage } from "./../signup/signup";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import firebase from "firebase";
import { ToastController } from "ionic-angular";

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
    private mfdb: AngularFireDatabase,
    private storage:Storage
  ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });
  }

  signup(): void {
    this.navCtrl.push(SignupPage);
  }
  login(): void {
    this.navCtrl.push(LoginPage);
  }

  doLoginG() {
    //do all the the login stuff here ==> syncing local data with firebase
    this.googlePlus
      .login({
        webClientId:
          "797472639847-mphniu062nhle2i7dun64v7komac530a.apps.googleusercontent.com",
        offline: true
      })
      .then(res => {
        firebase
          .auth()
          .signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(res.idToken)
          )
          .then(userData => {
            console.log("Firebase userData: " + JSON.stringify(userData));

            //save the user data locally
            this.saveUser(userData);

            //pop a toast
            let toast = this.toastCtrl
            .create({
              message: userData.displayName + " is logged in.",
              duration: 1500,
              position: "top"
            });
            toast.present();

            //go to the homepage
            this.navCtrl.pop();
            
          })
          .catch(error =>
            console.log("Firebase failure: " + JSON.stringify(error))
          );
      })
      .catch(err => console.error("Error: ", err));
  }

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

      let newUser: User = new User(name, email, 0, uid, [], []);

      //this line is to save user to firebase
      this.mfdb.object('/users/'+uid).set(newUser);

      //this line is to save to local database
      this.storage.set('user',newUser);
      console.log("Welcome : "+JSON.stringify(newUser));
      //TODO: check if the save to local function works properly.
      return;
    }
  }
}
