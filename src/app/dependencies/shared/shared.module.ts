import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { MaterialModule } from 'src/app/dependencies/material/material.module';
import { getSpanishPaginatorIntl } from 'src/app/index/translate-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CKEditorModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MaterialModule
  ],
  imports: [
    NgbModule,
    CKEditorModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]

})
export class SharedModule { }