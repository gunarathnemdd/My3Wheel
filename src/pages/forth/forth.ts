import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

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

	constructor(
		private storage: Storage,
		public navCtrl: NavController,
		public app: App,
		public navParams: NavParams,
		public service: HttpServicesProvider) {

		this.navParams = navParams
		this.hireNo = navParams.get('hireNo');
	}

	goHome() {
        this.storage.set('backgroundMode', false);
		this.storage.set('backgroundModeOn', false);
		this.navCtrl.setRoot(HomePage);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ForthPage');
		this.service.isDriverConfirmed(this.hireNo).subscribe(data => {
			this.dri_name = data["displayName"];
			this.vehicle_nu = data["vehicleNumber"];
			this.pickup_location = data["journeyStart"];
			this.destination = data["journeyEnd"];
			this.pickup_date = data["date"];
			this.pickup_time = data["time"];
		});
	}

}
