import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import { BrandLogo } from "@/components/brand-logos";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjects } from "@/data/queries";
import type { Project } from "@/data/types";
import { personaAvatar } from "@/lib/avatars";
import { formatCurrency } from "@/lib/format";

const HEAD_CLASS = "text-xs tracking-wide text-brand-body uppercase";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ProjectRow({
  project,
  selected,
  onToggle,
}: {
  project: Project;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <TableRow>
      <TableCell className="pl-6">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onToggle(project.id)}
          aria-label={`Select ${project.name}`}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <BrandLogo brand={project.logo} className="size-5" />
          <span className="text-brand-title text-sm font-medium">
            {project.name}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <AvatarGroup>
          {project.members.map((member) => (
            <Avatar key={member.id} size="sm">
              <AvatarImage src={personaAvatar(member.name)} alt={member.name} />
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell className="text-brand-body text-sm tabular-nums">
        {formatCurrency(project.budget)}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="rounded-md font-medium">
          {project.team}
        </Badge>
      </TableCell>
      <TableCell className="pr-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-brand-body text-xs tabular-nums">
            {project.completion}%
          </span>
          <Progress value={project.completion} className="h-1.5 w-28" />
        </div>
      </TableCell>
    </TableRow>
  );
}

function SkeletonRow() {
  return (
    <TableRow>
      <TableCell className="pl-6">
        <Skeleton className="size-4 rounded-[4px]" />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex -space-x-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-20 rounded-md" />
      </TableCell>
      <TableCell className="pr-6">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-1.5 w-28 rounded-full" />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ProjectsTable() {
  const { data, isPending } = useProjects();
  const projects = data ?? [];

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(2);

  const allSelected =
    projects.length > 0 && projects.every((p) => selected.has(p.id));

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === projects.length && projects.length > 0
        ? new Set()
        : new Set(projects.map((p) => p.id)),
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4 p-6 pb-2">
        <div>
          <h2 className="text-brand-title text-xl font-semibold tracking-tight">
            Projects
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand-green" aria-hidden />
            <span className="text-brand-body text-sm">30 done this month</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal />
            Filter
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-brand-ink text-white hover:bg-brand-ink/90"
          >
            <Plus />
            New Project
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                  aria-label="Select all projects"
                  disabled={isPending}
                />
              </TableHead>
              <TableHead className={HEAD_CLASS}>Companies</TableHead>
              <TableHead className={HEAD_CLASS}>Members</TableHead>
              <TableHead className={HEAD_CLASS}>Budget</TableHead>
              <TableHead className={HEAD_CLASS}>Team</TableHead>
              <TableHead className={`${HEAD_CLASS} pr-6`}>Completion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              : projects.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    selected={selected.has(project.id)}
                    onToggle={toggleRow}
                  />
                ))}
          </TableBody>
        </Table>
      </div>

      <footer className="flex items-center justify-between border-t border-brand-hairline p-6 pt-4">
        <p className="text-brand-body text-sm">
          Page <span className="text-brand-title font-semibold">{page}</span> of
          10
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= 10}
            onClick={() => setPage((p) => Math.min(10, p + 1))}
          >
            Next
            <ChevronRight />
          </Button>
        </div>
      </footer>
    </div>
  );
}
