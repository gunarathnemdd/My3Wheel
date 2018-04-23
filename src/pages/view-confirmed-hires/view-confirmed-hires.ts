import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { orderBy, filter } from 'lodash';
import moment from 'moment';

import { HomePage } from '../home/home';
import { SelectConfirmedHirePage } from '../select-confirmed-hire/select-confirmed-hire';

@Component({
  selector: 'page-view-confirmed-hires',
  templateUrl: 'view-confirmed-hires.html',
})
export class ViewConfirmedHiresPage {

  public host = 'http://www.my3wheel.lk/php/my3Wheel';
  public globalArray: any[] = [];
  public hire: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewConfirmedHiresPage');
    this.storage.get('deviceToken').then((val) => {
      this.http.get(this.host + '/my3Wheel_availableHire.php?deviceToken=' + val).subscribe(data => {
        console.log(data);
        if (data != '0') {
          this.hire = data;
          this.hire = orderBy(this.hire, ['p_date', 'p_sortTime'], ['asc', 'asc']);
          this.hire = filter(this.hire, o => o.p_date >= moment().format('YYYY-MM-DD'));
          if (Object.keys(this.hire).length == 0) {
            this.hire = [{ d_displayName: "null" }];
          }
        }
        else {
          this.hire = [{ d_displayName: "null" }];
        }
        console.log(this.hire);
      },
        (err) => {
          let message = "Network error! Please check your internet connection.";
          this.toaster(message);
        });
    });
  }

  previousPage() {
    this.navCtrl.setRoot(HomePage);
  }

  showHire(item) {
    console.log(item);
    let profileModal = this.modalCtrl.create(SelectConfirmedHirePage, item);
    profileModal.present();
  }

  toaster(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
