import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { FieldsModule } from '../fields/fields.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddColumnsComponent } from './add-columns/add-columns.component';

@NgModule({
  declarations: [ConfigComponent, AddColumnsComponent],
  imports: [CommonModule, FieldsModule, MatIconModule, MatSlideToggleModule, MatButtonModule],
  exports: [ConfigComponent],
})
export class ConfigModule {}
