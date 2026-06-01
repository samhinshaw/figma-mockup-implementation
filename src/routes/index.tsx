import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { HeroCard } from "@/components/dashboard/hero-card";
import { StatCardsRow } from "@/components/dashboard/stat-cards-row";
import { ProjectsTable } from "@/components/dashboard/projects-table";
import { ChartsGrid } from "@/components/dashboard/charts-grid";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function Reveal({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div
      className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500"
      style={{ animationFillMode: "both", animationDelay: index * 90 + "ms" }}
    >
      {children}
    </div>
  );
}

function DashboardPage() {
  return (
    <>
      <Reveal index={0}>
        <HeroCard />
      </Reveal>
      <Reveal index={1}>
        <StatCardsRow />
      </Reveal>
      <Reveal index={2}>
        <ProjectsTable />
      </Reveal>
      <Reveal index={3}>
        <ChartsGrid />
      </Reveal>
    </>
  );
}
