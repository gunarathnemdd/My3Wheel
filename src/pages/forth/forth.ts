import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ForthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forth',
  templateUrl: 'forth.html',
})
export class ForthPage {

  public dri_name : string;
  public vehicle_nu : string;
  public pickup_location : string;
  public destination : string;
  public pickup_date : any;
  public pickup_time : any;

  constructor(public navCtrl: NavController,public app: App, public navParams: NavParams, public http: HttpClient) {

    this.navParams = navParams
    this.dri_name = this.navParams.get('driName');
    this.vehicle_nu = this.navParams.get('vehiNum');
    this.pickup_location = navParams.get('pickup');
    this.destination = navParams.get('pDestination');
    this.pickup_date = navParams.get('pickDate');
    this.pickup_time = navParams.get('pickTime');
  }

  goHome(){ 
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForthPage');
  }


}
