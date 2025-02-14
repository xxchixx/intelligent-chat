import prisma from "../../../lib/prisma"; // Import Prisma client instance
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Hash the password before saving it 
    const hashedPassword = await bcrypt.hash(password, 10);; // hash the password here using bcrypt

    try {
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword, // Save the hashed password
        },
      });

      res.status(201).json({ message: "User created", user });
    } catch (error) {
      res.status(500).json({ error: "User creation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
