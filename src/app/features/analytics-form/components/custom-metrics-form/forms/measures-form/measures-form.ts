import { AnalyticsMetadataService } from '@/core/services/analytics-metadata/analytics-metadata.service';
import { ReportMemberMetadata } from '@/shared/types/analytics-metadata';
import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelWrapper } from '@/shared/components/float-label-wrapper/float-label-wrapper';
import { SelectWrapper } from '@/shared/components/select-wrapper/select-wrapper';
import { ButtonWrapper } from '@/shared/components/button-wrapper/button-wrapper';

type MeasureForm = FormControl<ReportMemberMetadata | null>;

@Component({
  selector: 'app-measures-form',
  imports: [FloatLabelWrapper, SelectWrapper, ReactiveFormsModule, ButtonWrapper],
  templateUrl: './measures-form.html',
  styleUrl: './measures-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeasuresForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly analyticsMetadataService = inject(AnalyticsMetadataService);

  readonly selectedContext = input.required<string>();
  readonly availableMeasures = signal<ReportMemberMetadata[]>([]);
  readonly formValue = output<(ReportMemberMetadata | null)[]>();

  form = this.formBuilder.array<MeasureForm>([this.createMeasureForm()], {
    validators: [],
  });

  ngOnChanges(): void {
    this.resetFormToInitialState();

    this.setAvailableMeasures();
  }

  onSelectChange() {
    this.emitFormChanges();
  }

  addFormControl() {
    const measureForm = this.createMeasureForm();

    this.form.push(measureForm);

    this.emitFormChanges();
  }

  removeFormControl(index: number) {
    this.form.removeAt(index);

    this.emitFormChanges();
  }

  private emitFormChanges() {
    this.formValue.emit(this.form.value);
  }

  private setAvailableMeasures() {
    const availableMeasures = this.analyticsMetadataService.getMeasures(this.selectedContext());

    if (!availableMeasures) return;

    this.availableMeasures.set(availableMeasures);
  }

  private resetFormToInitialState() {
    this.form = this.formBuilder.array([this.createMeasureForm()]);
    this.emitFormChanges();
  }

  private createMeasureForm() {
    const measureForm = this.formBuilder.control<ReportMemberMetadata | null>(null, {
      validators: [Validators.required],
    });

    return measureForm;
  }
}
