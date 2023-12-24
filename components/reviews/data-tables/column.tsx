"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalizeFirstChar } from "@/lib/utils";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reviews = {
  id: string;
  review: string;
  division: string;
  analisis: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Reviews>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "Date Added",
    cell: ({ row }) => {
      const value: string = row.getValue("date");

      const originalDate = new Date(value);
      const formattedDate = `${(originalDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${originalDate
        .getDate()
        .toString()
        .padStart(2, "0")}-${originalDate.getFullYear()}, ${originalDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${originalDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      return (
        <div className="w-[120px] h-4 text-ellipsis overflow-hidden">
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "review",
    header: "Review",
    cell: ({ row }) => {
      const value: string = row.getValue("review");

      return (
        <div className="w-[800px]  text-ellipsis overflow-hidden">{value}</div>
      );
    },
  },
  {
    accessorKey: "division",
    header: "Divisi",
    cell: ({ row }) => {
      const value: string = row.getValue("division");

      return (
        <div className="text-ellipsis overflow-hidden">
          {capitalizeFirstChar(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "analisis",
    header: "Analisys",
    cell: ({ row }) => {
      const value: string = row.getValue("analisis");

      if (value == "POSITIVE") {
        return <Badge variant="success">{value}</Badge>;
      } else if (value == "NEUTRAL") {
        return <Badge variant="secondary">{value}</Badge>;
      } else {
        return <Badge variant="destructive">{value}</Badge>;
      }
    },
  },
];
