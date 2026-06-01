import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { Column, ColumnDef } from "@tanstack/react-table";

import { BrandLogo } from "@/components/brand-logos";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import type { Project } from "@/data/types";
import { personaAvatar } from "@/lib/avatars";
import { cn } from "@/lib/utils";
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

/** Uppercase column label that toggles this column's sort on click. */
function SortHeader({
  column,
  label,
}: {
  column: Column<Project>;
  label: string;
}) {
  const sorted = column.getIsSorted(); // "asc" | "desc" | false
  const Icon =
    sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ChevronsUpDown;

  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn(
        HEAD_CLASS,
        "inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-brand-title",
        sorted !== false && "text-brand-title",
      )}
      aria-label={`Sort by ${label}`}
    >
      {label}
      <Icon className={cn("size-3", sorted === false && "opacity-40")} />
    </button>
  );
}

export const projectsColumns: ColumnDef<Project>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all projects on this page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortHeader column={column} label="Companies" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <BrandLogo brand={row.original.logo} className="size-5" />
        <span className="text-sm font-medium text-brand-title">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    id: "members",
    header: () => <span className={HEAD_CLASS}>Members</span>,
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarGroup>
        {row.original.members.map((member) => (
          <Avatar key={member.id} size="sm">
            <AvatarImage src={personaAvatar(member.name)} alt={member.name} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    ),
  },
  {
    accessorKey: "budget",
    header: ({ column }) => <SortHeader column={column} label="Budget" />,
    cell: ({ row }) => (
      <span className="text-sm text-brand-body tabular-nums">
        {formatCurrency(row.original.budget)}
      </span>
    ),
  },
  {
    accessorKey: "team",
    header: () => <span className={HEAD_CLASS}>Team</span>,
    enableSorting: false,
    // Exact-match filter driven by the "Filter by team" dropdown.
    filterFn: (row, columnId, filterValue) =>
      row.getValue(columnId) === filterValue,
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-md font-medium">
        {row.original.team}
      </Badge>
    ),
  },
  {
    accessorKey: "completion",
    header: ({ column }) => <SortHeader column={column} label="Completion" />,
    cell: ({ row }) => (
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-brand-body tabular-nums">
          {row.original.completion}%
        </span>
        <Progress value={row.original.completion} className="h-1.5 w-28" />
      </div>
    ),
  },
];
