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


  displayedColumns: string[] = ['id', 'diez', 'once', 'catorce', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'acciones'];
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
            "diez": arrayFromValue[0],
            "once": arrayFromValue[1],
            "catorce": arrayFromValue[2],
            "cuatro": arrayFromValue[3],
            "cinco": arrayFromValue[4],
            "seis": arrayFromValue[5],
            "siete": arrayFromValue[6],
            "ocho": arrayFromValue[7],
            "nueve": arrayFromValue[8],
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
          "diez": this.arrayValues[i].diez,
          "once": this.arrayValues[i].once,
          "catorce": this.arrayValues[i].catorce,
          "cuatro": this.arrayValues[i].cuatro,
          "cinco": this.arrayValues[i].cinco,
          "seis": this.arrayValues[i].seis,
          "siete": this.arrayValues[i].siete,
          "ocho": this.arrayValues[i].ocho,
          "nueve": this.arrayValues[i].nueve,
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
          "diez": this.dataSource.filteredData[i].diez,
          "once": this.dataSource.filteredData[i].once,
          "catorce": this.dataSource.filteredData[i].catorce,
          "cuatro": this.dataSource.filteredData[i].cuatro,
          "cinco": this.dataSource.filteredData[i].cinco,
          "seis": this.dataSource.filteredData[i].seis,
          "siete": this.dataSource.filteredData[i].siete,
          "ocho": this.dataSource.filteredData[i].ocho,
          "nueve": this.dataSource.filteredData[i].nueve,
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