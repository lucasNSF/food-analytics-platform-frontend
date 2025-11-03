import { ReportMemberMetadata } from './analytics-metadata';

export type AnalyticsPayload = Partial<{
  reportContext: string;
  visualizationType: AnalyticsVisualizationType;
  metrics: ReportMemberMetadata[];
  dimensions: ReportMemberMetadata[];
  dateFilter: { filter: { gte: Date; lte: Date }; dimension: string };
  filters: { member: string; operator: string; values: string[] }[];
  orderBy: Record<string, 'asc' | 'desc'>;
  limit: number;
}>;

export type AnalyticsVisualizationType = 'pie' | 'bar' | 'line' | 'area' | 'table' | 'kpi';
