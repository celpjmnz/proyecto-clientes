import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListTripsService } from '../services/list-trips.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { DeleteTripComponent } from './delete-trip/delete-trip.component';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css'],
})
export class ListTripsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns = [
    'fecha',
    'conductor',
    'tipoVehiculo',
    'destino',
    'actions',
  ];
  idUsuario: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  public fechaFilter = new FormControl();
  public conductorFilter = new FormControl();
  public TipoVehiculoFilter = new FormControl();
  public destinoFilter = new FormControl();
  private filterValues = {
    fecha: '',
    conductor: '',
    tipoVehiculo: '',
    destino: '',
  };
  VehiculosList = [];

  constructor(private service: ListTripsService, public dialog: MatDialog) {
    //this.getVehiculos();
  }

  ngOnInit() {
    this.service.getViajes().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
    });
    this.onChanges();
  }

  /*  getVehiculos() {
    this.service.getVehiculos().subscribe((data) => {
      this.VehiculosList = data;
    });
  } */

  onChanges(): void {
    this.fechaFilter.valueChanges.subscribe((value) => {
      this.filterValues['fecha'] = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.conductorFilter.valueChanges.subscribe((value) => {
      this.filterValues['conductor'] = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.TipoVehiculoFilter.valueChanges.subscribe((value) => {
      this.filterValues['tipoVehiculo'] = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.destinoFilter.valueChanges.subscribe((value) => {
      this.filterValues['destino'] = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        data.fecha.toLowerCase().indexOf(searchTerms.fecha.toLowerCase()) !=
          -1 &&
        data.conductor
          .toLowerCase()
          .indexOf(searchTerms.conductor.toLowerCase()) != -1 &&
        data.tipoVehiculo
          .toLowerCase()
          .indexOf(searchTerms.tipoVehiculo.toLowerCase()) != -1 &&
        data.destino.toLowerCase().indexOf(searchTerms.destino.toLowerCase()) !=
          -1
      );
    };
    return filterFunction;
  }
  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteTripComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.ngOnInit();
      }
    });
  }
}
