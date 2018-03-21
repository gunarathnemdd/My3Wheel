import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForthPage } from './forth';

@NgModule({
  declarations: [
    ForthPage,
  ],
  imports: [
    IonicPageModule.forChild(ForthPage),
  ],
})
export class ForthPageModule {}
