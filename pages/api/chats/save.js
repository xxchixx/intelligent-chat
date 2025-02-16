import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, message, response } = req.body;

    const chat = await prisma.chat.create({
      data: { userId, message, response },
    });

    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
