import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { App } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';

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
  public pushTimeOut: any;

  host = 'http://www.my3wheel.lk/php/my3Wheel';

  constructor(
    private backgroundMode: BackgroundMode,
    public navCtrl: NavController,
    public app: App,
    public platform: Platform,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public http: HttpClient) {

    this.platform = platform;

    this.navParams = navParams;
    this.hireNo = navParams.get('hireNo');
    console.log(this.hireNo);
  }

  goHome() {
    this.http.get(this.host + '/my3Wheel_riderReject.php?hireNo=' + this.hireNo + '&driverId=' + this.driverId + '&state=reject').subscribe(data => {
      console.log(data);
      if (data['response'] == 'deleted') {
        this.navCtrl.setRoot(HomePage);
        this.toaster('Hire rejected successfully!');
      }
      else if (data['response'] == 'already deleted') {
        this.navCtrl.setRoot(HomePage);
        this.toaster("Hire is already deleted due to time out.");
      }
      else {
        this.navCtrl.setRoot(HomePage);
        let message2 = "Network error! Please check your internet connection.";
        this.toaster(message2);
      }
    })
  }

  exitApp() {
    console.log(this.hireFee);
    this.http.get(this.host + '/my3Wheel_riderConfirm.php?hireNo=' + this.hireNo + '&driverId=' + this.driverId + '&wheelFee=' + this.hireFee).subscribe(data => {
      console.log(data);
      if (data['response'] == 'confirmed') {
        //document.getElementById("exitNote").innerHTML = "Have a safe journey";
        //this.platform.exitApp();
        this.navCtrl.setRoot(HomePage);
        this.backgroundMode.enable();
        this.backgroundMode.moveToBackground();
      }
      else if (data['response'] == 'already deleted') {
        this.navCtrl.setRoot(HomePage);
        this.toaster("Hire is already deleted due to time out.");
      }
      else {
        this.navCtrl.setRoot(HomePage);
        let message2 = "Network error! Please check your internet connection.";
        this.toaster(message2);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPage ' + this.hireNo);
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

  toaster(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  deleteHire(hireNo, driverId) {
		this.http.get(this.host + '/myHire_rejectHire.php?hireNo=' + hireNo + '&driverId=' + driverId + '&state=delete').subscribe(data => {
			console.log(data);
		},
			(err) => {
				let message = "Network error! Please check your internet connection.";
				this.toaster(message);
			});
	}
}
