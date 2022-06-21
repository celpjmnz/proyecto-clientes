import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { clients } from '../shared/models/clients.interface';
import { retry, catchError, Observable, tap, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _clients: clients | undefined;

  get clientes(): clients {
    return { ...this._clients! };
  }

  constructor(public http: HttpClient) {}

  /* verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<clients>('http://localhost:3000/clientusers/4').pipe(
      map((clientes) => {
        this._clients = clientes;
        return true;
      })
    );
  } */

  login(user: any) {
    let url = 'http://localhost:3000/loginclientusers';

    return this.http.post(url, user);
  }

  register(data: clients): Observable<clients> {
    console.log(data);
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify({
      nombreUsuarioCliente: data.nombreUsuarioCliente,
      password: data.password,
    });
    let url = 'http://localhost:3000/clientusers';
    console.log(body);
    return this.http.post<clients>(url, body, { headers }).pipe(retry(1));
  }
}
