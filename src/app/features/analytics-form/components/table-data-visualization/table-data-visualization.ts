import { TableData } from '@/shared/types/table-data';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table-data-visualization',
  imports: [TableModule],
  templateUrl: './table-data-visualization.html',
  styleUrl: './table-data-visualization.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDataVisualization {
  readonly data = input.required<TableData>();

  readonly cols = computed(() => {
    const headers = this.data().headers[0];

    return headers.map((header, i) => ({
      field: `col${i}`,
      header: header,
    }));
  });

  readonly rows = computed(() => {
    const content = this.data().content;
    const columns = this.cols();

    return content.map((row) => {
      const rowObj: Record<string, string | number> = {};

      columns.forEach((col, i) => {
        rowObj[col.field] = row[i];
      });

      return rowObj;
    });
  });
}
