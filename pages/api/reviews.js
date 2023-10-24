import prisma from "@/lib/prismadb"

export default async  function handler(req, res) {

    if (req.method === 'GET') {
       
        const reviews = await prisma.review.findMany()
        res.status(200).json({ error: false,data:reviews })
      } else {
       
      }
  }