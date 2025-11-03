import { ChartData } from './chart-data';
import { KpiData } from './kpi-data';
import { TableData } from './table-data';

export type AnalyticsMetric = TableData | ChartData | KpiData;
