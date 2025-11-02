import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  model,
  output,
  TemplateRef,
} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom' | 'full';

@Component({
  selector: 'app-drawer-wrapper',
  imports: [DrawerModule, NgTemplateOutlet],
  templateUrl: './drawer-wrapper.html',
  styleUrl: './drawer-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerWrapper {
  readonly visible = model.required<boolean>();
  readonly position = input<DrawerPosition>('right');
  readonly modal = input(false);

  readonly headlessTemplate = contentChild('headless', { read: TemplateRef });
  readonly headerTemplate = contentChild('header', { read: TemplateRef });
  readonly footerTemplate = contentChild('footer', { read: TemplateRef });

  readonly show = output<void>();
  readonly hide = output<void>();
}
