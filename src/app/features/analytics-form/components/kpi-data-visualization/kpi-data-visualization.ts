import { KpiData } from '@/shared/types/kpi-data';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-data-visualization',
  imports: [],
  templateUrl: './kpi-data-visualization.html',
  styleUrl: './kpi-data-visualization.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiDataVisualization {
  readonly data = input.required<KpiData>();
}
