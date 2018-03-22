import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SecondPage } from '../pages/second/second';
import { AuthServicesProvider} from '../providers/auth-services/auth-services';
import { IonicStorageModule } from '@ionic/storage';
import { ThirdPage } from '../pages/third/third';
import { ForthPage } from '../pages/forth/forth';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SecondPage,
    ThirdPage,
    ForthPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SecondPage,
    ThirdPage,
    ForthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AuthServicesProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationAccuracy
  ]
})
export class AppModule {}
