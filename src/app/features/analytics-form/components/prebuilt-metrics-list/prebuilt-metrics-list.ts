import { AnalyticsApi } from '@/core/services/apis/analytics/analytics-api';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ButtonWrapper } from '@/shared/components/button-wrapper/button-wrapper';
import { take } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DashboardGridService } from '@/core/services/dashboard-grid/dashboard-grid.service';
import { AnalyticsVisualizationType } from '@/shared/types/analytics-payload';

@Component({
  selector: 'app-prebuilt-metrics-list',
  imports: [ButtonWrapper, ProgressSpinnerModule],
  templateUrl: './prebuilt-metrics-list.html',
  styleUrl: './prebuilt-metrics-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrebuiltMetricsList implements OnInit {
  private readonly analyticsApi = inject(AnalyticsApi);
  private readonly dashboardGridService = inject(DashboardGridService);
  readonly reports = signal<
    { report: string; label: string; visualizationType: AnalyticsVisualizationType }[]
  >([]);

  ngOnInit(): void {
    this.analyticsApi
      .getPrebuiltReports()
      .pipe(take(1))
      .subscribe({
        next: ({ reports }) => {
          this.reports.set(reports);
        },
      });
  }

  generateMetricAndAddToGrid(reportData: {
    report: string;
    label: string;
    visualizationType: AnalyticsVisualizationType;
  }) {
    this.analyticsApi
      .loadQuery({ reportContext: reportData.report })
      .pipe(take(1))
      .subscribe({
        next: ({ metric }) => {
          this.dashboardGridService.addItem({
            metric,
            title: reportData.label,
            visualizationType: reportData.visualizationType,
          });
        },
      });
  }
}
