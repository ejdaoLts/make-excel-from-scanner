import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { GcmFilterField } from './filter-field/filter-field.component';
import { GcmTextField } from './text-field/text-field.component';
import { GcmError } from './error/error.component';

import { ErrorEqualsPipe } from './error/error-equals.pipe';
import { ErrorMsgPipe } from './error/error.msg.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';

const components = [GcmTextField, GcmFilterField];
@NgModule({
  declarations: [ErrorEqualsPipe, ErrorMsgPipe, GcmError, ...components],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [ReactiveFormsModule, FormsModule, ...components],
})
export class FieldsModule {}
