import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-base-form-error-message',
  templateUrl: './base-form-error-message.html',
  styleUrl: './base-form-error-message.scss',
  imports: [KeyValuePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseFormErrorMessage {
  readonly #DEFAULT_ERROR_MESSAGES: Record<string, string> = {
    required: 'Campo obrigatório.',
    email: 'Email incorreto.',
  } as const;

  readonly formErrors = input.required<Record<string, boolean> | null>();
  readonly errorMessages = input<Record<string, string>>();
  readonly showError = input(true);

  readonly errors = computed(() => {
    return Object.keys(this.formErrors() ?? {}).reduce((acc: Record<string, string>, errorKey) => {
      const errorMessage =
        this.errorMessages()?.[errorKey] ?? this.#DEFAULT_ERROR_MESSAGES[errorKey];

      if (errorMessage) {
        acc[errorKey] = errorMessage;
      }

      return acc;
    }, {});
  });
}
