import { AnalyticsMetric } from '@/shared/types/analytics-metric';
import { AnalyticsVisualizationType } from '@/shared/types/analytics-payload';
import { Injectable, Signal, signal } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType,
} from 'angular-gridster2';

export type DashboardItem = GridsterItem & {
  data: { metric: AnalyticsMetric; title: string; visualizationType: AnalyticsVisualizationType };
};

@Injectable({
  providedIn: 'root',
})
export class DashboardGridService {
  private readonly gridsterOptions = signal<GridsterConfig>({
    gridType: GridType.ScrollVertical,
    compactType: CompactType.None,
    margin: 10,
    outerMargin: true,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    mobileBreakpoint: 200,
    minCols: 6,
    // maxCols: 12,
    minRows: 4,
    // maxRows: 4,
    maxItemCols: 12,
    minItemCols: 2,
    // maxItemRows: 4,
    minItemRows: 2,
    // maxItemArea: 50,
    minItemArea: 2,
    defaultItemCols: 3,
    defaultItemRows: 2,
    fixedColWidth: 105,
    fixedRowHeight: 105,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    ignoreMarginInRow: false,
    draggable: {
      enabled: false,
    },
    resizable: {
      enabled: false,
    },
    swap: true,
    swapWhileDragging: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: { north: true, east: true, south: true, west: true },
    pushResizeItems: true,
    displayGrid: DisplayGrid.None,
    disableWindowResize: true,
    disableWarnings: true,
    scrollToNewItems: true,
  });
  private items = signal<DashboardItem[]>([]);

  getGridsterOptions(): Signal<GridsterConfig> {
    return this.gridsterOptions.asReadonly();
  }

  editGridsterConfig(config: GridsterConfig) {
    this.gridsterOptions.set({ ...this.gridsterOptions(), ...config });
  }

  addItem(props: {
    metric: AnalyticsMetric;
    title: string;
    visualizationType: AnalyticsVisualizationType;
  }) {
    const dashboardItem: DashboardItem = {
      cols: 4,
      rows: 3,
      x: 0,
      y: 0,
      data: props,
    };

    this.items.update((value) => [...value, dashboardItem]);
  }

  getItems(): Signal<DashboardItem[]> {
    return this.items.asReadonly();
  }
}
