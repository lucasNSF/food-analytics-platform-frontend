import { ToastModule, ToastPositionType } from 'primeng/toast';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-toast-wrapper',
  imports: [ToastModule],
  templateUrl: './toast-wrapper.html',
  styleUrl: './toast-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastWrapper {
  readonly position = input<ToastPositionType>('top-right');
}
