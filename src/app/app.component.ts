import { GroupJoinPage } from "./../pages/group-join/group-join";
import { CreateTimelinePage } from "./../pages/create-timeline/create-timeline";
import { CreateGroupPage } from "./../pages/create-group/create-group";
import { HomePage } from "./../pages/home/home";

import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Page } from "ionic-angular/navigation/nav-util";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string; component: any }>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    this.pages = [
      { title: "Create Group", component: CreateGroupPage },
      { title: "Join Group", component: GroupJoinPage }
    ];

    splashScreen.show();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch (page.title) {
      case "Create Group":
        this.nav.push(page.component);
        break;
      case "Join Group":
        this.nav.push(page.component);
        break;
      default:
        this.nav.setRoot(page.component);
        break;
    }
  }
}
