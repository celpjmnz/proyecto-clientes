import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  UsuariosForm!: FormGroup;

  constructor(private router: Router, private service: LoginService) {}

  setForm() {
    this.UsuariosForm = new FormGroup({
      nombreUsuarioCliente: new FormControl(this.nombreUsuarioCliente, [
        Validators.required,
      ]),
      password: new FormControl(this.password, [Validators.required]),
    });
  }

  login() {
    this.service.login(this.UsuariosForm.value).subscribe((data) => {
      console.log(data);
      localStorage.setItem(
        'loginToken',
        JSON.stringify({
          username: this.UsuariosForm.value.nombre,
          time: new Date().toISOString(),
        })
      );
      this.router.navigate(['./listTrips']);
    });
  }

  logout() {
    localStorage.removeItem('loginToken');
    this.router.navigate(['./login']);
  }

  ngOnInit(): void {
    this.setForm();
  }
}
