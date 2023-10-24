import React from "react";
import Layout from "@/components/Layout";
import UploadModal from "@/components/reviews/upload-modal";

export default function Reviews() {
  
  return (
    <Layout title="Reviews">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Review Table</h2>
        <div className="flex items-center space-x-2">
         <UploadModal/>
        </div>
      </div>
    </Layout>
  );
}
