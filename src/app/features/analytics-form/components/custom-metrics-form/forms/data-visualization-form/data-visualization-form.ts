import { AnalyticsApi } from '@/core/services/apis/analytics/analytics-api';
import { AnalyticsPayload, AnalyticsVisualizationType } from '@/shared/types/analytics-payload';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  signal,
} from '@angular/core';
import { ButtonWrapper } from '@/shared/components/button-wrapper/button-wrapper';
import { ButtonGroupWrapper } from '@/shared/components/button-group-wrapper/button-group-wrapper';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AnalyticsMetric } from '@/shared/types/analytics-metric';
import { PreviewData } from './preview-data/preview-data';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DashboardGridService } from '@/core/services/dashboard-grid/dashboard-grid.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelWrapper } from '@/shared/components/float-label-wrapper/float-label-wrapper';
import { DrawerService } from '@/core/services/drawer/drawer.service';

@Component({
  selector: 'app-data-visualization-form',
  imports: [
    ButtonWrapper,
    ButtonGroupWrapper,
    ButtonModule,
    FormsModule,
    PreviewData,
    MessageModule,
    ProgressSpinnerModule,
    FloatLabelWrapper,
    InputTextModule,
  ],
  templateUrl: './data-visualization-form.html',
  styleUrl: './data-visualization-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataVisualizationForm implements OnChanges {
  private analyticsApi = inject(AnalyticsApi);
  private readonly dashboardGridService = inject(DashboardGridService);
  private readonly drawerService = inject(DrawerService);

  readonly analyticsPayload = input.required<AnalyticsPayload>();
  readonly visualizationType = signal<AnalyticsVisualizationType>('table');
  readonly isLoading = signal(false);
  readonly loadedData = signal<AnalyticsMetric | null>(null);
  readonly hasError = signal(false);
  readonly metricTitle = signal('');

  ngOnChanges() {
    this.loadedData.set(null);
    this.hasError.set(false);
  }

  updateVisualizationType(type: AnalyticsVisualizationType) {
    this.visualizationType.set(type);
    this.loadedData.set(null);
    this.hasError.set(false);
  }

  loadPreview() {
    const payload = {
      ...this.analyticsPayload(),
      visualizationType: this.visualizationType(),
      reportContext: 'custom',
    };

    this.isLoading.set(true);
    this.loadedData.set(null);

    this.analyticsApi.loadQuery(payload).subscribe({
      next: ({ metric }) => {
        this.loadedData.set(metric);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.loadedData.set(null);
        this.hasError.set(true);
      },
    });
  }

  addMetric() {
    const loadedData = this.loadedData();

    if (!loadedData) return;

    this.dashboardGridService.addItem({
      metric: loadedData,
      title: this.metricTitle(),
      visualizationType: this.visualizationType(),
    });

    this.drawerService.setDrawerState(false);
  }
}
