import React, { FormEvent, useState } from "react";
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
import axios from "axios";

export default function Inputs() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Show loading spinner while waiting for the response
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("text", text);

      const res = await axios.post("/python/singleInputs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;

      if (data.results) {
        if (data.results.join(", ") == 0) {
          setResponse("Negative");
        } else if (data.results.join(", ") == 1) {
          setResponse("Positive");
        } else {
          setResponse("Netral");
        }
      } else {
        setResponse("Error: No results");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Input Single">
      <div className="flex items-center justify-between space-y-2 py-4 bg-white rounded-lg p-4 drop-shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Input</h2>
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
                    href="/inputs "
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Inputs
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
     <div className="bg-white p-8 rounded-md drop-shadow-md my-6">
     <form onSubmit={handleSubmit}>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        >
          Text:
        </label>
        <textarea
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        ></textarea>
        <Button type="submit" disabled={loading} className="mt-2">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
      {response && (
        <div className="mt-4">
          <strong>Response:</strong> {response}
        </div>
      )}
     </div>
    </Layout>
  );
}
