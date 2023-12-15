import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { convertDivision } from "@/lib/utils";
import { Separator } from "./ui/separator";

type CardProps = {
  division: string;
  positiveCount: number;
  totalCount: number;
};

function DivisionCard({ division, positiveCount, totalCount }: CardProps) {
  const { label, image } = convertDivision(division);
  return (
    <Card className="flex flex-col items-center justify-center pt-4">
          
      <CardContent className="w-full">
        <div className="flex justify-between items-center gap-4">
          <Image
            src={`/image/division/${image}.png`}
            alt="dibision"
            width={65}
            height={65}
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{label}</h1>
            <p className=" text-green-500 font-semibold text-md">
              {positiveCount} Positive
            </p>
            <p className="text-slate-900 font-semibold text-sm">out of {totalCount}</p>
          </div>
        </div>
      </CardContent>
 
    </Card>
  );
}

export default DivisionCard;
