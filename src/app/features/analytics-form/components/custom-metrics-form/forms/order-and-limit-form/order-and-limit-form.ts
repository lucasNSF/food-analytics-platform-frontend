import { AnalyticsMetadataService } from '@/core/services/analytics-metadata/analytics-metadata.service';
import { ReportMemberMetadata } from '@/shared/types/analytics-metadata';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelWrapper } from '@/shared/components/float-label-wrapper/float-label-wrapper';
import { InputNumberWrapper } from '@/shared/components/input-number-wrapper/input-number-wrapper';
import { ButtonWrapper } from '@/shared/components/button-wrapper/button-wrapper';
import { SelectWrapper } from '@/shared/components/select-wrapper/select-wrapper';

type OrderByForm = FormGroup<{
  attribute: FormControl<string | null>;
  order: FormControl<'asc' | 'desc'>;
}>;

@Component({
  selector: 'app-order-and-limit-form',
  imports: [
    FloatLabelWrapper,
    ReactiveFormsModule,
    InputNumberWrapper,
    ButtonWrapper,
    SelectWrapper,
  ],
  templateUrl: './order-and-limit-form.html',
  styleUrl: './order-and-limit-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderAndLimitForm implements OnChanges, OnInit {
  private readonly analyticsMetadataService = inject(AnalyticsMetadataService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly selectedContext = input.required<string>();
  readonly availableFields = signal<ReportMemberMetadata[]>([]);
  readonly orientationOptions = signal([
    { label: 'Crescente', value: 'asc' },
    { label: 'Decrescente', value: 'desc' },
  ]);
  readonly formValue = output<{ limit: number; orderBy: Record<string, 'asc' | 'desc'> }>();

  readonly form = this.formBuilder.group({
    limit: this.formBuilder.control(50, { nonNullable: true, validators: [Validators.required] }),
    orderBy: this.formBuilder.array<OrderByForm>([]),
  });

  ngOnChanges(): void {
    this.setAvailableFields();
  }

  ngOnInit(): void {
    const sub = this.form.valueChanges.subscribe((value) => {
      const orderBy: Record<string, 'asc' | 'desc'> = {};

      value.orderBy?.forEach((data) => {
        if (data.attribute && data.order) {
          orderBy[data.attribute] = data.order;
        }
      });

      this.formValue.emit({ limit: value.limit ?? 50, orderBy });
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  addOrderInput() {
    const fg = this.formBuilder.group<{
      attribute: FormControl<string | null>;
      order: FormControl<'asc' | 'desc'>;
    }>({
      attribute: this.formBuilder.control(null),
      order: this.formBuilder.control('desc', { nonNullable: true }),
    });

    this.form.controls.orderBy.push(fg);
  }

  removeOrderInput(index: number) {
    this.form.controls.orderBy.removeAt(index);
  }

  private setAvailableFields() {
    const metadata = this.analyticsMetadataService.getMetadataByContext(this.selectedContext());

    if (!metadata) return;

    const { dimensions, metrics } = metadata;

    this.availableFields.set(dimensions.concat(metrics));
  }
}
