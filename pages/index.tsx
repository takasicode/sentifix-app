import BarChart from "@/components/BarChart";
import DivisionCard from "@/components/DivisionCard";
import Header from "@/components/Header";
import Layout from "@/components/Layout";

import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import prisma from "@/lib/prismadb";


import { GetStaticProps } from "next";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Review {
  id: number;
  review: string;
  division: string | null;
  analisis: 'POSITIVE' | 'NEGATIVE';
  date: string;
  createdAt: string; // Use Date instead of string
  updatedAt: string | null;
}
interface HomeProps {
  reviews: Review[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const result = await prisma.review.findMany();
    const reviewsWithDateStrings = result.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt ? review.updatedAt.toISOString() : null,
    }));

    return {
      props: { reviews: reviewsWithDateStrings },
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      props: { reviews: [] }, // Provide an empty array or handle the error appropriately
    };
  }
};
const Home: React.FC<HomeProps> = ({ reviews }) => {
  const webData = reviews.filter(item => item.division === "web");
  const positiveWeb = webData.filter(item=>item.analisis
    ==='POSITIVE').length
  const jaringanData = reviews.filter(item => item.division === "jaringan");
  const positiveJar = jaringanData.filter(item=>item.analisis
    ==='POSITIVE').length
  const mobileData = reviews.filter(item => item.division === "mobile");
  const positiveMob = mobileData.filter(item=>item.analisis
    ==='POSITIVE').length
  const gameData = reviews.filter(item => item.division === "game");
  const positiveGame = gameData.filter(item=>item.analisis
    ==='POSITIVE').length
  const dataData = reviews.filter(item => item.division === "data");
  const positiveData = dataData.filter(item=>item.analisis
    ==='POSITIVE').length
  const multimediaData = reviews.filter(item => item.division === "multimedia");
  const positiveMulmed = multimediaData.filter(item=>item.analisis
    ==='POSITIVE').length


    const totalPositive = reviews.filter(item => item.analisis === "POSITIVE").length;
    const totalNegative = reviews.filter(item => item.analisis === "NEGATIVE").length;
const sortedDAta = reviews.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
const limitedReviews = sortedDAta.slice(0, 10);
    console.log(limitedReviews);
    
  return (
    <Layout title="Dashboard">
      <div className="h-screen space-y-2 py-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Overview</h2>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center" aria-current="page">
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
            </ol>
          </nav>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 ">
          <DivisionCard
            division="web"
            positiveCount={positiveWeb}
            totalCount={webData.length}
          />
          <DivisionCard
            division="mobile"
            positiveCount={positiveMob}
            totalCount={mobileData.length}
          />
          <DivisionCard
            division="game"
            positiveCount={positiveGame}
            totalCount={gameData.length}
          />
          <DivisionCard
            division="data"
            positiveCount={positiveData}
            totalCount={dataData.length}
          />
          <DivisionCard
            division="multimedia"
            positiveCount={positiveMulmed}
            totalCount={multimediaData.length}
          />
          <DivisionCard
            division="jaringan"
            positiveCount={positiveJar}
            totalCount={jaringanData.length}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4 ">
          <BarChart positive={totalPositive} negative={totalNegative} />
      <div className="rounded-lg border drop-shadow-sm mt-8 p-8">
      <table className="border  table-fixed ">
          
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Status</th>
              <th>Method</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {limitedReviews.map((item,index)=>(

            <tr key={index} className="!max-h-5">
              <td className="font-medium">{index+1}</td>
              <td className="text-ellipsis overflow-hidden">{item.review}</td>
              <td>{item.division}</td>
              <td className="text-right">{item.analisis}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;