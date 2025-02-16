import prisma from "../../../lib/prisma"; //Import prisma
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: String(username) },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already taken." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

  
    // Respond with the success message
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User creation failed" });
  }
}
