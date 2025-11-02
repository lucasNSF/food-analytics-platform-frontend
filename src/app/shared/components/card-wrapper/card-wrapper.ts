import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-wrapper',
  imports: [CardModule, NgTemplateOutlet],
  templateUrl: './card-wrapper.html',
  styleUrl: './card-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardWrapper {
  readonly class = input('');

  readonly headerTemplate = contentChild('header', { read: TemplateRef });
  readonly subHeaderTemplate = contentChild('subHeader', { read: TemplateRef });
  readonly footerTemplate = contentChild('footer', { read: TemplateRef });
}
