import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { ThirdPage } from '../../pages/third/third';
import { ForthPage } from '../../pages/forth/forth';

/**
 * Generated class for the SecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {

  private hire: FormGroup;
  public minDate: any;
  public minTime: any;
  public maxDate: any;

  public pasngr_name: any;
  public pasngr_phone: any;
  public pickup_location: string;
  public destination: string;
  public pickup_date: any;
  public pickup_time: any;

  public driverName: string;
  public vehicleNo: string;
  public distance: any;
  public time: any;
  public driverId: string;
  public driverImage: any;

  public driName: string;
  public vehiNum: string;
  public pickup: string;
  public pDestination: string;
  public pickDate: any;
  public pickTime: any;
  public wheelFee: any;
  public drivId: any;
  public riderId: any;

  public hireCost: any;

  public drivConfirmed: string;
  public hireFee: any;

  public valueName: any;
  public valuePhone: any;
  public valueLocation: any;
  public valueDestination: any;
  public valueDate: any;
  public valueTime: any;

  public inputName: any;
  public inputLocation: any;
  public inputDestination: any;
  public inputPhone: any;
  public inputDate: any;
  public inputTime: any;

  public timeoutId: any;

  public namePlaceholder: any = "Your Name";
  public phoneNumberPlaceholder: any = "Phone Number";
  public pickupLocationPlaceholder: any = "Pickup Location";
  public destinationPlaceholder: any = "Destination";
  public datePlaceholder: any = "yyyy/mm//dd";
  public timePlaceholder: any = "hh:mm";

  host = 'http://www.my3wheel.lk/php/my3Wheel';

  constructor(public alertCtrl: AlertController, public platform: Platform, public navCtrl: NavController, public http: HttpClient, public navParams: NavParams) {

    this.platform = platform;

    this.navParams = navParams
    this.driverName = this.navParams.get('dName');
    this.vehicleNo = this.navParams.get('vehicleNu');
    this.distance = this.navParams.get('d_distance');
    this.time = this.navParams.get('d_time');
    this.driverId = this.navParams.get('dId');
    this.driverImage = this.navParams.get('d_Image');
    console.log(this.driverId);

    this.minDate = moment().format('YYYY-MM-DD');
    this.maxDate = moment(this.minDate,'YYYY-MM-DD').add(1, 'year').format('YYYY-MM-DD');

    this.hire = new FormGroup({
      pasngr_name: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      pasngr_phone: new FormControl('', Validators.compose([Validators.minLength(9), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])),
      pickup_location: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      destination: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      pickup_date: new FormControl('', Validators.compose([Validators.required])),
      pickup_time: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  // nxtpge(hireNo, driverName, vehicleNo, driverId) {
  //   clearTimeout(this.timeoutId);
  //   console.log(hireNo, driverName, vehicleNo, driverId);
  //   this.http.get(this.host + '/my3Wheel_isDriverConfirmed.php?hireNo=' + hireNo).subscribe(data => {

  //     this.drivConfirmed = data["Driver_Accept"];
  //     this.hireFee = data["hireCost"];
  //     console.log(this.drivConfirmed, this.hireFee);

  //     if (this.drivConfirmed == 'yes') {
  //       console.log("yes", this.hire.value["pickup_location"], this.hire.value["destination"], this.hire.value["pickup_date"], this.hire.value["pickup_time"]);
  //       this.navCtrl.push(ThirdPage, {
  //         hireNo: hireNo,
  //         driName: driverName,
  //         vehiNum: vehicleNo,
  //         pickup: this.hire.value["pickup_location"],
  //         pDestination: this.hire.value["destination"],
  //         pickDate: this.hire.value["pickup_date"],
  //         pickTime: this.hire.value["pickup_time"],
  //         riderId: this.hire.value["pasngr_phone"],
  //         wheelFee: this.hireFee,
  //         drivId: this.driverId
  //       })
  //     }
  //     else if (this.drivConfirmed == 'No') {
  //       console.log("No", this.hire.value["pickup_location"], this.hire.value["destination"], this.hire.value["pickup_date"], this.hire.value["pickup_time"]);
  //       this.navCtrl.push(ForthPage, {
  //         driName: driverName,
  //         vehiNum: vehicleNo,
  //         pickup: this.hire.value["pickup_location"],
  //         pDestination: this.hire.value["destination"],
  //         pickDate: this.hire.value["pickup_date"],
  //         pickTime: this.hire.value["pickup_time"]
  //       })
  //     }
  //     else if (this.drivConfirmed == 'no') {
  //       console.log("no");
  //       this.timeoutId = setTimeout(() => {
  //         this.nxtpge(hireNo, driverName, vehicleNo, driverId);
  //       }, 10000)
  //     }
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage , AuthServicesProvider');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Successfully Sent!',
      subTitle: 'Request has been sent successfully, You will receive a reply in next 3 minutes!',
			enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //this.platform.exitApp();
          }
        }
      ]

    });
    alert.present();
  }

  onClickNextField(type, data) {
    if (type == "name") {
      this.checkValidation();
    }
    else if (type == "phoneNumber") {
      this.checkValidation();
    }
    else if (type == "pickLocation") {
      this.checkValidation();
    }
    else if (type == "destination") {
      this.checkValidation();
    }
  }

  onClickNextField2() {
    this.checkValidation();
  }

  onClickNextField3() {
    this.checkValidation();
  }

  checkValidation() {
    this.inputName = document.querySelector('#inputPname');
    this.inputPhone = document.querySelector('#inputPphone');
    this.inputLocation = document.querySelector('#inputPLocation');
    this.inputDestination = document.querySelector('#inputPdestination');
    this.inputDate = document.querySelector('#inputPdate');
    this.inputTime = document.querySelector('#inputPtime');

    this.inputName.style.border = "1px solid #bebdbd";
    this.inputPhone.style.border = "1px solid #bebdbd";
    this.inputLocation.style.border = "1px solid #bebdbd";
    this.inputDestination.style.border = "1px solid #bebdbd";
    this.inputDate.style.border = "1px solid #bebdbd";
    this.inputTime.style.border = "1px solid #bebdbd";

    if (this.hire["controls"]["pasngr_name"].hasError('pattern')) {
      this.valueName = document.getElementById("inputPname");
      this.namePlaceholder = "Only letters and spaces";
      this.inputName.style.border = '1px solid red';
      this.hire["controls"]["pasngr_name"].reset();
    }
    else if ((this.hire["controls"]["pasngr_phone"].hasError('minlength')) || (this.hire["controls"]["pasngr_phone"].hasError('maxlength'))) {
      this.valuePhone = document.getElementById("inputPphone");
      this.phoneNumberPlaceholder = "Length shoud be 9 or 10";
      this.inputPhone.style.border = '1px solid red';
      this.hire["controls"]["pasngr_phone"].reset();
    }
    else if (this.hire["controls"]["pickup_location"].hasError('pattern')) {
      this.valueLocation = document.getElementById("inputPLocation");
      this.pickupLocationPlaceholder = "Only letters and spaces";
      this.inputLocation.style.border = '1px solid red';
      this.hire["controls"]["pickup_location"].reset();
    }
    else if (this.hire["controls"]["destination"].hasError('pattern')) {
      this.valueDestination = document.getElementById("inputPdestination");
      this.destinationPlaceholder = "Only letters and spaces";
      this.inputDestination.style.border = '1px solid red';
      this.hire["controls"]["destination"].reset();
    }
    else if (this.hire["controls"]["pasngr_name"].hasError('required')) {
      this.valueName = document.getElementById("inputPname");
      this.namePlaceholder = "Please enter name";
      this.inputName.style.border = '1px solid red';
      this.hire["controls"]["pasngr_name"].reset();
    }
    else if (this.hire["controls"]["pasngr_phone"].hasError('required')) {
      this.valuePhone = document.getElementById("inputPphone");
      this.phoneNumberPlaceholder = "Please enter phone number";
      this.inputPhone.style.border = '1px solid red';
      this.hire["controls"]["pasngr_phone"].reset();
    }
    else if (this.hire["controls"]["pickup_location"].hasError('required')) {
      this.valueLocation = document.getElementById("inputPLocation");
      this.pickupLocationPlaceholder = "Please enter location";
      this.inputLocation.style.border = '1px solid red';
      this.hire["controls"]["pickup_location"].reset();
    }
    else if (this.hire["controls"]["destination"].hasError('required')) {
      this.valueDestination = document.getElementById("inputPdestination");
      this.destinationPlaceholder = "Pleas enter destination";
      this.inputDestination.style.border = '1px solid red';
      this.hire["controls"]["destination"].reset();
    }
    else if (this.hire["controls"]["pickup_date"].hasError('required')) {
      this.valueDate = document.getElementById("inputPdate");
      this.datePlaceholder = "Please enter date";
      this.inputDate.style.border = '1px solid red';
      this.hire["controls"]["pickup_date"].reset();
    }
    else if (this.hire["controls"]["pickup_time"].hasError('required')) {
      this.valueTime = document.getElementById("inputPtime");
      this.timePlaceholder = "Please enter time";
      this.inputTime.style.border = '1px solid red';
      this.hire["controls"]["pickup_time"].reset();
    }
  }

  getHire() {
    if (this.hire["valid"]) {
      let pTime = moment(this.hire.value["pickup_time"], "hh:mm").format("hh:mm a");

      this.http.get(this.host + '/my3Wheel_passenger.php?pasngrName=' + this.hire.value["pasngr_name"] + '&pasngrPhone=' + this.hire.value["pasngr_phone"] + '&pickupLocation=' + this.hire.value["pickup_location"] + '&destination=' + this.hire.value["destination"] + '&pickupDate=' + this.hire.value["pickup_date"] + '&pickupTime=' + pTime + '&driverId=' + this.driverId).subscribe(data => {
        console.log(data["response"]);
        let hireNo = data["hireNo"];
        //this.nxtpge(hireNo, this.driverName, this.vehicleNo, this.driverId);
        this.showAlert();
      });
    }
    else {
      this.checkValidation();
    }
  }
}
