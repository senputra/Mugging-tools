import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePlanPage } from './create-plan';

@NgModule({
  declarations: [
    CreatePlanPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePlanPage),
  ],
})
export class CreatePlanPageModule {}
