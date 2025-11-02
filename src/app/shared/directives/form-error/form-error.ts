import { BaseFormErrorMessage } from '@/shared/components/base-form-error-message/base-form-error-message';
import {
  ComponentRef,
  Directive,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appFormError]',
})
export class FormError implements OnChanges, OnInit, OnDestroy {
  readonly #vcRef = inject(ViewContainerRef);
  #componentRef?: ComponentRef<BaseFormErrorMessage>;

  readonly formErrors = input.required<Record<string, boolean> | null>({ alias: 'appFormError' });
  readonly errorMessages = input<Record<string, string>>();
  readonly showError = input(true);

  ngOnChanges(): void {
    this.setComponentInputs();
    this.#componentRef?.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.#componentRef = this.#vcRef.createComponent(BaseFormErrorMessage);
    this.setComponentInputs();
  }

  ngOnDestroy(): void {
    this.#vcRef.clear();
  }

  private setComponentInputs() {
    this.#componentRef?.setInput('formErrors', this.formErrors());
    this.#componentRef?.setInput('errorMessages', this.errorMessages());
    this.#componentRef?.setInput('showError', this.showError());
  }
}
