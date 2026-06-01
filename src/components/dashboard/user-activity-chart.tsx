import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserActivity } from "@/data/queries";

const CHART_CONFIG = {
  users: { label: "Users", color: "var(--brand-green)" },
  sessions: { label: "Sessions", color: "var(--brand-ink)" },
} satisfies ChartConfig;

export function UserActivityChart() {
  const { data: points, isPending } = useUserActivity();

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <header className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-brand-title">
            User Activity
          </h3>
          <p className="text-sm text-brand-body">Weekly trends</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-brand-body">
          <span className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full bg-brand-green"
              aria-hidden
            />
            Users
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full bg-brand-ink"
              aria-hidden
            />
            Sessions
          </span>
        </div>
      </header>

      {isPending || !points ? (
        <Skeleton className="h-[280px] w-full" />
      ) : (
        <ChartContainer
          config={CHART_CONFIG}
          className="aspect-auto h-[280px] w-full"
        >
          <LineChart data={points} margin={{ left: 8, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              domain={[0, 125]}
              ticks={[0, 25, 50, 75, 100, 125]}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Line
              dataKey="sessions"
              type="monotone"
              stroke="var(--color-sessions)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
            <Line
              dataKey="users"
              type="monotone"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      )}
    </section>
  );
}
