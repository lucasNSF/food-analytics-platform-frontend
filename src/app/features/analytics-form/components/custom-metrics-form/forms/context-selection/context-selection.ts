import { AnalyticsMetadataService } from '@/core/services/analytics-metadata/analytics-metadata.service';
import { FloatLabelWrapper } from '@/shared/components/float-label-wrapper/float-label-wrapper';
import { SelectWrapper } from '@/shared/components/select-wrapper/select-wrapper';
import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-context-selection',
  imports: [FloatLabelWrapper, SelectWrapper, FormsModule],
  templateUrl: './context-selection.html',
  styleUrl: './context-selection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextSelection implements OnInit {
  private readonly analyticsMetadataService = inject(AnalyticsMetadataService);

  readonly contextOptions = signal<string[]>([]);
  readonly selectedContext = model('');

  ngOnInit(): void {
    const availableContexts = this.analyticsMetadataService.getAvailableContexts();
    this.contextOptions.set(availableContexts);
  }
}
