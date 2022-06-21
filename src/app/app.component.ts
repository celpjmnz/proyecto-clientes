import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './components/services/login.service';
import { users } from './components/shared/models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /*  get user() {
    return this.Loginservice.clientes;
  } */

  constructor(private Loginservice: LoginService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigate(['./list-trips']);
  }
}
