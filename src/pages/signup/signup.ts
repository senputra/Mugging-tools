import { LoginPage } from './../login/login';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  page_title: string = "Sign up";
  
  //variables for the signup form
  name: string = "";
  email: string;
  password: string;
  telNumber: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    
  }

  onChangeTitle() {
    if (this.name.length >= 3) {
      this.page_title = "Hi, " + this.name;
    } else {
      this.page_title = "Sign up";
    }
  }

  login(): void {
    this.navCtrl.push(LoginPage);
  }
}
