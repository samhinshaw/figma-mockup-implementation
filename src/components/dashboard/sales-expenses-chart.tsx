import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useSalesExpenses } from "@/data/queries";
import { formatCurrency } from "@/lib/format";

const CHART_CONFIG = {
  sales: { label: "Sales", color: "var(--brand-green)" },
  expenses: { label: "Expenses", color: "var(--brand-ink)" },
} satisfies ChartConfig;

export function SalesExpensesChart() {
  const { data, isPending } = useSalesExpenses();

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 shadow-sm ring-black/5">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-brand-title">
            Sales vs Expenses
          </h2>
          <p className="text-sm text-brand-body">
            Monthly revenue vs expenses
          </p>
        </div>
        <Button variant="outline" size="sm">
          View Report
        </Button>
      </div>

      {isPending || !data ? (
        <>
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-[250px] w-full" />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-brand-title tabular-nums">
              {data.total}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-brand-body">
                <span className="size-2 rounded-full bg-brand-green" />
                Sales
              </div>
              <div className="flex items-center gap-1.5 text-xs text-brand-body">
                <span className="size-2 rounded-full bg-brand-ink" />
                Expenses
              </div>
            </div>
          </div>

          <ChartContainer
            config={CHART_CONFIG}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={data.points} margin={{ left: 8, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.45}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
                <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-expenses)"
                    stopOpacity={0.18}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-expenses)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={48}
                domain={[0, 1000]}
                ticks={[0, 200, 400, 600, 800, 1000]}
                tickFormatter={(v) => formatCurrency(Number(v))}
                fontSize={12}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Area
                dataKey="expenses"
                type="monotone"
                stroke="var(--color-expenses)"
                strokeWidth={2}
                fill="url(#fillExpenses)"
                fillOpacity={1}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
              <Area
                dataKey="sales"
                type="monotone"
                stroke="var(--color-sales)"
                strokeWidth={2}
                fill="url(#fillSales)"
                fillOpacity={1}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </>
      )}
    </div>
  );
}
