import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { AnalyticsMetadata } from '../../../../shared/types/analytics-metadata';
import { of, switchMap } from 'rxjs';
import { AnalyticsPayload, AnalyticsVisualizationType } from '@/shared/types/analytics-payload';
import { AnalyticsMetric } from '@/shared/types/analytics-metric';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsApi {
  private readonly http = inject(HttpClient);

  loadQuery(payload: AnalyticsPayload) {
    return this.http.post<{ metric: AnalyticsMetric }>(`${environment.API_URL}/analytics`, payload);
  }

  getPrebuiltReports() {
    return this.http.get<{
      reports: { report: string; label: string; visualizationType: AnalyticsVisualizationType }[];
    }>(`${environment.API_URL}/analytics/prebuilt-reports`);
  }

  getAnalyticsMetadata() {
    return this.http.get<{ metadata: AnalyticsMetadata[] }>(
      `${environment.API_URL}/analytics/meta`
    );
  }

  getDistinctValuesOf(field: string) {
    return this.http
      .get<{ metadata: Record<string, string>[] }>(
        `${environment.API_URL}/analytics/meta/distinct-values?attribute=${field}`
      )
      .pipe(
        switchMap(({ metadata }) => {
          const truthyMetadata = metadata.filter((metadata) => !!metadata[field]);
          return of({ metadata: truthyMetadata });
        })
      );
  }
}
