import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

/**
 * Browser-side mock worker. Started from `enableMocking()` in main.tsx, guarded
 * by the VITE_ENABLE_MOCKS flag. Relies on the Service Worker script at
 * `public/mockServiceWorker.js` (regenerate with `npx msw init public/`).
 */
export const worker = setupWorker(...handlers);
