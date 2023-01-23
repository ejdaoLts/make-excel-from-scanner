import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { STORAGE_KEYS } from 'src/app/app.constants';
import { GcmToastService } from '../../toast';

@Component({
  selector: 'app-add-columns',
  templateUrl: './add-columns.component.html',
  styleUrls: ['./add-columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddColumnsComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  public newColumn = new FormControl(null);

  private _arrayWithColumns: string[] = localStorage.getItem(STORAGE_KEYS.columns)
    ? JSON.parse(localStorage.getItem(STORAGE_KEYS.columns)!)
    : [];

  public hasSuffixButton = false;

  constructor(private _toast: GcmToastService) {
    this.newColumn.valueChanges
      .pipe(takeUntil(this._unsubscribe$), distinctUntilChanged(), debounceTime(1000))
      .subscribe(column => {
        if (!this.hasSuffixButton) {
          if (column) {
            if (this._arrayWithColumns.indexOf(column) < 0) {
              this._arrayWithColumns.push(column);
              this.newColumn.setValue(null, { emitEvent: false });
            }
          }
        }
      });
  }

  public onDelete(index: number): void {
    this._arrayWithColumns = this._arrayWithColumns.filter((_, i) => i !== index);
  }

  public clickOnaddColumn(column: string): void {
    if (this.hasSuffixButton) {
      if (this._arrayWithColumns.indexOf(column) < 0) {
        this._arrayWithColumns.push(column);
        this.newColumn.setValue(null);
      }
    }
  }

  public onRegisterColumns(): void {
    localStorage.setItem(STORAGE_KEYS.columns, JSON.stringify(this._arrayWithColumns));

    this._toast.simpleNotification('Información almacenada correctamente');
  }

  get arrayWithColumns(): string[] {
    return this._arrayWithColumns;
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
