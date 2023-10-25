"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reviews = {
  id: string;
  review: string;
  division: string;
  analisis: string;

  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Reviews>[] = [
  {
    header: "No",
   
    cell:({cell})=>{
       
       
        return <div className="w-[36px] h-4 text-ellipsis overflow-hidden">{cell.row.index +1  }</div>;
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date Added",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      const day = date.getUTCDate();
      const month = date.toLocaleString("en-us", { month: "long" });
      const year = date.getUTCFullYear();

      const formattedDate = `${day} ${month} ${year}`;

  

      return <div className="w-[120px] h-4 text-ellipsis overflow-hidden">{formattedDate}</div>;;
    },
  },
  {
    accessorKey: "review",
    header: "Email",
    cell: ({ row }) => {
        const value:string = row.getValue("review")
  
     
  
    
  
        return <div className="w-[800px]  text-ellipsis overflow-hidden">{value}</div>;
      },
  },
  {
    accessorKey: "division",
    header: "Email",
  },
  {
    accessorKey: "analisis",
    header: "Email",
    cell: ({ row }) => {
        const value:string = row.getValue("analisis")
  
        if (value == "POSITIVE") {
            
            return <Badge variant="success">{value}</Badge>;
        } else {
            
            return <Badge variant="destructive">{value}</Badge>;
        }
  
    
  
      },
  },
];
