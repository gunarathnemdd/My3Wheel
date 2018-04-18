import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { App } from 'ionic-angular';

import { HomePage } from '../home/home';

/**
 * Generated class for the ThirdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-third',
  templateUrl: 'third.html',
})
export class ThirdPage {

  public dri_name: string;
  public vehicle_nu: string;
  public pickup_location: string;
  public destination: string;
  public pickup_date: any;
  public pickup_time: any;
  public hireFee: any;
  public driverId: any;
  public hireNo: any;
  public mobile_nu: any;

  host = 'http://www.my3wheel.lk/php/my3Wheel';

  constructor(
    public navCtrl: NavController,
    public app: App,
    public platform: Platform,
    public navParams: NavParams,
    public http: HttpClient) {

    this.platform = platform;

    this.navParams = navParams;
    this.hireNo = navParams.get('hireNo');
  }

  goHome() {
    this.http.get(this.host + '/my3Wheel_riderReject.php?hireNo=' + this.hireNo).subscribe(data => {
      console.log(data);
      this.navCtrl.setRoot(HomePage);
    })
  }

  exitApp() {
    console.log(this.hireFee);
    this.http.get(this.host + '/my3Wheel_riderConfirm.php?hireNo=' + this.hireNo + '&driverId=' + this.driverId + '&wheelFee=' + this.hireFee).subscribe(data => {
      console.log(data);
      document.getElementById("exitNote").innerHTML = "Have a safe journey";
      this.platform.exitApp();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPage');
    this.http.get(this.host + '/my3Wheel_isDriverConfirmed.php?hireNo=' + this.hireNo).subscribe(data => {
      console.log(data);
      this.dri_name = data["displayName"];
      this.vehicle_nu = data["vehicleNumber"];
      this.pickup_location = data["journeyStart"];
      this.destination = data["journeyEnd"];
      this.pickup_date = data["date"];
      this.pickup_time = data["time"];
      this.hireFee = data["hireRate"];
      this.driverId = data["driverID"];
      this.mobile_nu = data["tpNumber"];
    });
  }
}
