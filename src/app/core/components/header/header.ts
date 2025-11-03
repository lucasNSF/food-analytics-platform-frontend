import { DashboardGridService } from '@/core/services/dashboard-grid/dashboard-grid.service';
import { DrawerService } from '@/core/services/drawer/drawer.service';
import { ButtonWrapper } from '@/shared/components/button-wrapper/button-wrapper';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisplayGrid } from 'angular-gridster2';
import { ToggleButton } from 'primeng/togglebutton';

@Component({
  selector: 'app-header',
  imports: [ButtonWrapper, ToggleButton, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly drawerService = inject(DrawerService);
  private readonly dashboardGridService = inject(DashboardGridService);

  readonly editModeOn = signal(false);

  updateDashboardGrid() {
    this.dashboardGridService.editGridsterConfig({
      draggable: { enabled: this.editModeOn() },
      resizable: { enabled: this.editModeOn() },
      displayGrid: this.editModeOn() ? DisplayGrid.Always : DisplayGrid.None,
    });
  }

  openDrawer() {
    this.drawerService.setDrawerState(true);
  }
}
