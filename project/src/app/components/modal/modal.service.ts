import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GcmModal } from './modal.component';

@Injectable({ providedIn: 'root' })
export class GcmModalService {
  constructor(private dialog: MatDialog) {}

  public confirm(
    content: string,
    title: string = '',
    options: {
      confirmButton?: string;
      deniedButton?: string;
      okButton?: string;
      hasTopCloseButton?: boolean;
    } = { hasTopCloseButton: true }
  ) {
    const dialog = this.dialog.open(GcmModal, {
      width: '250px',
      data: {
        title: title,
        content: content,
        tp: 'confirm',
        confirmButton: options.confirmButton,
        deniedButton: options.deniedButton,
        okButton: options.okButton,
        hasTopCloseButton: options.hasTopCloseButton,
      },
    });
    return dialog.afterClosed();
  }

  public alert(
    content: string,
    title: string = '',
    options: {
      confirmButton?: string;
      deniedButton?: string;
      okButton?: string;
      hasTopCloseButton?: boolean;
    } = { hasTopCloseButton: true }
  ): Observable<boolean> {
    const dialog = this.dialog.open(GcmModal, {
      width: '250px',
      data: {
        title: title,
        content: content,
        tp: 'alert',
        confirmButton: options.confirmButton,
        deniedButton: options.deniedButton,
        okButton: options.okButton,
        hasTopCloseButton: options.hasTopCloseButton,
      },
    });
    return dialog.afterClosed();
  }
}
