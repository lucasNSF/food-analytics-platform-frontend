import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';

type ButtonVariant = 'text' | 'outlined';

type IconPosition = 'top' | 'left' | 'bottom' | 'right';

@Component({
  selector: 'app-button-wrapper',
  imports: [ButtonModule],
  templateUrl: './button-wrapper.html',
  styleUrl: './button-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonWrapper {
  readonly label = input('');
  readonly icon = input<string>('');
  readonly iconPos = input<IconPosition>('left');
  readonly loading = input(false);
  readonly loadingIcon = input('');
  readonly severity = input<ButtonSeverity>('primary');
  readonly disabled = input(false);
  readonly raised = input(false);
  readonly rounded = input(false);
  readonly outlined = input(false);
  readonly variant = input<ButtonVariant>();
  readonly badge = input('');
  readonly badgeSeverity = input<ButtonSeverity>();
  readonly class = input('');
  readonly link = input(false);
  readonly plain = input(false);

  readonly onClick = output<MouseEvent>();
  readonly onFocus = output<FocusEvent>();
  readonly onBlur = output<FocusEvent>();
}
