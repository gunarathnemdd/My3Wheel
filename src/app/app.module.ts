import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { CallNumber } from '@ionic-native/call-number';
import { AppUpdate } from '@ionic-native/app-update';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SecondPage } from '../pages/second/second';
import { ThirdPage } from '../pages/third/third';
import { ForthPage } from '../pages/forth/forth';
import { SelectConfirmedHirePage } from '../pages/select-confirmed-hire/select-confirmed-hire';
import { ViewConfirmedHiresPage } from '../pages/view-confirmed-hires/view-confirmed-hires';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { AlertControllerProvider } from '../providers/alert-controller/alert-controller';
import { ToastControllerProvider } from '../providers/toast-controller/toast-controller';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SecondPage,
    ThirdPage,
    ForthPage,
    SelectConfirmedHirePage,
    ViewConfirmedHiresPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SecondPage,
    ThirdPage,
    ForthPage,
    SelectConfirmedHirePage,
    ViewConfirmedHiresPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    LocalNotifications,
    LocationAccuracy,
    Geolocation,
    BackgroundMode,
    CallNumber,
    AppUpdate,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServicesProvider,
    AlertControllerProvider,
    ToastControllerProvider
  ]
})
export class AppModule {}
