import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { App } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

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

  constructor(
    private storage: Storage,
    private backgroundMode: BackgroundMode,
    public navCtrl: NavController,
    public app: App,
    public platform: Platform,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public service: HttpServicesProvider) {

    this.platform = platform;

    this.navParams = navParams;
    this.hireNo = navParams.get('hireNo');
    console.log(this.hireNo);
  }

  goHome() {
    this.service.riderReject(this.hireNo, this.driverId, 'reject').subscribe(data => {
      console.log(data);
      if (data['response'] == 'deleted') {
        this.storage.set('backgroundMode', false);
        this.storage.set('backgroundModeOn', false);
        this.navCtrl.setRoot(HomePage);
        this.toaster('Hire rejected successfully!');
      }
      else if (data['response'] == 'already deleted') {
        this.storage.set('backgroundMode', false);
        this.storage.set('backgroundModeOn', false);
        this.navCtrl.setRoot(HomePage);
        this.toaster("Hire is already deleted due to time out.");
      }
      else {
        let message2 = "Network error! Please check your internet connection.";
        this.toaster(message2);
      }
    },
      (err) => {
        let message2 = "Network error! Please check your internet connection.";
        this.toaster(message2);
      })
  }

  exitApp() {
    console.log(this.hireFee);
    this.service.riderConfirm(this.hireNo, this.driverId, this.hireFee).subscribe(data => {
      console.log(data);
      if (data['response'] == 'confirmed') {
        //document.getElementById("exitNote").innerHTML = "Have a safe journey";
        //this.platform.exitApp();
        this.storage.set('backgroundMode', false);
        this.storage.set('backgroundModeOn', false);
        this.backgroundMode.enable();
        this.backgroundMode.on("activate").subscribe(() => {
          this.navCtrl.setRoot(HomePage);
        });
        this.backgroundMode.moveToBackground();
      }
      else if (data['response'] == 'already deleted') {
        this.storage.set('backgroundMode', false);
        this.storage.set('backgroundModeOn', false);
        this.navCtrl.setRoot(HomePage);
        this.toaster("Hire is already deleted due to time out.");
      }
      else {
        let message2 = "Network error! Please check your internet connection.";
        this.toaster(message2);
      }
    },
      (err) => {
        let message2 = "Network error! Please check your internet connection.";
        this.toaster(message2);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPage ' + this.hireNo);
    this.service.isDriverConfirmed(this.hireNo).subscribe(data => {
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
    this.service.rejectHire(hireNo, driverId, 'delete').subscribe(data => {
      console.log(data);
    },
      (err) => {
        let message = "Network error! Please check your internet connection.";
        this.toaster(message);
      });
  }
}
