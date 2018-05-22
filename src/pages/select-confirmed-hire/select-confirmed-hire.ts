import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import { ViewConfirmedHiresPage } from '../view-confirmed-hires/view-confirmed-hires';

@Component({
  selector: 'page-select-confirmed-hire',
  templateUrl: 'select-confirmed-hire.html',
})
export class SelectConfirmedHirePage {

  public name: string;
  public mobile: string;
  public from: string;
  public to: string;
  public time: any;
  public date: any;
  public customerId: any;
  public hireRate: number;
  public vehicleNumber: string;
  public driverID: string;

  constructor(
    private callNumber: CallNumber,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,) {
    this.name = navParams.get('d_displayName');
    this.mobile = navParams.get('d_tpNumber');
    this.from = navParams.get('p_journeyStart');
    this.to = navParams.get('p_journeyEnd');
    this.time = navParams.get('p_time');
    this.date = navParams.get('p_date');
    this.vehicleNumber = navParams.get('d_vehicleNumber');
    this.hireRate = navParams.get('p_hireRate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectConfirmedHirePage');
  }

  previousPage() {
    this.viewCtrl.dismiss();
  }

  closeModal() {
    console.log('closed');
    this.navCtrl.push(ViewConfirmedHiresPage);
  }

  getCall() {
    this.callNumber.callNumber(this.mobile, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
