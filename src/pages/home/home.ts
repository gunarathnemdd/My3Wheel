import { Component } from '@angular/core';
import { Platform, NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { SecondPage } from '../second/second';
import { ThirdPage } from '../../pages/third/third';
import { ForthPage } from '../../pages/forth/forth';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public drivName: string;
	public vehiNo: string;
	public dName: string;
	public vehicleNu: string;
	public d_distance: any;
	public d_time: any;
	public dId: string;
	public d_Image: any;
	public drivId: string;
	public passengerLatitude: any;
	public passengerLongitude: any;
	public data: any;
	public position: any;
	public longitude: any;
	public latitude: any;
	public dImage: any;
	public driverImage: any;
	public loading: any;
	public refresherEnabled: any;

	host = 'http://www.my3wheel.lk/php/my3Wheel';

	public globalArray: any[] = [];

	constructor(
		public platform: Platform,
		private storage: Storage,
		private push: Push,
		public loadingCtrl: LoadingController,
		public splashScreen: SplashScreen,
		public localNotifications: LocalNotifications,
		public http: HttpClient,
		public navCtrl: NavController,
		private geolocation: Geolocation,
		public alertCtrl: AlertController) {
		platform.ready().then(() => {
			this.initPushNotification();
		});
	}

	initPushNotification() {
		if (!this.platform.is('cordova')) {
			console.log('Push notifications not initialized. Cordova is not available - Run in physical device');
			return;
		}
		const options: PushOptions = {
			android: {
				senderID: '326433778451'
			},
			ios: {
				alert: 'true',
				badge: false,
				sound: 'true'
			},
			windows: {}
		};
		const pushObject: PushObject = this.push.init(options);

		pushObject.on('registration').subscribe((data: any) => {
			console.log('device token -> ' + data.registrationId);
			this.storage.set('deviceToken', data.registrationId);
			//TODO - send device token to server
		});

		pushObject.on('notification').subscribe((data: any) => {
			console.log('data -> ' + data);
			//if user using app and push notification comes
			if (data.additionalData.foreground) {
				// if application open, show popup
				let confirmAlert = this.alertCtrl.create({
					title: data.title,
					message: data.message,
					enableBackdropDismiss: false,
					buttons: [{
						text: 'View',
						handler: () => {
							//TODO: Your logic here
							//this.showNotification(data.message);
							if(data.title == "Hire Confirmed") {
								this.navCtrl.push(ThirdPage, {
									hireNo: data.message
								})
							}
							else if(data.title == "Hire Rejected") {
								this.navCtrl.push(ForthPage, {
									hireNo: data.message
								})
							}
							console.log('Push notification received');
						}
					}]
				});
				confirmAlert.present();
			} else {
				//if user NOT using app and push notification comes
				//TODO: Your logic on click of push notification directly
				if(data.title == "Hire Confirmed") {
					this.navCtrl.push(ThirdPage, {
						hireNo: data.message
					})
				}
				else if(data.title == "Hire Rejected") {
					this.navCtrl.push(ForthPage, {
						hireNo: data.message
					})
				}
				console.log('Push notification clicked');
			}
		});

		pushObject.on('error').subscribe(error => console.log(error));
	}

	showNotification(message) {
		this.localNotifications.schedule({
			text: message
		});
	}

	doRefresh(refresher) {
		this.getDriverList();
		setTimeout(() => {
			refresher.complete();
		}, 2000);
	}

	restartApp() {
		this.splashScreen.show();
		window.location.reload();
	}

	nextPage(driverName, vehicleNo, dr_distance, dr_time, drivId, drImage) {
		console.log(drivId);
		this.navCtrl.push(SecondPage, {
			dName: driverName,
			vehicleNu: vehicleNo,
			d_distance: dr_distance,
			d_time: dr_time,
			dId: drivId,
			d_Image: drImage
		})
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
		this.splashScreen.hide();
		this.storage.get('isLoaded').then((val) => {
			if (val == "loaded") {
				this.getDriverList();
				this.refresherEnabled = true;
				console.log("loaded");
			}
			else {
				this.storage.set('isLoaded', "loaded");
				this.globalArray.push({ name: "loading" });
				this.refresherEnabled = false;
				console.log("not loaded");
			}
		});
	}

	getDriverList() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
		this.globalArray = [];
		this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position) => {
			this.longitude = position['coords']['longitude'];
			this.latitude = position['coords']['latitude'];
			this.http.get(this.host + '/my3Wheel_getDriverDistance.php?longitude=' + this.longitude + '&latitude=' + this.latitude).subscribe(location => {
				console.log(location);
				this.loading.dismiss();
				if (location != "No results") {
					console.log(Object.keys(location).length);
					for (let i = 0; i < Object.keys(location).length; i++) {
						let image = "data:image/png;base64," + location[i]["DriverImage"];
						this.globalArray.push({ name: location[i]["DriverName"], vehicleNo: location[i]["DriverVehicle"], distance: location[i]["DriverDistance"], time: location[i]["DriverTime"], drivrId: location[i]["DriverID"], dImage: image });
					}
				}
				else {
					console.log('location no');
					this.globalArray.push({ name: "null" });
				}
			});
		});
	}
}
