import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { orderBy, filter } from 'lodash';
import moment from 'moment';
import { BackgroundMode } from '@ionic-native/background-mode';

import { SecondPage } from '../second/second';
import { ThirdPage } from '../../pages/third/third';
import { ForthPage } from '../../pages/forth/forth';
import { ViewConfirmedHiresPage } from '../view-confirmed-hires/view-confirmed-hires';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { AlertControllerProvider } from '../../providers/alert-controller/alert-controller';
import { ToastControllerProvider } from '../../providers/toast-controller/toast-controller';

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

	public globalArray: any[] = [];
	public showMyHireBtn: boolean;
	public version: any;
	public deviceToken: any;
	public isBackgroundMode: boolean;
	public isBackgroundModeOn: boolean;


	constructor(
		public platform: Platform,
		public navParams: NavParams,
		private storage: Storage,
		private push: Push,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public splashScreen: SplashScreen,
		private backgroundMode: BackgroundMode,
		public localNotifications: LocalNotifications,
		public navCtrl: NavController,
		private geolocation: Geolocation,
		public toastService: ToastControllerProvider,
		public service: HttpServicesProvider,
		public alertService: AlertControllerProvider) {
		platform.ready().then(() => {
			this.initPushNotification();
		});

		this.storage.forEach((value, key, index) => {
			if (key == "deviceToken") { this.deviceToken = value; }
			else if (key == "backgroundMode") { this.isBackgroundMode = value; }
			else if (key == "version") { this.version = value; }
		})
	}

	initPushNotification() {
		if (!this.platform.is('cordova')) {
			console.log('Push notifications not initialized. Cordova is not available - Run in physical device');
			return;
		}
		const options: PushOptions = {
			android: {
				senderID: '693145121166'
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
			console.log('data -> ', data);
			//if user using app and push notification comes
			if (data.additionalData.foreground) {
				// if application open, show popup
				let title = data.title;
				let message = data.message;
				let buttons = [{
					text: 'View',
					handler: () => {
						//TODO: Your logic here
						if (data.title == "Hire Confirmed") {
							this.navCtrl.push(ThirdPage, {
								hireNo: data.additionalData['subtitle']
							});
						}
						else if (data.title == "Hire Rejected") {
							this.navCtrl.push(ForthPage, {
								hireNo: data.additionalData['subtitle']
							});
						}
						else if (data.title == "View Hire") {
							console.log("view-confirmed-hires");
							this.navCtrl.push(ViewConfirmedHiresPage);
						}
						console.log('Push notification received');
					}
				}];
				this.alertService.alertCtrlr(title, message, buttons);
				// let confirmAlert = this.alertCtrl.create({
				// 	title: data.title,
				// 	subTitle: data.message,
				// 	enableBackdropDismiss: false,
				// 	buttons: [{
				// 		text: 'View',
				// 		handler: () => {
				// 			//TODO: Your logic here
				// 			let navTransition = confirmAlert.dismiss();
				// 			navTransition.then(() => {
				// 				if (data.title == "Hire Confirmed") {
				// 					this.navCtrl.push(ThirdPage, {
				// 						hireNo: data.additionalData['subtitle']
				// 					});
				// 				}
				// 				else if (data.title == "Hire Rejected") {
				// 					this.navCtrl.push(ForthPage, {
				// 						hireNo: data.additionalData['subtitle']
				// 					});
				// 				}
				// 				else if (data.title == "View Hire") {
				// 					console.log("view-confirmed-hires");
				// 					this.navCtrl.push(ViewConfirmedHiresPage);
				// 				}
				// 				console.log('Push notification received');
				// 			});
				// 			return true;
				// 		}
				// 	}]
				// });  
				// confirmAlert.present();
			} else {
				//if user NOT using app and push notification comes
				//TODO: Your logic on click of push notification directly
				if (data.title == "Hire Confirmed") {
					this.backgroundMode.moveToForeground();
					this.navCtrl.push(ThirdPage, {
						hireNo: data.additionalData['subtitle']
					});
				}
				else if (data.title == "Hire Rejected") {
					this.backgroundMode.moveToForeground();
					this.navCtrl.push(ForthPage, {
						hireNo: data.additionalData['subtitle']
					});
				}
				else if (data.title == "View Hire") {
					//this.storage.set('backgroundMode', true);
					this.backgroundMode.moveToForeground();
					console.log("view-confirmed-hires");
					this.navCtrl.push(ViewConfirmedHiresPage);
				}
				console.log('Push notification clicked');
			}
		});

		pushObject.on('error').subscribe(error => console.log(error));
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
			console.log(this.isBackgroundMode);
			if (this.isBackgroundMode == true) {
				this.globalArray.push({ name: "activeHire" });
				this.showMyHireBtn = false;
				this.refresherEnabled = true;
			}
			else if (this.version == "old") {
				this.storage.set('isLoaded', "loaded");
				this.showMyHireBtn = true;
				this.refresherEnabled = false;
				this.update();
			}
			else if (val == "loaded") {
				this.getDriverList();
				this.showMyHireBtn = false;
				this.refresherEnabled = true;
				console.log("loaded");
			}
			else {
				this.storage.set('isLoaded', "loaded");
				this.globalArray.push({ name: "loading" });
				this.showMyHireBtn = true;
				this.refresherEnabled = false;
				console.log("not loaded");
			}
		});
	}

	update() {
		let confirmAlert = this.alertCtrl.create({
			title: "Update!",
			subTitle: "This app has a new version. Please uninstall this app and visit 'http://www.my3wheel.lk' then install new version.",
			enableBackdropDismiss: false,
			buttons: [{
				text: 'OK',
				handler: () => {
					this.getDriverList();
					this.showMyHireBtn = false;
					this.refresherEnabled = true;
				}
			}]
		});
		confirmAlert.present();
	}

	getDriverList() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
		this.globalArray = [];
		//this.storage.get('deviceToken').then((val) => {
		this.service.unconfirmedHires(this.deviceToken).subscribe(data => {
			if (data == "no hires") {
				this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position) => {
					this.longitude = position['coords']['longitude'];
					this.latitude = position['coords']['latitude'];
					this.service.driverDistance(this.longitude, this.latitude).subscribe(location => {
						console.log(location);
						this.loading.dismiss();
						if (location != "No results") {
							console.log(Object.keys(location).length);
							this.showMyHireBtn = false;
							for (let i = 0; i < Object.keys(location).length; i++) {
								let image = "data:image/png;base64," + location[i]["DriverImage"];
								this.globalArray.push({ name: location[i]["DriverName"], vehicleNo: location[i]["DriverVehicle"], distance: location[i]["DriverDistance"], time: location[i]["DriverTime"], drivrId: location[i]["DriverID"], dImage: image });
							}
						}
						else {
							console.log('location no');
							this.showMyHireBtn = false;
							this.globalArray.push({ name: "null" });
						}
					},
						(err) => {
							console.log(err);
							this.globalArray.push({ name: "noNetwork" });
							this.loading.dismiss();
							this.showMyHireBtn = true;
							this.refresherEnabled = true;
						});
				});
			}
			else {
				this.globalArray.push({ name: "activeHire" });
				this.loading.dismiss();
				this.showMyHireBtn = false;
				this.refresherEnabled = true;
			}
		},
			(err) => {
				console.log(err);
				this.globalArray.push({ name: "noNetwork" });
				this.loading.dismiss();
				this.showMyHireBtn = true;
				this.refresherEnabled = true;
			});
		// }).catch(err => {
		// 	console.error();
		// 	this.globalArray.push({ name: "null" });
		// 	this.loading.dismiss();
		// });
	}

	confirmedHire() {
		console.log("confirmedHire");
		this.storage.get('deviceToken').then((val) => {
			this.service.confirmedHire(val).subscribe(data => {
				console.log(data);
				if (data != '0') {
					let hire = data;
					hire = filter(hire, o => o.p_date >= moment().format('YYYY-MM-DD'));
					if (Object.keys(hire).length > 0) {
						this.navCtrl.push(ViewConfirmedHiresPage);
					}
					else {
						let title = "No Confirmed Hires!";
						let message = "You don't have any confirmed hires at this moment.";
						let buttons = [{ text: 'OK', role: 'cancel' }];
						this.alertService.alertCtrlr(title, message, buttons);
					}
				}
				else {
					let title = "No Confirmed Hires!";
					let message = "You don't have any confirmed hires at this moment.";
					let buttons = [{ text: 'OK', role: 'cancel' }];
					this.alertService.alertCtrlr(title, message, buttons);
				}
			},
				(err) => {
					let message = "Network error! Please check your internet connection.";
					this.toastService.toastCtrlr(message);
				});
		});
	}

}
