import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GcmModal } from './modal.component';

@NgModule({
  declarations: [GcmModal],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [GcmModal],
})
export class GcmModalModule {}
