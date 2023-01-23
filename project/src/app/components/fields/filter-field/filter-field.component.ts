import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  Optional,
  Input,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DEFAULT_APPEARANCE_FORM } from '../fields.common';

@Component({
  selector: 'gcm-filter-field',
  templateUrl: './filter-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GcmFilterField implements OnDestroy, ControlValueAccessor {
  private _unsubscribe$ = new Subject<void>();

  @Input() class = '';

  @Input() style = '';

  @Input() appearance: 'outline' | 'fill' | 'standard' | 'legacy' = DEFAULT_APPEARANCE_FORM;

  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  public onChangeFn = (_: any) => {};

  public onTouchFn = (_: any) => {};

  @Input() disabled: boolean = false;

  public value: string = '';

  constructor(
    @Self() @Optional() private _control: NgControl,
    @Optional() private _formGroupDirective: FormGroupDirective
  ) {
    if (_control) {
      this._control.valueAccessor = this;
    }
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  public onChange(event: any): void {
    this.value = event.target.value;
    this.onChangeFn(event.target.value);
    if (this.control.touched) {
    }
  }

  /*public setDisabledState(): void {
    this.disabled = true;
  }*/

  public onFocusout(): void {
    this.onTouchFn(true);
  }

  public onClearControl(): void {
    this.control.setValue('');
    this.value = '';
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get control(): FormControl {
    return this._control?.control as FormControl;
  }

  get directive(): FormGroupDirective {
    return this._formGroupDirective as FormGroupDirective;
  }
}
