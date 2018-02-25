import { AuthService } from './../service/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { GroupJoinPage } from './../pages/group-join/group-join';
import { CreatePlanPage } from './../pages/create-plan/create-plan';
import { GroupHomePage } from './../pages/group-home/group-home';
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { TodoDetailsPage } from "../pages/todo-details/todo-details";
import { SignupPage } from "./../pages/signup/signup";
import { LoginPage } from "./../pages/login/login";
import { WelcomePage } from "./../pages/welcome/welcome";
import { CreateTodoPage } from "./../pages/create-todo/create-todo";
import { CreateGroupPage } from "../pages/create-group/create-group";
import { CreateTimelinePage } from "../pages/create-timeline/create-timeline";
import { TimelineHomePage } from '../pages/timeline-home/timeline-home';

import { IonicStorageModule } from "@ionic/storage";
import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from 'angularfire2/auth';
import {GooglePlus} from "@ionic-native/google-plus";
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
    TodoDetailsPage,
    CreateTodoPage,
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
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TodoDetailsPage,
    CreateTodoPage,
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
    AngularFireDatabase,
    AngularFireAuth,
    AuthService,
    GooglePlus,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
