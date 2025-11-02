import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-float-label-wrapper',
  imports: [FloatLabelModule],
  templateUrl: './float-label-wrapper.html',
  styleUrl: './float-label-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatLabelWrapper {
  readonly variant = input<'in' | 'on' | 'over'>('on');
}
