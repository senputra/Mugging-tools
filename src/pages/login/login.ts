import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  page_title: string = "Log in";

  //variables for the signup form
  name: string = "";
  email: string;
  password: string;

  constructor(public navCtrl: NavController,public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  doLogin() {
    //do all the the login stuff here ==> syncing local data with firebase
    //this.navCtrl.push(HomePage);
    let email = "Ulala@gmail.com";
    let password = "asdasdasd";

firebase.auth().signInWithCredential

    let olduser = firebase.auth().currentUser;
    olduser
      .linkWithCredential(
        firebase.auth.EmailAuthProvider.credential(email, password)
      )
      .then(res => console.log("success"))
      .catch(err => console.error(err));
  }
}
