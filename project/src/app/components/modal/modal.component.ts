import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'gcm-modal',
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GcmModal implements OnInit {
  private _isAlert = false;

  private _confirmButton: string = '';
  private _deniedButton: string = '';
  private _okButton: string = '';

  constructor(
    private _dialogRef: MatDialogRef<GcmModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      tp: 'confirm' | 'alert';
      confirmButton: string;
      deniedButton: string;
      okButton: string;
      hasTopCloseButton: boolean;
    }
  ) {}

  public ngOnInit(): void {
    if (this.data.tp === 'alert') this._isAlert = true;
    else this._isAlert = false;

    if (this.data.confirmButton) this._confirmButton = this.data.confirmButton;
    else this._confirmButton = 'SI';

    if (this.data.deniedButton) this._deniedButton = this.data.deniedButton;
    else this._deniedButton = 'NO';

    if (this.data.okButton) this._okButton = this.data.okButton;
    else this._okButton = 'OK';
  }

  public onConfirm(): void {
    this._dialogRef.close(true);
  }

  public onClose(): void {
    this._dialogRef.close(false);
  }

  get isAlert(): boolean {
    return this._isAlert;
  }

  get confirmButton(): string {
    return this._confirmButton;
  }

  get deniedButton(): string {
    return this._deniedButton;
  }

  get okButton(): string {
    return this._okButton;
  }
}
