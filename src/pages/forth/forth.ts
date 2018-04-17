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

  public dri_name: string;
  public vehicle_nu: string;
  public pickup_location: string;
  public destination: string;
  public pickup_date: any;
  public pickup_time: any;
  public hireNo: any;

  host = 'http://www.my3wheel.lk/php/my3Wheel';

  constructor(
    public navCtrl: NavController,
    public app: App, 
    public navParams: NavParams, 
    public http: HttpClient) {

    this.navParams = navParams
    this.hireNo = navParams.get('hireNo');
  }

  goHome(){ 
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForthPage');
    this.http.get(this.host + '/my3Wheel_isDriverConfirmed.php?hireNo=' + this.hireNo).subscribe(data => {
      this.dri_name = data["hireRate"];
      this.vehicle_nu = data["hireRate"];
      this.pickup_location = data["journeyStart"];
      this.destination = data["journeyEnd"];
      this.pickup_date = data["date"];
      this.pickup_time = data["time"];
    });
  }

}
