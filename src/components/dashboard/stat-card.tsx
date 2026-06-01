import type { StatWidget } from "@/data/types";
import { MiniBarChart } from "@/components/dashboard/mini-bar-chart";

export function StatCard({ widget }: { widget: StatWidget }) {
  return (
    <div className="card-lift flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div>
        <h3 className="text-base leading-tight font-semibold text-brand-title">
          {widget.title}
        </h3>
        <p className="text-sm text-brand-body">{widget.subtitle}</p>
      </div>
      <div className="flex-1">
        <MiniBarChart
          data={widget.data}
          highlightIndex={widget.highlightIndex}
          valueLabel={widget.valueLabel}
        />
      </div>
      <div className="border-t border-brand-hairline pt-3">
        <div className="flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-brand-green" />
          <span className="min-w-0 truncate text-xs text-brand-body">
            {widget.status}
          </span>
        </div>
      </div>
    </div>
  );
}
