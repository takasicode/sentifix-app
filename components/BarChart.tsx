"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { type } from "os";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type ChartCount={
    positive:number
    negative:number
    neutral:number
}
function BarChart({negative,positive,neutral}:ChartCount) {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState<ChartOptions<"bar">>({});
  useEffect(() => {
    setChartData({
      labels: ["Reviews"],
      datasets: [
        {
          label: "Positive",
          data: [positive],
          borderColor: "rgb(29, 100, 32)",
          backgroundColor: "rgb(52, 177, 57)",
        }, 
        {
          label: "Neutral",
          data: [neutral],
          borderColor: "rgb(69, 69, 69)",
          backgroundColor: "rgb(121, 121, 121)",
        }, 
        {
            label: "Negative",
            data: [negative],
            borderColor: "rgb(131, 49, 49)",
            backgroundColor: "rgb(208, 79, 79)",
          },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "chartArea",
        },
        title: {
          display: true,
          text: "Review Charts",
        font:{
            size:20
        }  
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2  mt-8 p-4 border rounded-lg bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
}

export default BarChart;
