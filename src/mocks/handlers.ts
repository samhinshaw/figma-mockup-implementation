import { delay, graphql, HttpResponse } from "msw";
import type { DashboardOverviewQuery } from "@/graphql/generated/graphql";
import { dashboardOverview } from "./fixtures";

/**
 * MSW request handlers — the "backend" for the app.
 *
 * Handlers match by GraphQL operation name, so they work regardless of which
 * endpoint graphql-request posts to (VITE_GRAPHQL_ENDPOINT). The artificial
 * `delay()` makes TanStack Query's loading state observable in the UI.
 *
 * To mock another query: add the operation (in a .graphql file or graphql()
 * tag), run `pnpm codegen`, then add a handler here returning typed data.
 */
export const handlers = [
  graphql.query<DashboardOverviewQuery>("DashboardOverview", async () => {
    await delay(600);
    return HttpResponse.json({ data: dashboardOverview });
  }),
];
