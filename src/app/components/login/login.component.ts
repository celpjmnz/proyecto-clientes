import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nombreUsuarioCliente!: string;
  password!: string;

  constructor(private router: Router, private service: LoginService) {}

  login() {
    /* this.service.login().subscribe((resp) => {
      console.log(typeof resp?.idUsuarioCliente);
      if (resp) {
        this.router.navigate(['./listTrips']);
      }
    }); */
    const user = {
      nombreUsuarioCliente: this.nombreUsuarioCliente,
      password: this.password,
    };
    this.service.login(user).subscribe((data) => {
      console.log(data);
    });
  }

  logout() {
    this.router.navigate(['./login']);
  }

  ngOnInit(): void {}
}
