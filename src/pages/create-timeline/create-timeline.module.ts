import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTimelinePage } from './create-timeline';

@NgModule({
  declarations: [
    CreateTimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTimelinePage),
  ],
})
export class CreateTimelinePageModule {}
