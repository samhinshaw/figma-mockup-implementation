import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";

import { projectsColumns } from "@/components/dashboard/projects-columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import type { ProjectTeam } from "@/data/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;
const TEAMS: ProjectTeam[] = ["Design", "Development", "Back-End", "Marketing"];

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

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  // TanStack Table manages its own state internally; the React Compiler lint
  // rule flags its return value as non-memoizable, which is expected here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: projects,
    columns: projectsColumns,
    // Key rows by project id so selection survives paging/sorting/filtering.
    getRowId: (project) => project.id,
    state: { sorting, columnFilters, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const teamColumn = table.getColumn("team");
  const teamFilter =
    (teamColumn?.getFilterValue() as ProjectTeam | undefined) ?? "all";

  function selectTeam(value: string) {
    teamColumn?.setFilterValue(value === "all" ? undefined : value);
    table.setPageIndex(0); // jump back to the first page of the new result set
  }

  const pageCount = Math.max(table.getPageCount(), 1);
  const currentPage = table.getState().pagination.pageIndex + 1;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4 p-6 pb-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-brand-title">
            Projects
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand-green" aria-hidden />
            <span className="text-sm text-brand-body">30 done this month</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal />
                {teamFilter === "all" ? "Filter" : teamFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Filter by team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={teamFilter}
                onValueChange={selectTeam}
              >
                <DropdownMenuRadioItem value="all">
                  All teams
                </DropdownMenuRadioItem>
                {TEAMS.map((team) => (
                  <DropdownMenuRadioItem key={team} value={team}>
                    {team}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      index === 0 && "pl-6",
                      index === headerGroup.headers.length - 1 && "pr-6",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        index === 0 && "pl-6",
                        index === row.getVisibleCells().length - 1 && "pr-6",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={projectsColumns.length}
                  className="h-24 px-6 text-center text-sm text-brand-body"
                >
                  No projects match this filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <footer className="flex items-center justify-between border-t border-brand-hairline p-6 pt-4">
        <p className="text-sm text-brand-body">
          {selectedCount > 0 && (
            <>
              <span className="font-semibold text-brand-title">
                {selectedCount}
              </span>{" "}
              selected ·{" "}
            </>
          )}
          Page{" "}
          <span className="font-semibold text-brand-title">{currentPage}</span>{" "}
          of {pageCount}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
            <ChevronRight />
          </Button>
        </div>
      </footer>
    </div>
  );
}
