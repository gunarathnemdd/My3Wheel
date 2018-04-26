import { Component } from '@angular/core';
import { App, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private backgroundMode: BackgroundMode,
    public app: App,
    public alertCtrl: AlertController,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.geolocation.getCurrentPosition();

      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => console.log('Request successful'),
            error => console.log('Error requesting location permissions', error)
          );
        }
      });

      platform.registerBackButtonAction(() => {

        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();

        if (activeView.name === "HomePage") {

          if (nav.canGoBack()) { //Can we go back?
            nav.pop();
          } else {
            const alert = this.alertCtrl.create({
              title: 'App Termination',
              subTitle: 'Do you really want to close the app?',
              buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Application exit prevented!');
                }
              }, {
                text: 'Close App',
                handler: () => {
                  //platform.exitApp(); // Close this application
                  this.backgroundMode.enable();
                  this.backgroundMode.moveToBackground();
                }
              }]
            });
            alert.present();
          }
        }
      });
    });
  }
}

