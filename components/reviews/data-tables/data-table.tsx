"use client";

import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Reviews } from "./column";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  mutate: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  mutate,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    table.setPageSize(5);
  }, [table]);
  console.log(table.getFilteredSelectedRowModel());
  useEffect(() => {
    if (table.getFilteredSelectedRowModel().rows.length > 0) {
      table.getFilteredSelectedRowModel().rows.map((item) => {
        console.log(item.original);
      });
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [table.getFilteredSelectedRowModel()]);
  const onDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    if (selectedRows.length > 0) {
      try {
        // Use Promise.all to make multiple delete requests concurrently
        await Promise.all(selectedRows.map(async (item) => {
          const value = item.original as Reviews;
  
          const response = await axios.delete("/api/reviews", { data: { id: value.id } });
          console.log(response.data);
        }));
  
        // After all deletes are successful, trigger data re-fetch
        mutate();
      } catch (error) {
        console.error("Error deleting reviews:", error);
        // Handle errors as needed, e.g., display an error message to the user
      }
    }
  };

  return (
    <div className="mt-6 bg-white rounded drop-shadow-sm p-4">
      <div className="flex items-center py-4 ">
        <Input
          placeholder="Filter review..."
          value={(table.getColumn("review")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("review")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto">
          <Button
            variant="destructive"
            className="ml-auto mr-4"
            disabled={disabled}
            onClick={onDelete}
          >
            Delete Data
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto ">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
