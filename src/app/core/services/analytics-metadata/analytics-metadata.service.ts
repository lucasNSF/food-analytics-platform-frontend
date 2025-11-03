import { inject, Injectable } from '@angular/core';
import { AnalyticsApi } from '../apis/analytics/analytics-api';
import { AnalyticsMetadata } from '@/shared/types/analytics-metadata';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsMetadataService {
  private readonly analyticsApi = inject(AnalyticsApi);
  private readonly metadataMap = new Map<string, AnalyticsMetadata>();

  loadMetadata() {
    this.analyticsApi
      .getAnalyticsMetadata()
      .pipe(take(1))
      .subscribe({
        next: ({ metadata }) => {
          metadata.forEach((data) => {
            this.metadataMap.set(data.title, data);
          });
        },
      });
  }

  getDistinctValuesOf(field: string) {
    return this.analyticsApi.getDistinctValuesOf(field);
  }

  getDimensions(contextTitle: string) {
    return this.metadataMap.get(contextTitle)?.dimensions;
  }

  getMetadataByContext(contextTitle: string) {
    return this.metadataMap.get(contextTitle);
  }

  getMeasures(contextTitle: string) {
    return this.metadataMap.get(contextTitle)?.metrics;
  }

  getAvailableContexts() {
    return Array.from(this.metadataMap.keys());
  }
}
