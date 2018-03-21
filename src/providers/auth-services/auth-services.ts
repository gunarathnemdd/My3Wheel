import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServicesProvider {

	//public pasngr_name: string;
  public name: string;

  constructor(public http: HttpClient) {
    console.log('Hello AuthServicesProvider Provider');
  }

  host = 'https://greenic.000webhostapp.com';

  passengerLogIn(pasngr_name, pasngr_phone, pickup_location, destination, pickup_date, pickup_time, third){
  
  	console.log(pasngr_name, pasngr_phone, pickup_location, destination, pickup_date,  pickup_time);
    
  	this.http.get(this.host + '/my3wheel_passenger.php?pasngrName=' + pasngr_name+ '&pasngrPhone='+pasngr_phone + '&pickupLocation=' +pickup_location + '&destination=' +destination + '&pickupDate=' + pickup_date + '&pickupTime=' + pickup_time + '&driverId=' + third).subscribe(data => {
    
    console.log(data["response"]);	
      
      });

  }

  displayDetails(){
    
    this.http.get(this.host + '/my3wheel_driverAvailability.php?').subscribe(data => {
    
    this.name = data["name"];  
      return this.name;
    });
    //console.log(this.name);
    //return this.name;
  }


}
