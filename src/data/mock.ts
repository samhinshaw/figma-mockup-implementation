import type {
  HeroContent,
  OrdersOverview,
  Project,
  QuarterPoint,
  SalesExpensesPoint,
  StatWidget,
  TrafficSource,
  UserActivityPoint,
} from "./types";

/**
 * Canned data for the Dashboard, mirroring the Material-Shadcn Figma file.
 * Everything the page renders is sourced from here — there is no real backend.
 * Edit freely; the query hooks in `queries.ts` serve these with a small delay.
 */

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

function weekBars(values: readonly number[]) {
  return WEEKDAYS.map((label, i) => ({ label, value: values[i] ?? 0 }));
}

export const mockHero: HeroContent = {
  eyebrow: "Teams",
  title: "Build Amazing Teams",
  description:
    "Connect with diverse talent and create inclusive workspaces that drive innovation. Discover how our platform helps you build stronger teams.",
  ctaLabel: "Get Started",
  teamSeeds: [
    "Amara Okafor",
    "Liam Chen",
    "Sofia Rossi",
    "Devin Brooks",
    "Priya Nair",
    "Mateo Garcia",
    "Hana Kim",
    "Noah Williams",
    "Yuki Tanaka",
    "Zara Ahmed",
    "Owen Patel",
    "Camila Santos",
  ],
};

export const mockStatWidgets: StatWidget[] = [
  {
    id: "website-view",
    title: "Website View",
    subtitle: "Last Campaign Performance",
    valueLabel: "Views",
    data: weekBars([18, 21, 17, 32, 9, 14, 27]),
    highlightIndex: 3,
    status: "campaign sent 2 days ago",
  },
  {
    id: "daily-sales",
    title: "Daily Sales",
    subtitle: "15% increase in today sales",
    valueLabel: "Sales",
    data: weekBars([22, 26, 19, 34, 12, 16, 29]),
    highlightIndex: 3,
    status: "updated 4 min ago",
  },
  {
    id: "completed-tasks",
    title: "Completed Tasks",
    subtitle: "Last Campaign Performance",
    valueLabel: "Tasks",
    data: weekBars([20, 24, 18, 31, 11, 15, 28]),
    highlightIndex: 3,
    status: "just updated",
  },
];

export const mockOrdersOverview: OrdersOverview = {
  title: "Orders Overview",
  subtitle: "Last Campaign Performance",
  items: [
    {
      id: "o1",
      icon: "bell",
      title: "$2,400, Design Changes",
      timestamp: "22 DEC 7:20 PM",
    },
    {
      id: "o2",
      icon: "cart",
      title: "New Order #1832412",
      timestamp: "22 DEC 7:20 PM",
    },
  ],
  trendLabel: "+24% this month",
};

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Material Figma Version",
    logo: "figma",
    members: [
      { id: "m1", name: "Amara Okafor" },
      { id: "m2", name: "Liam Chen" },
      { id: "m3", name: "Sofia Rossi" },
      { id: "m4", name: "Devin Brooks" },
    ],
    budget: 14000,
    team: "Design",
    completion: 50,
  },
  {
    id: "p2",
    name: "Add Progress Track",
    logo: "github",
    members: [
      { id: "m5", name: "Priya Nair" },
      { id: "m6", name: "Mateo Garcia" },
      { id: "m7", name: "Hana Kim" },
    ],
    budget: 3000,
    team: "Development",
    completion: 10,
  },
  {
    id: "p3",
    name: "Fix Platform Errors",
    logo: "discord",
    members: [
      { id: "m8", name: "Noah Williams" },
      { id: "m9", name: "Yuki Tanaka" },
      { id: "m10", name: "Zara Ahmed" },
    ],
    budget: 20000,
    team: "Back-End",
    completion: 50,
  },
  {
    id: "p4",
    name: "Launch Mobile App",
    logo: "github",
    members: [
      { id: "m11", name: "Owen Patel" },
      { id: "m12", name: "Camila Santos" },
      { id: "m13", name: "Liam Chen" },
    ],
    budget: 5000,
    team: "Design",
    completion: 50,
  },
  {
    id: "p5",
    name: "New Pricing Page",
    logo: "slack",
    members: [
      { id: "m14", name: "Sofia Rossi" },
      { id: "m15", name: "Amara Okafor" },
      { id: "m16", name: "Mateo Garcia" },
      { id: "m17", name: "Hana Kim" },
    ],
    budget: 2000,
    team: "Marketing",
    completion: 50,
  },
];

/** Headline figure shown on the Sales vs Expenses chart. */
export const mockSalesTotal = "$87,982.80";

export const mockSalesExpenses: SalesExpensesPoint[] = [
  { month: "Jan", sales: 220, expenses: 260 },
  { month: "Feb", sales: 300, expenses: 340 },
  { month: "Mar", sales: 260, expenses: 300 },
  { month: "Apr", sales: 360, expenses: 420 },
  { month: "May", sales: 520, expenses: 560 },
  { month: "Jun", sales: 800, expenses: 900 },
  { month: "Jul", sales: 690, expenses: 780 },
  { month: "Aug", sales: 610, expenses: 700 },
  { month: "Sept", sales: 760, expenses: 840 },
  { month: "Oct", sales: 540, expenses: 620 },
  { month: "Nov", sales: 400, expenses: 470 },
  { month: "Dec", sales: 900, expenses: 940 },
];

export const mockUserActivity: UserActivityPoint[] = [
  { day: "Mon", users: 30, sessions: 35 },
  { day: "Tue", users: 42, sessions: 52 },
  { day: "Wed", users: 55, sessions: 70 },
  { day: "Thu", users: 95, sessions: 112 },
  { day: "Fri", users: 80, sessions: 98 },
  { day: "Sat", users: 70, sessions: 88 },
  { day: "Sun", users: 108, sessions: 118 },
];

export const mockTrafficSources: TrafficSource[] = [
  { key: "desktop", label: "Desktop", value: 1240 },
  { key: "tablet", label: "Tablet", value: 980 },
  { key: "mobile", label: "Mobile", value: 740 },
];

export const mockQuarterly: QuarterPoint[] = [
  { quarter: "Q1", revenue: 120000, profit: 48000 },
  { quarter: "Q2", revenue: 205000, profit: 125000 },
  { quarter: "Q3", revenue: 165000, profit: 83000 },
  { quarter: "Q4", revenue: 225000, profit: 110000 },
];
