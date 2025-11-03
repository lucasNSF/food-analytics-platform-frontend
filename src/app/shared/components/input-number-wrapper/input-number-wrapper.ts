import { Component, forwardRef, input, output, signal, WritableSignal } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

type InputMode = 'decimal' | 'minmaxfraction' | 'minmax' | 'currency';

@Component({
  selector: 'app-input-number-wrapper',
  imports: [InputNumberModule, FormsModule],
  templateUrl: './input-number-wrapper.html',
  styleUrl: './input-number-wrapper.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberWrapper),
      multi: true,
    },
  ],
})
export class InputNumberWrapper extends BaseInput<number> {
  override value: WritableSignal<number> = signal(0);

  readonly mode = input<InputMode>();
  readonly currency = input<string>();
  readonly useGrouping = input(false);
  readonly min = input<number>();
  readonly max = input<number>();
  readonly minFractionDigits = input<number>();
  readonly maxFractionDigits = input<number>();

  readonly onInput = output<number | null>();
}
