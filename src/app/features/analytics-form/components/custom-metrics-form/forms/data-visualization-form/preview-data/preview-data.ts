import { ChartDataVisualization } from '@/features/analytics-form/components/chart-data-visualization/chart-data-visualization';
import { KpiDataVisualization } from '@/features/analytics-form/components/kpi-data-visualization/kpi-data-visualization';
import { TableDataVisualization } from '@/features/analytics-form/components/table-data-visualization/table-data-visualization';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-preview-data',
  imports: [TableDataVisualization, ChartDataVisualization, KpiDataVisualization],
  templateUrl: './preview-data.html',
  styleUrl: './preview-data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewData {
  readonly visualizationType = input.required<any>();
  readonly data = input.required<any>();
}
