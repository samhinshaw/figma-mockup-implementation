import { SalesExpensesChart } from "@/components/dashboard/sales-expenses-chart";
import { UserActivityChart } from "@/components/dashboard/user-activity-chart";
import { TrafficSourcesChart } from "@/components/dashboard/traffic-sources-chart";
import { QuarterlyPerformanceChart } from "@/components/dashboard/quarterly-performance-chart";

export function ChartsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <SalesExpensesChart />
      <UserActivityChart />
      <TrafficSourcesChart />
      <QuarterlyPerformanceChart />
    </div>
  );
}
