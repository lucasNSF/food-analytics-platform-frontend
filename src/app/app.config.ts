import {
  ApplicationConfig,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { PrimeNGConfigFactory } from './core/factories/primeng-config.factory';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AnalyticsMetadataService } from './core/services/analytics-metadata/analytics-metadata.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideAnimationsAsync(),
    PrimeNGConfigFactory(),
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '-0300' } },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideAppInitializer(() => {
      const analyticsMetadataService = inject(AnalyticsMetadataService);

      analyticsMetadataService.loadMetadata();
    }),
  ],
};
