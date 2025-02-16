import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = req.query; // Get user ID from query params

    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
