import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface GcmToastPayload {
  hasDissmissButton?: boolean;
  dissmissButtonMessage?: string;
  horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
  type?: 'notification' | 'danger' | 'success';
  verticalPosition?: 'top' | 'bottom';
}

@Injectable({ providedIn: 'root' })
export class GcmToastService {
  constructor(private _snackBar: MatSnackBar) {}

  public simpleNotification(message: string, duration = 5000, payload: GcmToastPayload = {}): void {
    this._generateMatToast(message, duration, this._managePayload(payload));
  }

  private _generateMatToast(message: string, duration: number, payload: GcmToastPayload) {
    this._snackBar.open(
      message,
      `${payload.hasDissmissButton ? payload.dissmissButtonMessage : ''}`,
      {
        duration: duration,
        panelClass: `mat-snackbar-${payload.type}`,
      }
    );
  }

  private _managePayload(payload: GcmToastPayload): GcmToastPayload {
    return {
      hasDissmissButton: payload.hasDissmissButton || true,
      dissmissButtonMessage: payload.dissmissButtonMessage || 'Cerrar',
      horizontalPosition: payload.horizontalPosition || 'center',
      verticalPosition: payload.verticalPosition || 'bottom',
      type: payload.type || 'notification',
    };
  }
}
