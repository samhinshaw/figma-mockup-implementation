import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { PageFooter } from "@/components/layout/page-footer";
import { useUIStore } from "@/stores/ui";

export function AppShell({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  // Ensure the mobile drawer never starts open (store defaults to true).
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  // Close the mobile drawer on Escape.
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [setSidebarOpen]);

  // Close the drawer when a nav link inside it is clicked.
  function handleDrawerClick(event: React.MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a")) {
      setSidebarOpen(false);
    }
  }

  return (
    <div className="min-h-svh bg-brand-page text-brand-title">
      <div className="mx-auto flex w-full max-w-[1480px]">
        <aside className="sticky top-0 hidden h-svh w-[244px] shrink-0 lg:block">
          <AppSidebar />
        </aside>

        <main className="min-w-0 flex-1 p-3 sm:p-4 lg:py-5 lg:pr-5">
          <div className="mb-3 flex items-center gap-3 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label="Open navigation"
              onClick={toggleSidebar}
            >
              <Menu />
            </Button>
            <span className="text-base font-semibold text-brand-title">
              Material Shadcn
            </span>
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6 lg:p-7">
            <div className="flex flex-col gap-6">
              {children}
              <PageFooter />
            </div>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className="fixed inset-y-0 left-0 z-50 w-[260px] bg-white p-1 shadow-xl lg:hidden"
            onClick={handleDrawerClick}
          >
            <AppSidebar />
          </div>
        </>
      )}
    </div>
  );
}
