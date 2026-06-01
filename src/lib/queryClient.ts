import { QueryClient } from "@tanstack/react-query";

/**
 * Shared TanStack Query client. Tune defaults here as the app grows.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});
