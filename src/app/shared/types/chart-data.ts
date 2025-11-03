export type ChartData = {
  series: { name: string; data: (string | number)[] }[] | number[] | string[];
  xaxis?: { categories: string[] };
  labels?: string[];
};
