import { Button } from "@/components/ui/button";

/**
 * Placeholder app shell. The real Dashboard (sidebar, hero, stat cards,
 * projects table, charts) gets built during implementation — see README.
 * This page only exists to prove the toolchain renders.
 */
export function App() {
  return (
    <main className="grid min-h-svh place-items-center bg-background text-foreground">
      <div className="text-center">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Material Dashboard · Scaffold
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Ready to build 🛠️</h1>
        <p className="mt-2 text-muted-foreground">
          Stack is wired up. Start implementing in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">src/</code>.
        </p>
        <Button className="mt-6">shadcn/ui Button works</Button>
      </div>
    </main>
  );
}
