/**
 * Domain models for the Dashboard page. These describe the *shape* of the data
 * the UI consumes — the actual values live in `mock.ts` and are served through
 * the query hooks in `queries.ts`. Intentionally UI-focused (no API concerns).
 */

/** Hero banner ("Build Amazing Teams"). `teamSeeds` drive the avatar cluster. */
export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  teamSeeds: string[];
}

/** A single bar in a stat-card mini chart. `label` is the full weekday name. */
export interface WeeklyBar {
  label: string;
  value: number;
}

/** One of the three chart stat cards (Website View / Daily Sales / …). */
export interface StatWidget {
  id: string;
  title: string;
  subtitle: string;
  /** What a value represents in the tooltip, e.g. "Views" / "Sales". */
  valueLabel: string;
  data: WeeklyBar[];
  /** Index of the highlighted (blue) bar. */
  highlightIndex: number;
  /** Footer status line, e.g. "campaign sent 2 days ago". */
  status: string;
}

export type OrderIcon = "bell" | "cart";

export interface OrderItem {
  id: string;
  icon: OrderIcon;
  title: string;
  timestamp: string;
}

/** The fourth stat card — a list of recent orders + a trend badge. */
export interface OrdersOverview {
  title: string;
  subtitle: string;
  items: OrderItem[];
  trendLabel: string;
}

export type BrandKey = "figma" | "github" | "discord" | "slack";

export type ProjectTeam =
  | "Design"
  | "Development"
  | "Back-End"
  | "Marketing";

export interface ProjectMember {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  logo: BrandKey;
  members: ProjectMember[];
  budget: number;
  team: ProjectTeam;
  /** Completion percentage, 0–100. */
  completion: number;
}

export interface SalesExpensesPoint {
  month: string;
  sales: number;
  expenses: number;
}

export interface UserActivityPoint {
  day: string;
  users: number;
  sessions: number;
}

export type TrafficKey = "desktop" | "tablet" | "mobile";

export interface TrafficSource {
  key: TrafficKey;
  label: string;
  value: number;
}

export interface QuarterPoint {
  quarter: string;
  revenue: number;
  profit: number;
}
