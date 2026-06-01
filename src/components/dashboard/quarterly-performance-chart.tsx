import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuarterly } from "@/data/queries";
import { formatCurrency } from "@/lib/format";

const config = {
  revenue: { label: "Revenue", color: "var(--brand-green)" },
  profit: { label: "Profit", color: "var(--brand-ink)" },
} satisfies ChartConfig;

export function QuarterlyPerformanceChart() {
  const { data: points, isPending } = useQuarterly();

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-brand-title text-xl font-semibold tracking-tight">
            Quarterly Performance
          </h2>
          <p className="text-brand-body text-sm">Revenue and profit analysis</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-green"
              aria-hidden="true"
            />
            <span className="text-brand-body text-sm">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-ink"
              aria-hidden="true"
            />
            <span className="text-brand-body text-sm">Profit</span>
          </div>
        </div>
      </div>

      {isPending || !points ? (
        <Skeleton className="h-[280px] w-full rounded-xl" />
      ) : (
        <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
          <BarChart data={points} margin={{ left: 8, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="quarter"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={64}
              domain={[0, 300000]}
              ticks={[0, 60000, 120000, 180000, 240000, 300000]}
              tickFormatter={(value) => formatCurrency(Number(value))}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
              barSize={20}
              isAnimationActive={false}
            />
            <Bar
              dataKey="profit"
              fill="var(--color-profit)"
              radius={[4, 4, 0, 0]}
              barSize={20}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
      )}
    </section>
  );
}
