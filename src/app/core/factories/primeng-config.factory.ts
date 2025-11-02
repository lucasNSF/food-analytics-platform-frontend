import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { all } from 'primelocale';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';

export function PrimeNGConfigFactory(): EnvironmentProviders {
  return makeEnvironmentProviders([
    providePrimeNG({
      theme: {
        preset: definePreset(Aura),
        options: {
          prefix: 'p',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng, utilities',
          },
          darkModeSelector: '.dark-mode',
        },
      },
      ripple: true,
      translation: all.pt_BR,
    }),
  ]);
}
