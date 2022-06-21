import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddTripService } from '../services/add-trip.service';
import { AuthenticationTokenService } from '../services/check-token.service';
import { UsersService } from '../services/users.service';
import { trips } from '../shared/models/trips';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'],
})
export class AddTripComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Output() confirmRequest = new EventEmitter<any>();

  driversList: any = [];
  vehiclesList: any = [];
  fecha!: string;
  idUsuario!: number;
  idCliente!: number;
  idTipoVehiculo!: number;
  destino!: string;
  ViajesForm!: FormGroup;

  isEditable = false;

  constructor(
    //  @Inject(MAT_DIALOG_DATA) public viajes: trips,
    private serviceConductores: UsersService,
    private service: AddTripService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthenticationTokenService
  ) {
    // this.viajes = new trips();
    this.getConductores();
    this.getVehiculos();
  }

  ngOnInit() {
    this.setForm();
    this.AuthService.getAuth();
  }

  setForm() {
    this.ViajesForm = new FormGroup({
      fecha: new FormControl(this.fecha, [Validators.required]),
      idUsuario: new FormControl(this.idUsuario, [Validators.required]),
      idCliente: new FormControl(1, [Validators.required]),
      destino: new FormControl(this.destino, [Validators.required]),
      idTipoVehiculo: new FormControl(this.idTipoVehiculo, [
        Validators.required,
      ]),
    });
  }

  getConductores() {
    this.serviceConductores.getConductores().subscribe((conductores) => {
      this.driversList = conductores;
    });
  }
  getVehiculos() {
    this.service.getVehiculos().subscribe((vehiculos) => {
      this.vehiclesList = vehiculos;
    });
  }

  public confirm(): void {
    if (this.ViajesForm.valid) {
      // console.log(this.ViajesForm.value);
      this.service.add(this.ViajesForm.value).subscribe((res) => {
        console.log('Viaje añadido!');
      });
      //  this.router.navigate(['./listTrips']);
    }
    this.router.navigate(['./listTrips']);
  }
}
