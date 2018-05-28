import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { orderBy, filter } from 'lodash';
import moment from 'moment';

import { HomePage } from '../home/home';
import { SelectConfirmedHirePage } from '../select-confirmed-hire/select-confirmed-hire';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ToastControllerProvider } from '../../providers/toast-controller/toast-controller';

@Component({
  selector: 'page-view-confirmed-hires',
  templateUrl: 'view-confirmed-hires.html',
})
export class ViewConfirmedHiresPage {

  public globalArray: any[] = [];
  public hire: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public service: HttpServicesProvider,
    public toastService: ToastControllerProvider,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.storage.set('backgroundMode', false);
    console.log('ionViewDidLoad ViewConfirmedHiresPage');
    this.storage.get('deviceToken').then((val) => {
      this.service.confirmedHire(val).subscribe(data => {
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
          this.toastService.toastCtrlr(message);
        });
    });
  }

  previousPage() {
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.pop();
  }

  showHire(item) {
    console.log(item);
    let profileModal = this.modalCtrl.create(SelectConfirmedHirePage, item);
    profileModal.present();
  }

}
