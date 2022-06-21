import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationTokenService {
  private minutesBeetwenDates(dt2: Date, dt1: Date) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  getAuth(): boolean {
    const objetoRaw = localStorage.getItem('loginToken');

    if (!objetoRaw) {
      return false;
    }

    const tokenData: { username: string; time: string } = JSON.parse(objetoRaw);

    const difference = this.minutesBeetwenDates(
      new Date(),
      new Date(tokenData.time)
    );

    const tokenExpired = difference >= 5;

    if (tokenExpired) {
      return false;
    }

    return true;
  }
}
