import { Cell, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrafficSources } from "@/data/queries";
import type { TrafficKey } from "@/data/types";

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--brand-green)" },
  tablet: { label: "Tablet", color: "var(--brand-blue)" },
  mobile: { label: "Mobile", color: "var(--brand-ink)" },
} satisfies ChartConfig;

const sliceColor: Record<TrafficKey, string> = {
  desktop: "var(--brand-green)",
  tablet: "var(--brand-blue)",
  mobile: "var(--brand-ink)",
};

export function TrafficSourcesChart() {
  const { data: points, isPending } = useTrafficSources();

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-brand-title">
            Traffic Sources
          </h2>
          <p className="text-sm text-brand-body">Device breakdown</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-4 text-xs text-brand-body">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-brand-green" />
            Desktop
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-brand-blue" />
            Tablet
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-brand-ink" />
            Mobile
          </span>
        </div>
      </div>

      {isPending || !points ? (
        <div className="flex h-[280px] items-center justify-center">
          <Skeleton className="size-[210px] rounded-full" />
        </div>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="key" hideLabel />}
            />
            <Pie
              data={points}
              dataKey="value"
              nameKey="key"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
              strokeWidth={0}
              isAnimationActive={false}
            >
              {points.map((point) => (
                <Cell key={point.key} fill={sliceColor[point.key]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
    </div>
  );
}
