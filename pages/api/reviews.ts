import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const reviews = await prisma.review.findMany();
    res.status(200).json(reviews);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    console.log(id);
    
    await prisma.review.delete({
      where: { id },
    });
    res.status(200).json(["Delete Succeded"]);
  }
}
