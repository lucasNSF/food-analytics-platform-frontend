import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

type DisplayErrorFallback = Record<string, string>;

@Component({
  selector: 'app-display-error',
  imports: [KeyValuePipe, NgTemplateOutlet],
  templateUrl: './display-error.html',
  styleUrl: './display-error.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayError {
  readonly form = input.required<AbstractControl>();
  readonly fallbackConfig = input<DisplayErrorFallback>();
  readonly errorTemplates = input<Record<string, TemplateRef<unknown>>>();
  readonly DEFAULT_FALLBACK_CONFIG: Record<string, (control: AbstractControl) => string> = {
    required: () => 'Campo obrigatório',
    minlength: (control) => `Mínimo de ${control.errors?.['minlength'].requiredLength} caracteres`,
    maxlength: (control) => `Máximo de ${control.errors?.['maxlength'].requiredLength} caracteres`,
  };
}
