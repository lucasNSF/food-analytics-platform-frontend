import { DrawerService } from '@/core/services/drawer/drawer.service';
import { DrawerWrapper } from '@/shared/components/drawer-wrapper/drawer-wrapper';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DrawerSectionNavigation } from '../drawer-section-navigation/drawer-section-navigation';
import { NgComponentOutlet } from '@angular/common';
import { DrawerSectionService } from '@/core/services/drawer-section/drawer-section.service';

@Component({
  selector: 'app-drawer',
  imports: [DrawerWrapper, DrawerSectionNavigation, NgComponentOutlet],
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer {
  private readonly drawerService = inject(DrawerService);
  private readonly drawerSectionService = inject(DrawerSectionService);

  readonly isVisible = this.drawerService.drawerIsOpen;
  readonly currentSection = this.drawerSectionService.currentComponentSection;

  onDrawerStateChange(isOpen: boolean) {
    this.drawerService.setDrawerState(isOpen);
  }
}
