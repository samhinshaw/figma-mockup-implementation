import { Bell, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrdersOverview } from "@/data/types";

export function OrdersOverviewCard({ data }: { data: OrdersOverview }) {
  return (
    <section className="card-lift flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <header className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-brand-title">
          {data.title}
        </h3>
        <p className="text-sm text-brand-body">{data.subtitle}</p>
      </header>

      <ul className="flex flex-1 flex-col gap-4">
        {data.items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            {item.icon === "bell" ? (
              <Bell className="mt-0.5 size-4 text-brand-green" aria-hidden />
            ) : (
              <ShoppingCart
                className="mt-0.5 size-4 text-brand-red"
                aria-hidden
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-brand-title">
                {item.title}
              </span>
              <span className="text-xs tracking-wide text-brand-body uppercase">
                {item.timestamp}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Badge
        className={cn(
          "mt-auto w-fit rounded-full border-transparent bg-brand-green-soft text-brand-green",
        )}
      >
        {data.trendLabel}
      </Badge>
    </section>
  );
}
