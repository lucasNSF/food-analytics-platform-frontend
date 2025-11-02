export type AnalyticsMetadata = {
  reportContext: string;
  title: string;
  metrics: ReportMemberMetadata[];
  dimensions: ReportMemberMetadata[];
  defaultDateDimension?: string;
  meta?: Record<string, unknown>;
};

export type ReportMemberMetadata = {
  attribute: string;
  label: string;
  type: MemberType;
  meta?: Record<string, unknown>;
};

export type MemberType = 'string' | 'number' | 'boolean' | 'date';
