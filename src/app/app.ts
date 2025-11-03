import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './core/components/header/header';
import { Drawer } from './core/components/drawer/drawer';
import { DashboardGrid } from './features/dashboard-grid/dashboard-grid';

@Component({
  selector: 'app-root',
  imports: [Header, Drawer, DashboardGrid],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
