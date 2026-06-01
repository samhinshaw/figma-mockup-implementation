import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AppShell } from "@/components/layout/app-shell";

/**
 * Root route. The app shell (sidebar + header) will live here during
 * implementation; for now it just renders the matched child route.
 */
export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <AppShell>
        <Outlet />
      </AppShell>
      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </>
  );
}
