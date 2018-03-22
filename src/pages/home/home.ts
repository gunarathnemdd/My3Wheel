import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SecondPage } from '../second/second';
import { AuthServicesProvider } from '../../providers/auth-services/auth-services';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';

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

	host = 'https://greenic.000webhostapp.com/php/my3Wheel';

	public globalArray: any[] = [];

	constructor(
		public splashScreen: SplashScreen,
		public http: HttpClient, 
		public authService: AuthServicesProvider, 
		public navCtrl: NavController,
		private geolocation: Geolocation) { }


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
		console.log('ionViewDidLoad AuthServicesProvider');
		this.splashScreen.hide();
		this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position) => {
			this.longitude = position['coords']['longitude'];
			this.latitude = position['coords']['latitude'];

			this.http.get(this.host + '/my3Wheel_getDriverDistance.php?longitude=' + this.longitude + '&latitude=' + this.latitude).subscribe(location => {
				console.log(location);
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
