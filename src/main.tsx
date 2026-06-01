import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@/styles/globals.css";
import { queryClient } from "@/lib/queryClient";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

// Register the router instance for type-safety across the app.
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/**
 * Start the MSW mock worker when VITE_ENABLE_MOCKS is set. The dynamic import
 * keeps MSW (and the fixtures) out of the production bundle when mocks are off.
 */
async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS !== "true") return;
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
