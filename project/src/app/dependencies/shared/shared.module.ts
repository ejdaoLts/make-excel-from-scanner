import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/dependencies/material/material.module';
import { getSpanishPaginatorIntl } from 'src/app/index/translate-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@NgModule({
  declarations: [
    DialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FlexLayoutModule,
    MaterialModule
  ],
  imports: [
    NgbModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]

})
export class SharedModule { }
