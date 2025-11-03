import { CustomMetricsForm } from '@/features/analytics-form/components/custom-metrics-form/custom-metrics-form';
import { PrebuiltMetricsList } from '@/features/analytics-form/components/prebuilt-metrics-list/prebuilt-metrics-list';
import { DrawerSections } from '@/shared/types/drawer-sections';
import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerSectionService {
  private readonly currentSection = signal<DrawerSections>('default');

  readonly currentComponentSection = computed(() => {
    const section = this.currentSection();

    if (section === 'default') return PrebuiltMetricsList;
    if (section === 'custom') return CustomMetricsForm;

    return null;
  });

  getCurrentSection(): Signal<DrawerSections> {
    return this.currentSection.asReadonly();
  }

  updateSection(section: DrawerSections) {
    this.currentSection.set(section);
  }
}
