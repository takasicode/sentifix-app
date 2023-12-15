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
import Link from "next/link";

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
console.log(review);

  return (
    <Layout title="Reviews">
      <div className="flex items-center justify-between space-y-2 py-4">
      <div className="mb-8">
      <h2 className="text-3xl font-bold tracking-tight  mb-2">Review Table</h2>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Overview
                </Link>
              </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  href="/reviews"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Review
                </Link>
              </div>
            </li>
            
          </ol>
        </nav>
      </div>

        <div className="flex items-center space-x-2 my-2">
          <Button variant="green" onClick={() => setOpen(true)}>
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
