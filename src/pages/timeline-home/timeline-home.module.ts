import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimelineHomePage } from './timeline-home';

@NgModule({
  declarations: [
    TimelineHomePage,
  ],
  imports: [
    IonicPageModule.forChild(TimelineHomePage),
  ],
})
export class TimelineHomePageModule {}
