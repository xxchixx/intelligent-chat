import { PrismaClient } from "@prisma/client";
import { connect } from "http2";
import OpenAI from "openai";

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  console.log("Received request:", req.body); // Debugging log

  if (req.method === "GET") {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "User ID is required" });
    
    // Assuming you use userId as the chat id for simplicity
    const messages = await prisma.message.findMany({
      where: { chatId: parseInt(userId) },
      orderBy: { createdAt: "asc" }, // Order by timestamp
    });

    if (!messages) {
      return res.status(404).json({ error: "Chat not found" });
    }
    
    return res.status(200).json({
      messages: messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender,
      })),
    });
  }
  

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, chatId, userId } = req.body; // Ensure chatId is being passed in the body
    console.log("User message:", message); // Debugging log
    console.log("chatId:", chatId); // Debugging log

    let chat;

    // If chatId is provided, fetch the existing chat; otherwise, create a new chat
    if (chatId) {
      chat = await prisma.chat.findUnique({
        where: { id: chatId },
        include: { messages: true },
      });
    } else {
      if (!userId) {
        throw new Error("User ID is required to create a chat")
      }
      chat = await prisma.chat.create({
        data: {
          title: "New Chat",
          user: {
            connect: {id: userId }, // Connecting the existing user based on userId
          },
        },
      });
    }

    // Store user's message in the database
    const userMessage = await prisma.message.create({
      data: {
        content: message,
        chatId: userId,
        sender: "user",
      },
    });

    console.log("Saved user message:", userMessage); // Debugging log

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const aiReply = response.choices[0].message.content;
    console.log("OpenAI response:", response); // Debugging log

    // Store AI's response in the database
    const aiMessage = await prisma.message.create({
      data: {
        content: aiReply,
        chatId: userId,
        sender: "assistant",
      },
    });

    console.log("Saved AI message:", aiMessage); // Debugging log

    // Return the updated chat with all messages
    const updatedChat = await prisma.message.findMany({
      where: { chatId: parseInt(userId) },
      orderBy: { createdAt: "asc" }, // Order by timestamp
    });

    console.log("Updated chat:", updatedChat);

     // Return all messages with sender info (user or assistant)
     return res.status(200).json({
      messages: [aiMessage].map((msg) => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender, // Directly use the sender from the database
      })),
    });

  } catch (error) {
    console.log("Error:", error.message);  // Debugging log
    return res.status(500).json({ error: error.message });
  }
}
