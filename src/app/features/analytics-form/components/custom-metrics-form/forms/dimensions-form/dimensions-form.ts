import { AnalyticsMetadataService } from '@/core/services/analytics-metadata/analytics-metadata.service';
import { ButtonWrapper } from '@/shared/components/button-wrapper/button-wrapper';
import { FloatLabelWrapper } from '@/shared/components/float-label-wrapper/float-label-wrapper';
import { SelectWrapper } from '@/shared/components/select-wrapper/select-wrapper';
import { ReportMemberMetadata } from '@/shared/types/analytics-metadata';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

type DimensionForm = FormControl<ReportMemberMetadata | null>;

@Component({
  selector: 'app-dimensions-form',
  imports: [ReactiveFormsModule, FloatLabelWrapper, SelectWrapper, ButtonWrapper],
  templateUrl: './dimensions-form.html',
  styleUrl: './dimensions-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimensionsForm implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);
  private readonly analyticsMetadataService = inject(AnalyticsMetadataService);

  readonly selectedContext = input.required<string>();
  readonly availableDimensions = signal<ReportMemberMetadata[]>([]);
  readonly formValue = output<(ReportMemberMetadata | null)[]>();

  form = this.formBuilder.array<DimensionForm>([this.createDimensionForm()], {
    validators: [],
  });

  ngOnChanges(): void {
    this.resetFormToInitialState();

    this.setAvailableDimensions();
  }

  onSelectChange() {
    this.emitFormChanges();
  }

  addFormControl() {
    const dimensionForm = this.createDimensionForm();

    this.form.push(dimensionForm);

    this.emitFormChanges();
  }

  removeFormControl(index: number) {
    this.form.removeAt(index);

    this.emitFormChanges();
  }

  private emitFormChanges() {
    this.formValue.emit(this.form.value);
  }

  private setAvailableDimensions() {
    const availableDimensions = this.analyticsMetadataService.getDimensions(this.selectedContext());

    if (!availableDimensions) return;

    this.availableDimensions.set(availableDimensions);
  }

  private resetFormToInitialState() {
    this.form = this.formBuilder.array([this.createDimensionForm()]);
    this.emitFormChanges();
  }

  private createDimensionForm() {
    const dimensionForm = this.formBuilder.control<ReportMemberMetadata | null>(null, {
      validators: [Validators.required],
    });

    return dimensionForm;
  }
}
