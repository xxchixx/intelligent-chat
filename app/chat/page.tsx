"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Send } from "lucide-react"; 
import Sidebar from '../components/Sidebar'; 

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
 
  // Load messages from db
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(`/api/chat?userId=${session?.user?.id}`);
        if (!response.ok) throw new Error("Failed to load messages");
        const data = await response.json();
        // Assuming your API returns messages with fields id, content, and sender
        const formattedMessages = data.messages.map((msg: { id: any; content: any; sender: any; }) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.sender,
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    if (session) {
      fetchMessages();
    }
  }, [session]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Create user message object
    const userMessage = { id: messages.length + 1, text: newMessage, sender: "user" };
    
    // Immediately update UI with user message
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    console.log("Sending message to API:", newMessage);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          chatId: currentChatId,
          message: newMessage,
        }),
      });


      if (!response.ok) throw new Error("Failed to save chat");

      const updatedChat = await response.json();
      console.log("Updated chat:", updatedChat);

      // Extract AI response message
      const aiResponseMessage = updatedChat.messages.find((msg: { sender: string }) => msg.sender === "assistant");

      if (aiResponseMessage) {
        const aiMessage = {
          id: messages.length + 1, // Ensure AI message has a unique ID
          text: aiResponseMessage.content || "Sorry, something went wrong.",
          sender: "assistant",
        };

  // Append AI response to chat
  setMessages((prevMessages) => [...prevMessages, aiMessage ]);
  setCurrentChatId(updatedChat.chatId);
} else {
  console.error("AI response not found", updatedChat);
}


    } catch (error) {
      console.error("Error saving chat:", error);
    }
};

  return (
    <div className="flex-1 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-r from-cyan-500 via-indigo-500 to-sky-500">
        <div className="w-full max-w-3xl mx-auto h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden my-[5vh]">
          <div className="p-4 bg-indigo-500 text-white text-center text-xl font-bold">Chat with AI</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "user" 
                  ? "ml-auto overflow-x-hidden break-words bg-green-400 text-white" 
                  : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 flex items-center bg-gray-100 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border-2 rounded-md focus:border-cyan-400 focus:bg-slate-50 outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="ml-2 p-2 bg-gradient-to-tr from-green-400 to-blue-500 text-white rounded-md hover:from-pink-500 hover:to-yellow-500"
              onClick={sendMessage}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div> 
  );
}
