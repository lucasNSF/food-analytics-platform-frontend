import { AnalyticsMetadataService } from '@/core/services/analytics-metadata/analytics-metadata.service';
import { ButtonWrapper } from '@/shared/components/button-wrapper/button-wrapper';
import { DatePickerWrapper } from '@/shared/components/date-picker-wrapper/date-picker-wrapper';
import { FloatLabelWrapper } from '@/shared/components/float-label-wrapper/float-label-wrapper';
import { InputNumberWrapper } from '@/shared/components/input-number-wrapper/input-number-wrapper';
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
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type FilterForm = FormGroup<{
  member: FormControl<ReportMemberMetadata | null>;
  operator: FormControl<string>;
  values: FormArray<FormControl<string>>;
}>;

@Component({
  selector: 'app-filters-form',
  imports: [
    FloatLabelWrapper,
    SelectWrapper,
    ReactiveFormsModule,
    FormsModule,
    InputNumberWrapper,
    DatePickerWrapper,
    ButtonWrapper,
  ],
  templateUrl: './filters-form.html',
  styleUrl: './filters-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersForm implements OnChanges {
  private readonly analyticsMetadataService = inject(AnalyticsMetadataService);
  private readonly formBuilder = inject(FormBuilder);

  private mapAvailableValues = new Map<number, WritableSignal<unknown[]>>();

  readonly selectedContext = input.required<string>();
  readonly availableMembers = signal<ReportMemberMetadata[]>([]);
  readonly availableOperators = signal<{ label: string; value: string }[]>([]);
  readonly isLoadingValues = signal(false);
  readonly formValue =
    output<
      { member: ReportMemberMetadata | null; operator: string | null; values: string[] | null }[]
    >();

  readonly dateFilter = signal<Date[]>([]);

  form = this.formBuilder.array<FilterForm>([]);

  ngOnChanges(): void {
    this.resetFormToInitialState();

    this.setAvailableMembers();
  }

  addFormGroup() {
    const fg = this.createFormGroup();

    this.form.push(fg);

    const index = this.form.length - 1;

    this.mapAvailableValues.set(index, signal([]));

    this.emitFormValue();
  }

  removeFormGroup(index: number) {
    this.form.removeAt(index);
    this.emitFormValue();
    this.mapAvailableValues.delete(index);
  }

  getAvailableValues(index: number) {
    return this.mapAvailableValues.get(index)!.asReadonly();
  }

  onMemberChange(memberControl: FormControl<ReportMemberMetadata | null>, index: number) {
    this.setAvailableOperators(memberControl);

    switch (memberControl.value?.type) {
      case 'string':
        this.setAvailableFilterValues(memberControl, index);
        break;
      case 'date':
        this.availableOperators.set([]);
        break;
    }

    this.emitFormValue();
  }

  onOperatorChange(filterForm: FilterForm, event: unknown) {
    filterForm.controls.operator.setValue(String(event));

    this.emitFormValue();
  }

  onFilterValueChange(filterForm: FilterForm, event: unknown) {
    const parsedValue: string[] = [];
    const memberType = filterForm.value.member?.type;

    if (memberType === 'date') {
      const eventValue = event as Date[];

      if (eventValue && eventValue[0]) {
        parsedValue.push(eventValue[0].toISOString());
      }

      if (eventValue && eventValue[1]) {
        parsedValue.push(eventValue[1].toISOString());
      }
    } else if (event) {
      parsedValue.push(String(event));
    }

    const valuesControl = filterForm.controls.values;

    valuesControl.clear();

    parsedValue.forEach((value) => {
      valuesControl.push(this.formBuilder.control(value, { nonNullable: true }));
    });

    this.emitFormValue();
  }

  private emitFormValue() {
    this.formValue.emit(
      this.form.value.map((data) => {
        return {
          member: data.member ?? null,
          operator: data.operator ?? null,
          values: data.values ?? null,
        };
      })
    );
  }

  private resetFormToInitialState() {
    this.form = this.formBuilder.array<FilterForm>([this.createFormGroup()]);
    this.availableOperators.set([]);
    this.mapAvailableValues = new Map();
    this.emitFormValue();
  }

  private setAvailableFilterValues(
    { value }: FormControl<ReportMemberMetadata | null>,
    index: number
  ) {
    this.mapAvailableValues.get(index)?.set([]);

    if (!value) return;

    this.isLoadingValues.set(true);

    this.analyticsMetadataService.getDistinctValuesOf(value.attribute).subscribe({
      next: ({ metadata }) => {
        const availableValues = metadata.map((data) => data[value.attribute]);

        this.mapAvailableValues.get(index)?.set(availableValues);

        this.isLoadingValues.set(false);
      },
      error: () => {
        this.isLoadingValues.set(false);
      },
    });
  }

  private setAvailableOperators({ value }: FormControl<ReportMemberMetadata | null>) {
    if (!value) {
      this.availableOperators.set([]);
      return;
    }

    const operatorsByType = {
      number: [
        { label: 'Igual a', value: 'equals' },
        { label: 'Diferente de', value: 'notEquals' },
        { label: 'Maior ou igual a', value: 'gte' },
        { label: 'Maior que', value: 'gt' },
        { label: 'Menor ou igual a', value: 'lte' },
        { label: 'Menor que', value: 'lt' },
      ],
      string: [
        { label: 'Igual a', value: 'equals' },
        { label: 'Diferente de', value: 'notEquals' },
      ],
      boolean: [
        { label: 'Igual a', value: 'equals' },
        { label: 'Diferente de', value: 'notEquals' },
      ],
    };

    const supportedOperators = Reflect.get(operatorsByType, value.type);

    this.availableOperators.set(supportedOperators);
  }

  private setAvailableMembers() {
    const metadata = this.analyticsMetadataService.getMetadataByContext(this.selectedContext());

    if (!metadata) return;

    const { dimensions, metrics } = metadata;

    this.availableMembers.set(dimensions.concat(metrics));
    this.mapAvailableValues.set(0, signal([]));
  }

  private createFormGroup() {
    const formGroup = this.formBuilder.group({
      member: this.formBuilder.control<ReportMemberMetadata | null>(null, {
        validators: [Validators.required],
      }),
      operator: this.formBuilder.control('', { validators: [Validators.required] }),
      values: this.formBuilder.array<FormControl<string>>([]),
    });

    return formGroup as FilterForm;
  }
}
