import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { FieldsModule } from '../fields/fields.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddColumnsComponent } from './add-columns/add-columns.component';
import { AddAliasComponent } from './add-alias/add-columns.component';
import { AddWidthsComponent } from './add-widths/add-columns.component';

@NgModule({
  declarations: [ConfigComponent, AddColumnsComponent, AddAliasComponent, AddWidthsComponent],
  imports: [CommonModule, FieldsModule, MatIconModule, MatSlideToggleModule, MatButtonModule],
  exports: [ConfigComponent],
})
export class ConfigModule {}
