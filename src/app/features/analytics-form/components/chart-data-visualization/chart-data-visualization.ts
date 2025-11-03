import { ChartData } from '@/shared/types/chart-data';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

import { ApexChart } from 'ng-apexcharts';

@Component({
  selector: 'app-chart-data-visualization',
  imports: [NgApexchartsModule],
  templateUrl: './chart-data-visualization.html',
  styleUrl: './chart-data-visualization.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartDataVisualization {
  readonly data = input.required<ChartData>();
  readonly visualizationType = input.required<'bar' | 'line' | 'pie' | 'area'>();

  readonly chartOptions = computed<ApexOptions | null>(() => {
    const chartData = this.data();

    const baseChart: ApexChart = {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
      },
    };

    let options: ApexOptions = {
      series: chartData.series as ApexAxisChartSeries,
      chart: baseChart,
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    };

    if (chartData.xaxis) {
      options.chart!.type = this.visualizationType();
      options.xaxis = {
        categories: chartData.xaxis.categories,
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      };
      options.tooltip = {
        x: {
          format: 'dd MMM',
        },
      };
      options.series = chartData.series as ApexAxisChartSeries;
    } else if (chartData.labels) {
      options.chart!.type = this.visualizationType();
      options.labels = chartData.labels;
      options.series = chartData.series as ApexNonAxisChartSeries;

      options.plotOptions = {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
              },
            },
          },
        },
      };
      options.legend = {
        position: 'bottom',
      };
    } else {
      return null;
    }

    return options;
  });
}
