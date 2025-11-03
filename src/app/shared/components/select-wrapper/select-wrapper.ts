import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { SelectModule } from 'primeng/select';
import { BaseInput } from '../base-input/base-input';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-wrapper',
  imports: [SelectModule, FormsModule],
  templateUrl: './select-wrapper.html',
  styleUrl: './select-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectWrapper),
      multi: true,
    },
  ],
})
export class SelectWrapper extends BaseInput<unknown> {
  override value: WritableSignal<unknown> = signal(null);

  readonly options = input.required<unknown[]>();
  readonly optionLabel = input<string>();
  readonly optionValue = input<string>();
  readonly checkmark = input(false);
  readonly editable = input(false);
  readonly showClear = input(false);
  readonly loading = input(false);

  readonly onSelectChange = output<unknown>();
}
