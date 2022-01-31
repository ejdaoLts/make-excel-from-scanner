import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  displayedColumns: string[] = ['title', 'value'];
 

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  dataSource: any = new MatTableDataSource<any>([]);
  
  ngOnInit(): void {
    let array = [
      {title:"factura", value: this.data.value.factura},
      {title:"ingreso", value: this.data.value.ingreso},
      {title:"entidad", value: this.data.value.entidad},
      {title:"total_factura", value: this.data.value.total_factura},
      {title:"fecha_facturacion", value: this.data.value.fecha_facturacion},
      {title:"identificacion", value: this.data.value.identificacion},
      {title:"paciente", value: this.data.value.paciente},
      {title:"fecha_ingreso", value: this.data.value.fecha_ingreso},
      {title:"fecha_egreso", value: this.data.value.fecha_egreso},
    ]

    console.log(this.data.value)
    this.dataSource = new MatTableDataSource<any>(array);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}