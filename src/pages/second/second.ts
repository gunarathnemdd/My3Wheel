import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import moment from 'moment';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../home/home';
import { ThirdPage } from '../../pages/third/third';
import { ForthPage } from '../../pages/forth/forth';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ToastControllerProvider } from '../../providers/toast-controller/toast-controller';

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
  public dateplaceholder: any = "yyyy/mm/dd";
  public timeplaceholder: any = "hh:mm";

  public pushTimeOut: any;
  public timeOut: any;
  public hireNo: any;

  public alert: any;

  constructor(
    public alertCtrl: AlertController,
    public platform: Platform,
    public navCtrl: NavController,
    public toastService: ToastControllerProvider,
    public navParams: NavParams,
    private storage: Storage,
    private backgroundMode: BackgroundMode,
    public service: HttpServicesProvider) {

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
    this.maxDate = moment(this.minDate, 'YYYY-MM-DD').add(1, 'year').format('YYYY-MM-DD');

    this.hire = new FormGroup({
      pasngr_name: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      pasngr_phone: new FormControl('', Validators.compose([Validators.minLength(9), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])),
      pickup_location: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      destination: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      pickup_date: new FormControl('', Validators.compose([Validators.required])),
      pickup_time: new FormControl('', Validators.compose([Validators.required]))
    });

    this.backgroundMode.enable();
    this.backgroundMode.on("activate").subscribe(() => {
      console.log('enabled');
      this.navCtrl.setRoot(HomePage);
      let navTransition = this.alert.dismiss();
      navTransition.then(() => {
        this.timeOutDelete(60000);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage , AuthServicesProvider');
  }

  timeOutDelete(time) {
    this.pushTimeOut = setTimeout(() => {
      this.service.deleteTimeOutHires(this.hireNo).subscribe(data => {
        console.log(data);
        if (data['responce'] != 'error') {
          clearTimeout(this.pushTimeOut);
          this.deleteHire(this.hireNo, data['responce']);
        }
      },
        (err) => {
          clearTimeout(this.pushTimeOut);
          let message = "Network error! Please check your internet connection.";
          this.toastService.toastCtrlr(message);
        });
    }, time);
  }

  backGroundService(time) {
    this.navCtrl.setRoot(HomePage);
    this.backgroundMode.moveToBackground();
    this.backgroundMode.on("activate").subscribe(() => {
      this.timeOutDelete(time);
    });
  }

  showAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Successfully Sent!',
      subTitle: 'Request has been sent successfully, You will receive a reply in next 3 minutes!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //this.platform.exitApp();
            let navTransition = this.alert.dismiss();
            navTransition.then(() => {
              this.backGroundService(60000);
            });
            return false;
          }
        }
      ]
    });
    let alertPresent = this.alert.present();
    alertPresent.then(() => {
      this.timeOut = setTimeout(() => {
        let navTransition = this.alert.dismiss();
        navTransition.then(() => {
          this.backGroundService(57000);
        });
        clearTimeout(this.timeOut);
        return false;
      }, 3000);
    });
  }

  deleteHire(hireNo, driverId) {
    this.service.rejectHire(hireNo, driverId, 'delete').subscribe(data => {
      console.log(data);
    },
      (err) => {
        let message = "Network error! Please check your internet connection.";
        this.toastService.toastCtrlr(message);
      });
  }

  sliceInvalidPattern(event: any) {
    this.inputPhone = document.querySelector('#inputPphone');
    this.inputPhone.style.border = "1px solid #bebdbd";
    let MY_REGEXP = /^\d+$/;

    let newValue = event.target.value;
    let regExp = new RegExp(MY_REGEXP);
    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
      this.valuePhone = document.getElementById("inputPphone");
      this.phoneNumberPlaceholder = "Only numbers";
      this.inputPhone.style.border = '1px solid red';
      this.hire["controls"]["pasngr_phone"].reset();
    }
    else {
      this.inputPhone.style.border = "1px solid #bebdbd";
    }
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
      this.phoneNumberPlaceholder = "Length should be 9 or 10";
      this.inputPhone.style.border = '1px solid red';
      this.hire["controls"]["pasngr_phone"].reset();
    }
    else if (this.hire["controls"]["pasngr_phone"].hasError('pattern')) {
      this.valuePhone = document.getElementById("inputPphone");
      this.phoneNumberPlaceholder = "Only numbers";
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
    else if (this.hire["controls"]["pasngr_name"].hasError('required') || (this.hire["value"]["pasngr_name"].trim() == "")) {
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
    else if (this.hire["controls"]["pickup_location"].hasError('required') || (this.hire["value"]["pickup_location"].trim() == "")) {
      this.valueLocation = document.getElementById("inputPLocation");
      this.pickupLocationPlaceholder = "Please enter location";
      this.inputLocation.style.border = '1px solid red';
      this.hire["controls"]["pickup_location"].reset();
    }
    else if (this.hire["controls"]["destination"].hasError('required') || (this.hire["value"]["destination"].trim() == "")) {
      this.valueDestination = document.getElementById("inputPdestination");
      this.destinationPlaceholder = "Please enter destination";
      this.inputDestination.style.border = '1px solid red';
      this.hire["controls"]["destination"].reset();
    }
    else if (this.hire["controls"]["pickup_date"].hasError('required')) {
      this.valueDate = document.getElementById("inputPdate");
      this.dateplaceholder = "please enter date";
      this.inputDate.style.border = '1px solid red';
      this.hire["controls"]["pickup_date"].reset();
    }
    else if (this.hire["controls"]["pickup_time"].hasError('required')) {
      this.valueTime = document.getElementById("inputPtime");
      this.timeplaceholder = "please enter time";
      this.inputTime.style.border = '1px solid red';
      this.hire["controls"]["pickup_time"].reset();
    }
  }

  getHire() {
    if (this.hire.value["pickup_location"] == this.hire.value["destination"]) {
      this.valueDestination = document.getElementById("inputPdestination");
      this.destinationPlaceholder = "Destination can't be same";
      this.inputDestination.style.border = '1px solid red';
      this.hire["controls"]["destination"].reset();
    }
    else if (this.hire["valid"]) {
      let pTime = moment(this.hire.value["pickup_time"], "hh:mm").format("hh:mm a");
      this.storage.get('deviceToken').then((val) => {
        let deviceToken = val;
        this.service.requestHire(this.hire.value["pasngr_name"].trim(), this.hire.value["pasngr_phone"], this.hire.value["pickup_location"].trim(), this.hire.value["destination"].trim(), this.hire.value["pickup_date"], pTime, this.driverId, deviceToken).subscribe(data => {
          console.log(data["response"]);
          this.hireNo = data["hireNo"];
          this.storage.set('backgroundMode', true);
          this.storage.set('backgroundModeOn', true);
          this.showAlert();
        },
          (err) => {
            let message = "Network error! Please check your internet connection.";
            this.toastService.toastCtrlr(message);
          });
      });
    }
    else {
      this.checkValidation();
    }
  }
}
