import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { App } from 'ionic-angular';

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

  public dri_name : string;
  public vehicle_nu : string;
  public dri_phone : any;
  public pickup_location : string;
  public destination : string;
  public pickup_date : any;
  public pickup_time : any;
  public hireFee : any;
  public driverId : any;
  public passenger_Id : any;
  public rider_Confirm : any;
 
  host = 'https://greenic.000webhostapp.com';

  constructor(public navCtrl: NavController, public app: App , public platform: Platform ,public navParams: NavParams, public http: HttpClient ) {

    this.platform = platform;

    this.navParams = navParams
    this.dri_name = this.navParams.get('driName');
    this.vehicle_nu = this.navParams.get('vehiNum');
    this.pickup_location = navParams.get('pickup');
    this.destination = navParams.get('pDestination');
    this.pickup_date = navParams.get('pickDate');
    this.pickup_time = navParams.get('pickTime');  
    this.hireFee = navParams.get('wheelFee'); 
    this.driverId = navParams.get('drivId');
    this.passenger_Id = navParams.get('riderId');
  }

  goHome(){
    this.http.get(this.host + '/my3Wheel_riderReject.php?passengerId=' + this.passenger_Id + '&driverId=' + this.driverId ).subscribe(data => {
      console.log(data); 
    const root = this.app.getRootNav();
    root.popToRoot();
    })
  }

  exitApp(){
    this.rider_Confirm = 'yes';
    console.log(this.hireFee);
    this.http.get(this.host + '/my3Wheel_riderConfirm.php?passengerId=' + this.passenger_Id + '&driverId=' + this.driverId + '&wheelFee=' + this.hireFee).subscribe(data => {
      console.log(data);  
    document.getElementById("exitNote").innerHTML = "Have a safe journey";
    this.platform.exitApp();
    //app.this.platform.exitApp();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPage');
  }

//   exitApp(){
//     document.getElementById("notice").innerHTML = "Your driver will come on the given time";
//     this.platform.exitApp();  
//  }

}
