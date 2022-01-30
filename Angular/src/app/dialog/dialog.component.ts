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
      {title:"diez", value: this.data.value.diez},
      {title:"once", value: this.data.value.once},
      {title:"catorce", value: this.data.value.catorce},
      {title:"cuatro", value: this.data.value.cuatro},
      {title:"cinco", value: this.data.value.cinco},
      {title:"seis", value: this.data.value.seis},
      {title:"siete", value: this.data.value.siete},
      {title:"ocho", value: this.data.value.ocho},
      {title:"nueve", value: this.data.value.nueve},
    ]

    console.log(this.data.value)
    this.dataSource = new MatTableDataSource<any>(array);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}