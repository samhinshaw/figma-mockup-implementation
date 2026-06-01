import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/dashboard/stat-card";
import { OrdersOverviewCard } from "@/components/dashboard/orders-overview-card";
import { useOrdersOverview, useStatWidgets } from "@/data/queries";

function StatCardSkeleton() {
  return (
    <div className="h-[257px] rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

export function StatCardsRow() {
  const { data: widgets, isPending: widgetsPending } = useStatWidgets();
  const { data: orders, isPending: ordersPending } = useOrdersOverview();

  if (widgetsPending || ordersPending || !widgets || !orders) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {widgets.map((widget) => (
        <StatCard key={widget.id} widget={widget} />
      ))}
      <OrdersOverviewCard data={orders} />
    </div>
  );
}
