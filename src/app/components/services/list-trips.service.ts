import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
//import { URL_BASE } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ListTripsService {
  navegacionUrl: any;
  token: any;
  constructor(public http: HttpClient) {}

  getViajes(): Observable<any> {
    // let queryParams = new HttpParams().append('idUsuario', IdUsuario);
    let url = 'http://localhost:3000/view';
    return this.http.get(url);
  }

  deleteViaje(id: number) {
    let url = 'http://localhost:3000/travels/';
    let Url = url + id;
    // console.log(Url);
    return this.http.delete(Url).subscribe((data) => {
      console.log(data);
    });
  }
}
