import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";


import { GroupJoinPage } from './../pages/group-join/group-join';
import { CreatePlanPage } from './../pages/create-plan/create-plan';
import { GroupHomePage } from './../pages/group-home/group-home';
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { SignupPage } from "./../pages/signup/signup";
import { LoginPage } from "./../pages/login/login";
import { WelcomePage } from "./../pages/welcome/welcome";
import { CreateGroupPage } from "../pages/create-group/create-group";
import { CreateTimelinePage } from "../pages/create-timeline/create-timeline";
import { TimelineHomePage } from '../pages/timeline-home/timeline-home';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth'; 

import { GooglePlus } from '@ionic-native/google-plus';

import { LongPressModule } from 'ionic-long-press';

let firebaseConfig = {
  apiKey: "AIzaSyCyU14VHwrPX1kXfCQ4D1AblQoECc_W-HI",
  authDomain: "mugger-tools.firebaseapp.com",
  databaseURL: "https://mugger-tools.firebaseio.com",
  projectId: "mugger-tools",
  storageBucket: "mugger-tools.appspot.com",
  messagingSenderId: "797472639847"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    CreateGroupPage,
    CreateTimelinePage,
    GroupHomePage,
    TimelineHomePage,
    CreatePlanPage,
    GroupJoinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    CreateGroupPage,
    CreateTimelinePage,
    GroupHomePage,
    TimelineHomePage,
    CreatePlanPage,
    GroupJoinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
