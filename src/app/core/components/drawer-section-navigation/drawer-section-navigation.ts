import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonGroupWrapper } from '@/shared/components/button-group-wrapper/button-group-wrapper';
import { ButtonModule } from 'primeng/button';
import { DrawerSections } from '@/shared/types/drawer-sections';
import { DrawerSectionService } from '@/core/services/drawer-section/drawer-section.service';

@Component({
  selector: 'app-drawer-section-navigation',
  imports: [ButtonGroupWrapper, ButtonModule],
  templateUrl: './drawer-section-navigation.html',
  styleUrl: './drawer-section-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerSectionNavigation {
  private readonly drawerSectionService = inject(DrawerSectionService);
  readonly currentSection = this.drawerSectionService.getCurrentSection();

  updateDrawerSection(section: DrawerSections) {
    this.drawerSectionService.updateSection(section);
  }
}
