import React, { useState } from "react";
import Layout from "@/components/Layout";
import UploadModal from "@/components/reviews/upload-modal";
import {
  columns,
  Reviews as RV,
} from "@/components/reviews/data-tables/column";
import { DataTable } from "@/components/reviews/data-tables/data-table";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { MdUploadFile } from "react-icons/md";

export default function Reviews() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    data: review,
    error,
    isLoading,
    mutate,
  } = useSWR<RV[]>("/api/reviews", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Layout title="Reviews">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Review Table</h2>
        <div className="flex items-center space-x-2">
          <Button variant="green" onClick={()=>setOpen(true)}>
            <MdUploadFile size={20} className="me-4" /> Upload File
          </Button>
          <UploadModal
            mutate={mutate}
            isOpen={open}
            onClose={() => setOpen(false)}
            loading={loading}
          />
        </div>
      </div>
      <DataTable columns={columns} data={review as RV[]} />
    </Layout>
  );
}
