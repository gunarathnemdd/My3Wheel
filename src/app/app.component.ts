import { Component } from '@angular/core';
import { App, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { AlertControllerProvider } from '../providers/alert-controller/alert-controller';
import { ToastControllerProvider } from '../providers/toast-controller/toast-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  public lastBack: any = Date.now();
  public allowClose: boolean = false;
  public translate: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    private storage: Storage,
    private backgroundMode: BackgroundMode,
    public app: App,
    public service: HttpServicesProvider,
    public toastService: ToastControllerProvider,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    public alertService: AlertControllerProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.geolocation.getCurrentPosition();

      console.log('old version');

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
        const overlay = this.app._appRoot._overlayPortal._views[0];//getActive();
        const nav = app.getActiveNavs()[0];
        const activeView = nav.getActive();
        const closeDelay = 2000;
        const spamDelay = 500;
        if (activeView.name === "HomePage") {
          if (overlay && overlay.dismiss) {
            overlay.dismiss();
          } else if (nav.canGoBack()) {
            nav.pop();
          } else if (Date.now() - this.lastBack > spamDelay && !this.allowClose) {
            this.allowClose = true;
            let toast = this.toastCtrl.create({
              message: "Press BACK again to exit",
              duration: closeDelay,
              dismissOnPageChange: true
            });
            toast.onDidDismiss(() => {
              this.allowClose = false;
            });
            toast.present();
          } else if (Date.now() - this.lastBack < closeDelay && this.allowClose) {
            //platform.exitApp();
            this.backgroundMode.enable();
            this.backgroundMode.moveToBackground();
          }
          this.lastBack = Date.now();
        }
      });
    });
  }
}

