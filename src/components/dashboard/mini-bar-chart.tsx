import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { WeeklyBar } from "@/data/types";

export function MiniBarChart({
  data,
  highlightIndex,
  valueLabel,
}: {
  data: WeeklyBar[];
  highlightIndex: number;
  valueLabel: string;
}) {
  const config = {
    value: { label: valueLabel, color: "var(--brand-ink)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[150px] w-full">
      <BarChart
        data={data}
        margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
        barCategoryGap={4}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={6}
          fontSize={11}
          className="text-brand-body"
          tickFormatter={(value) => String(value).charAt(0)}
        />
        <ChartTooltip
          cursor={{ fill: "var(--brand-ink)", opacity: 0.06 }}
          content={<ChartTooltipContent hideIndicator />}
        />
        <Bar
          dataKey="value"
          radius={[4, 4, 0, 0]}
          barSize={14}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.label}
              fill={
                index === highlightIndex
                  ? "var(--brand-blue)"
                  : "var(--brand-ink)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
