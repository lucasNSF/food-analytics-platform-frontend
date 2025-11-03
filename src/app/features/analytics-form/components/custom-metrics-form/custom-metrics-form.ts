import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DimensionsForm } from './forms/dimensions-form/dimensions-form';
import { ContextSelection } from './forms/context-selection/context-selection';
import { ReportMemberMetadata } from '@/shared/types/analytics-metadata';
import { MeasuresForm } from './forms/measures-form/measures-form';
import { FiltersForm } from './forms/filters-form/filters-form';
import { OrderAndLimitForm } from './forms/order-and-limit-form/order-and-limit-form';
import { AnalyticsPayload } from '@/shared/types/analytics-payload';
import { DataVisualizationForm } from './forms/data-visualization-form/data-visualization-form';
import { DrawerService } from '@/core/services/drawer/drawer.service';

@Component({
  selector: 'app-custom-metrics-form',
  imports: [
    AccordionModule,
    DimensionsForm,
    ContextSelection,
    MeasuresForm,
    FiltersForm,
    OrderAndLimitForm,
    DataVisualizationForm,
  ],
  templateUrl: './custom-metrics-form.html',
  styleUrl: './custom-metrics-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMetricsForm {
  private readonly drawerService = inject(DrawerService);

  readonly selectedContext = signal('');
  readonly analyticsPayload = signal<AnalyticsPayload>({ limit: 50 });
  readonly activeTab = signal(0);

  constructor() {
    effect(() => {
      const drawerIsOpen = this.drawerService.drawerIsOpen();

      if (!drawerIsOpen) {
        this.analyticsPayload.set({ limit: 50 });
        this.selectedContext.set('');
        this.activeTab.set(0);
      }
    });
  }

  handleSelectedContext(context: string) {
    this.selectedContext.set(context);
  }

  handleDimensionFormValue(dimensions: (ReportMemberMetadata | null)[]) {
    const dimensionPayload: AnalyticsPayload['dimensions'] = [];

    dimensions.forEach((dimension) => {
      if (dimension) {
        dimensionPayload.push({
          attribute: dimension.attribute,
          label: dimension.label,
          type: dimension.type,
          meta: dimension.meta,
        });
      }
    });

    this.analyticsPayload.update((value) => ({ ...value, dimensions: dimensionPayload }));
  }

  handleMeasureFormValue(measures: (ReportMemberMetadata | null)[]) {
    const measuresPayload: AnalyticsPayload['metrics'] = [];

    measures.forEach((measure) => {
      if (measure) {
        measuresPayload.push({
          attribute: measure.attribute,
          label: measure.label,
          type: measure.type,
          meta: measure.meta,
        });
      }
    });

    this.analyticsPayload.update((value) => ({ ...value, metrics: measuresPayload }));
  }

  handleFiltersFormValue(
    filters: {
      member: ReportMemberMetadata | null;
      operator: string | null;
      values: string[] | null;
    }[]
  ) {
    const filtersPayload: AnalyticsPayload['filters'] = [];
    let dateFilterPayload: AnalyticsPayload['dateFilter'] | undefined = undefined;

    filters.forEach((filter) => {
      if (filter.member) {
        if (filter.member.type === 'date' && filter.values) {
          dateFilterPayload = {
            dimension: filter.member.attribute,
            filter: { gte: new Date(filter.values[0]), lte: new Date(filter.values[1]) },
          };
        } else if (filter.operator && filter.values) {
          filtersPayload.push({
            member: filter.member.attribute,
            operator: filter.operator,
            values: filter.values,
          });
        }
      }
    });

    this.analyticsPayload.update((value) => ({
      ...value,
      filters: filtersPayload,
      dateFilter: dateFilterPayload,
    }));
  }

  handleOrderAndLimitValue(value: { limit: number; orderBy: Record<string, 'asc' | 'desc'> }) {
    this.analyticsPayload.update((oldValue) => ({
      ...oldValue,
      limit: value.limit,
      orderBy: value.orderBy,
    }));
  }
}
