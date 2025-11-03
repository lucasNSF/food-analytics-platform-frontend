import { DashboardGridService } from '@/core/services/dashboard-grid/dashboard-grid.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { PreviewData } from '../analytics-form/components/custom-metrics-form/forms/data-visualization-form/preview-data/preview-data';

@Component({
  selector: 'app-dashboard-grid',
  imports: [GridsterComponent, GridsterItemComponent, PreviewData],
  templateUrl: './dashboard-grid.html',
  styleUrl: './dashboard-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardGrid {
  private readonly dashboardGridService = inject(DashboardGridService);
  readonly gridOptions = this.dashboardGridService.getGridsterOptions();
  readonly items = this.dashboardGridService.getItems();
}
