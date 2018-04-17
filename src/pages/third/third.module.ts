import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThirdPage } from './third';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@NgModule({
  declarations: [
    ThirdPage,
  ],
  imports: [
    IonicPageModule.forChild(ThirdPage),
  ],
})
export class ThirdPageModule {

  public Dfirst : string;
  public Dsecond : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.navParams = navParams
    this.Dfirst = this.navParams.get('fisrtPassed');
    this.Dsecond = this.navParams.get('secondPassed');

  }

}
