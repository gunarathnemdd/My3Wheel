import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpServicesProvider {

  public host = 'http://www.my3wheel.lk/php/my3Wheel';
  public host2 = 'http://www.my3wheel.lk/php/common';

  constructor(public http: HttpClient) {
    console.log('Hello HttpServicesProvider Provider');
  }

  confirmedHire(deviceToken) {
    return this.http.get(this.host + '/my3Wheel_availableHire.php?deviceToken=' + deviceToken);
  }

  driverDistance(longitude, latitude) {
    return this.http.get(this.host + '/my3Wheel_getDriverDistance.php?longitude=' + longitude + '&latitude=' + latitude);
  }

  unconfirmedHires(deviceToken) {
    return this.http.get(this.host + '/my3Wheel_unconfirmedHires.php?deviceToken=' + deviceToken);
  }

  deleteTimeOutHires(hireNo) {
    return this.http.get(this.host2 + '/common_deleteTimeOutHires.php?hireNo=' + hireNo + '&state=driver');
  }

  rejectHire(hireNo, driverId, state) {
    return this.http.get(this.host2 + '/common_rejectHire.php?hireNo=' + hireNo + '&driverId=' + driverId + '&state='  + state);
  }

  riderReject(hireNo, driverId, state) {
    return this.http.get(this.host2 + '/common_riderReject.php?hireNo=' + hireNo + '&driverId=' + driverId + '&state=' + state);
  }

  riderConfirm(hireNo, driverId, hireFee) {
    return this.http.get(this.host + '/my3Wheel_riderConfirm.php?hireNo=' + hireNo + '&driverId=' + driverId + '&wheelFee=' + hireFee);
  }

  requestHire(name, phone, start, end, date, time, driverId, deviceToken) {
    return this.http.get(this.host + '/my3Wheel_passenger.php?pasngrName=' + name + '&pasngrPhone=' + phone + '&pickupLocation=' + start + '&destination=' + end + '&pickupDate=' + date + '&pickupTime=' + time + '&driverId=' + driverId + '&deviceToken=' + deviceToken);
  }

  isDriverConfirmed(hireNo) {
    return this.http.get(this.host + '/my3Wheel_isDriverConfirmed.php?hireNo=' + hireNo);
  }

}
