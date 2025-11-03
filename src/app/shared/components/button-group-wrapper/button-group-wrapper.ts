import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
  selector: 'app-button-group-wrapper',
  imports: [ButtonGroupModule],
  templateUrl: './button-group-wrapper.html',
  styleUrl: './button-group-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupWrapper {
  readonly class = input('');
}
