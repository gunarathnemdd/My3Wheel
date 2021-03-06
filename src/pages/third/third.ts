import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { App } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ToastControllerProvider } from '../../providers/toast-controller/toast-controller';

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
    public toastService: ToastControllerProvider,
    public service: HttpServicesProvider) {

    this.platform = platform;

    this.navParams = navParams;
    this.hireNo = navParams.get('hireNo');
    console.log(this.hireNo);
    this.backgroundMode.disable();
    this.storage.set('haveActiveHire', false);
  }

  goHome() {
    this.service.riderReject(this.hireNo, this.driverId, 'reject').subscribe(data => {
      console.log(data);
      if (data['response'] == 'deleted') {
        this.storage.set('backgroundMode', false);
        let message = "Hire rejected successfully!";
        this.toaster(message);
      }
      else if (data['response'] == 'already deleted') {
        this.storage.set('backgroundMode', false);
        let message = "Hire is already deleted due to time out.";
        this.toaster(message);
      }
      else {
        let message2 = "Network error! Please check your internet connection.";
        this.toastService.toastCtrlr(message2);
      }
    },
      (err) => {
        let message2 = "Network error! Please check your internet connection.";
        this.toastService.toastCtrlr(message2);
      })
  }

  exitApp() {
    console.log(this.hireFee);
    this.service.riderConfirm(this.hireNo, this.driverId, this.hireFee).subscribe(data => {
      console.log(data);
      if (data['response'] == 'confirmed') {
        this.storage.set('backgroundMode', false).then(() => {
          this.platform.exitApp();
        });
      }
      else if (data['response'] == 'already deleted') {
        this.storage.set('backgroundMode', false);
        let message = "Hire is already deleted due to time out.";
        this.toaster(message);
      }
      else {
        let message2 = "Network error! Please check your internet connection.";
        this.toastService.toastCtrlr(message2);
      }
    },
      (err) => {
        let message2 = "Network error! Please check your internet connection.";
        this.toastService.toastCtrlr(message2);
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
      dismissOnPageChange: true
    });
    toast.onDidDismiss(() => {
      this.navCtrl.setRoot(HomePage);
    });
    toast.present();
  }
}
