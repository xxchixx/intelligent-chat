import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export default async function handler(req, res) {
  console.log("Received request:", req.body); // Debugging log
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    console.log("User message:", message); // Debugging log

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    console.log("OpenAI response:", response); // Debugging log

    return res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.log("Error:", error.message);  // Debugging log
    return res.status(500).json({ error: error.message });
  }
}
