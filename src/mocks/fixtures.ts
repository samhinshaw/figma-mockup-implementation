import type { DashboardOverviewQuery } from "@/graphql/generated/graphql";

/**
 * Canned data the mock "server" returns for the DashboardOverview query.
 *
 * Typed as `DashboardOverviewQuery` so it can never drift from the GraphQL
 * schema — change `schema.graphql` / the operation, run `pnpm codegen`, and
 * TypeScript will flag any field this fixture is now missing.
 *
 * Values loosely mirror the Material Dashboard template. Edit freely.
 */
export const dashboardOverview: DashboardOverviewQuery = {
  dashboardStats: {
    websiteViews: 46000,
    dailySales: 23400.5,
    completedTasks: 715,
  },
  projects: [
    {
      id: "1",
      name: "Material XD Version",
      budget: 14000,
      completion: 60,
      members: [
        { id: "m1", name: "Ryan Tompson", avatarUrl: null },
        { id: "m2", name: "Romina Hadid", avatarUrl: null },
        { id: "m3", name: "Alexander Smith", avatarUrl: null },
      ],
    },
    {
      id: "2",
      name: "Add Progress Track",
      budget: 3000,
      completion: 10,
      members: [{ id: "m4", name: "Jessica Doe", avatarUrl: null }],
    },
    {
      id: "3",
      name: "Fix Platform Errors",
      budget: 0,
      completion: 100,
      members: [
        { id: "m5", name: "Mark Wilson", avatarUrl: null },
        { id: "m6", name: "Nina Patel", avatarUrl: null },
      ],
    },
    {
      id: "4",
      name: "Launch our Mobile App",
      budget: 20500,
      completion: 100,
      members: [
        { id: "m7", name: "Ryan Tompson", avatarUrl: null },
        { id: "m8", name: "Romina Hadid", avatarUrl: null },
        { id: "m9", name: "Jessica Doe", avatarUrl: null },
      ],
    },
    {
      id: "5",
      name: "Add the New Pricing Page",
      budget: 500,
      completion: 25,
      members: [{ id: "m10", name: "Alexander Smith", avatarUrl: null }],
    },
    {
      id: "6",
      name: "Redesign New Online Shop",
      budget: 2000,
      completion: 40,
      members: [
        { id: "m11", name: "Mark Wilson", avatarUrl: null },
        { id: "m12", name: "Nina Patel", avatarUrl: null },
      ],
    },
  ],
  salesOverview: [
    { label: "Apr", value: 300 },
    { label: "May", value: 200 },
    { label: "Jun", value: 360 },
    { label: "Jul", value: 290 },
    { label: "Aug", value: 410 },
    { label: "Sep", value: 350 },
    { label: "Oct", value: 470 },
    { label: "Nov", value: 430 },
    { label: "Dec", value: 520 },
  ],
};
