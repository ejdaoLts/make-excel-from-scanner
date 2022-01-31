import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort/*, MatSortable*/ } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GenerateExcelService } from '../services/generateExcel.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @HostBinding('class') ComponentCssClass: any;


  displayedColumns: string[] = ['id', 'factura', 'ingreso', 'entidad', 'total_factura', 'fecha_facturacion', 'identificacion', 'paciente', 'fecha_ingreso', 'fecha_egreso', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
  @ViewChild(MatSort, { static: true }) sort: MatSort | any;

  value: string = "";
  arrayValues: any = [];
  processing: boolean = false;
  darkMode: boolean = false;
  responsiveMode: boolean = false;

  spin: any;
  timeLeft: any;
  flag: any;
  interval: any;

  dataSource: any = new MatTableDataSource<any>(this.arrayValues);
  searchKey: any;

  constructor(private excel: GenerateExcelService, private overlayContainer: OverlayContainer, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem("arrayValues") !== null) {
      this.dataSource = new MatTableDataSource<any>(JSON.parse(localStorage.getItem("arrayValues")!));
      this.arrayValues = JSON.parse(localStorage.getItem("arrayValues")!);
      //this.sort.sort(({ id: 'id', start: 'desc'}) as MatSortable);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    if (localStorage.getItem('style') === null || localStorage.getItem('style') === 'cool-theme') {
      localStorage.setItem('style', 'cool-theme')
      this.overlayContainer.getContainerElement().classList.add('cool-theme');
      this.ComponentCssClass = 'cool-theme';
      this.darkMode = false;
    } else {
      localStorage.setItem('style', 'dark-theme')
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      this.ComponentCssClass = 'dark-theme';
      this.darkMode = true;
    }

    if(localStorage.getItem('responsive') === null || localStorage.getItem('responsive') === 'false'){
      this.responsiveMode = false;
    } else{
      this.responsiveMode = true;
    }

  }

  onSetTheme() {
    if (localStorage.getItem('style') === 'cool-theme') {
      localStorage.setItem('style', 'dark-theme')
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      this.ComponentCssClass = 'dark-theme';
      this.darkMode = true;
    } else {
      localStorage.setItem('style', 'cool-theme')
      this.overlayContainer.getContainerElement().classList.add('cool-theme');
      this.ComponentCssClass = 'cool-theme';
      this.darkMode = false;
    }

  }

  onSetResponsive() {
    if (this.responsiveMode) {
      localStorage.setItem('responsive', 'false');
      this.responsiveMode = false;
    } else {
      localStorage.setItem('responsive', 'true');
      this.responsiveMode = true;
    }
  }

  onSeeInfo(id: number): void {
   this.dialog.open(DialogComponent, {
      width: '400px',
      height: '600px',
      data: { value: this.arrayValues.filter((element: { id: number; }) => element.id === id)[0] },
    });

  }

  changeWithSetTime() {
    this.spin = true;  // Variable boolean para mostrar ion-spinner
    this.timeLeft = 1; // Variable number del temporizador, se renueva cada vez que se ejectuta el metodo (al teclear sobre el campo)
    if (!this.flag) {
      this.flag = true;  // variable boolean para generar un solo intervalo
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        }
        else {
          clearInterval(this.interval);
          this.spin = false;
          this.flag = false;

          // Fracción de código a ejecutar
          this.processing = true;
          let arrayFromValue = this.value.split(";");
          let array = {
            "id": this.generateId(),
            "factura": arrayFromValue[0],
            "ingreso": arrayFromValue[1],
            "entidad": arrayFromValue[2],
            "total_factura": arrayFromValue[3],
            "fecha_facturacion": arrayFromValue[4],
            "identificacion": arrayFromValue[5],
            "paciente": arrayFromValue[6],
            "fecha_ingreso": arrayFromValue[7],
            "fecha_egreso": arrayFromValue[8],
          }
          this.arrayValues.unshift(array);
          this.value = "";
          this.dataSource = new MatTableDataSource<any>(this.arrayValues);
          localStorage.setItem("arrayValues", JSON.stringify(this.arrayValues));
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.processing = false;


        }
      }, 500)  // Tiempo en ms en que se ejecutará la fracción de código dentro el intervalo cuando dejamos de teclear
    }
  }



  remove(id: any) {
    Swal.fire({
      title: 'Realmente quiere eliminar este item?',
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: `Si`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isDenied) {
        this.arrayValues = this.arrayValues.filter((element: { id: number; }) => element.id !== id)
        this.dataSource = new MatTableDataSource<any>(this.arrayValues);
        localStorage.setItem("arrayValues", JSON.stringify(this.arrayValues));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.processing = false;
      }
    })
  }


  generateExcel() {
    if (this.arrayValues.length <= 0) {
      Swal.fire('No hay datos en la tabla')
    } else {
      let array: any;
      let arrayWithoutId: any[] = [];
      for (let i = 0; i < this.arrayValues.length; i++) {
        array = {
          "factura": this.arrayValues[i].factura,
          "ingreso": this.arrayValues[i].ingreso,
          "entidad": this.arrayValues[i].entidad,
          "total_factura": this.arrayValues[i].total_factura,
          "fecha_facturacion": this.arrayValues[i].fecha_facturacion,
          "identificacion": this.arrayValues[i].identificacion,
          "paciente": this.arrayValues[i].paciente,
          "fecha_ingreso": this.arrayValues[i].fecha_ingreso,
          "fecha_egreso": this.arrayValues[i].fecha_egreso,
        };
        arrayWithoutId.push(array);
      }
      this.excel.exportToExcel(arrayWithoutId, 'Archive');

    }
  }

  generateExcelFilter() {
    if (this.dataSource.filteredData.length <= 0) {
      Swal.fire('No hay datos en la tabla')
    } else if (this.searchKey === "" || this.searchKey === undefined) {
      Swal.fire('No hay ningún filtro')
    } else {
      let array: any;
      let arrayWithoutId: any[] = [];
      for (let i = 0; i < this.dataSource.filteredData.length; i++) {
        array = {
          "factura": this.dataSource.filteredData[i].factura,
          "ingreso": this.dataSource.filteredData[i].ingreso,
          "entidad": this.dataSource.filteredData[i].entidad,
          "total_factura": this.dataSource.filteredData[i].total_factura,
          "fecha_facturacion": this.dataSource.filteredData[i].fecha_facturacion,
          "identificacion": this.dataSource.filteredData[i].identificacion,
          "paciente": this.dataSource.filteredData[i].paciente,
          "fecha_ingreso": this.dataSource.filteredData[i].fecha_ingreso,
          "fecha_egreso": this.dataSource.filteredData[i].fecha_egreso,
        };
        arrayWithoutId.push(array);
      }
      this.excel.exportToExcel(arrayWithoutId, 'ArchiveFiltered');

    }
  }

  clearTable() {
    Swal.fire({
      title: 'Realmente quiere limpiar la tabla?',
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: `Si`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isDenied) {
        localStorage.removeItem("arrayValues");
        this.arrayValues = [];
        this.dataSource = new MatTableDataSource<any>(this.arrayValues);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.processing = false;
      }
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  generateId() {
    let Initial = this.arrayValues.length;
    while (this.arrayValues.filter((element: { id: number; }) => element.id === Initial).length) {
      Initial++;
      console.log(Initial);
    }
    return Initial;
  }
}