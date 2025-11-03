import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule, DatePickerTypeView } from 'primeng/datepicker';

import { BaseInput } from '../base-input/base-input';

@Component({
  selector: 'app-date-picker-wrapper',
  imports: [DatePickerModule, FormsModule],
  templateUrl: './date-picker-wrapper.html',
  styleUrl: './date-picker-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerWrapper),
      multi: true,
    },
  ],
})
export class DatePickerWrapper extends BaseInput<Date | Date[] | undefined> {
  override readonly value: WritableSignal<Date | Date[] | undefined> = signal(undefined);

  readonly format = input('');
  readonly showIcon = input(true);
  readonly iconDisplay = input<'input' | 'button'>('input');
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly selectionMode = input<'single' | 'multiple' | 'range'>('single');
  readonly readonlyInput = input(false);
  readonly showButtonBar = input(false);
  readonly hourFormat = input<'24' | '12'>('24');
  readonly timeOnly = input(false);
  readonly view = input<DatePickerTypeView>('date');

  readonly onDateSelect = output<Date | Date[] | undefined>();
}
