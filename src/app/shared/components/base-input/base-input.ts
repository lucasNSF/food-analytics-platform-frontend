import { ChangeDetectionStrategy, Component, input, signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

type InputVariant = 'outlined' | 'filled';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseInput<T> implements ControlValueAccessor {
  protected readonly disabled = signal(false);
  protected onChange?: (value: T) => void;
  protected onTouched?: () => void;

  readonly variant = input<InputVariant>('outlined');
  readonly invalid = input(false);
  readonly placeholder = input('');
  readonly class = input<string>();
  readonly inputId = input<string>();

  abstract value: WritableSignal<T>;

  writeValue(value: T): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  setValue(value: T) {
    this.value.set(value);
    this.onChange?.(value);
    this.onTouched?.();
  }
}
