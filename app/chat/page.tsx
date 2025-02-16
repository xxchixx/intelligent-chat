"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Send } from "lucide-react"; 
import Sidebar from '../components/Sidebar'; 

export default function ChatPage() {
  const { data: session } = useSession() || {}; // Fix for potential undefined error
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: "assistant" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = { id: messages.length + 1, text: newMessage, sender: "user" };
    setMessages([...messages, userMessage]);
    setNewMessage("");
    // sendAIMessage();
  };

  const sendAIMessage = () => {
    const newAIMessage = "I don't know";
    const aiMessage = { id: messages.length + 1, text: newAIMessage, sender: "assistant" };
    setMessages([...messages, aiMessage]);
    setNewMessage("");
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar (Fixed Width) */}
      <Sidebar />

      {/* Chat Area (Takes Remaining Space) */}
      <div className="flex-1 flex flex-col bg-gradient-to-r from-cyan-500 via-indigo-500 to-sky-500">
        {/* Chat Container */}
        <div className="w-full max-w-3xl mx-auto h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden my-[5vh]">
          {/* Chat Header */}
          <div className="p-4 bg-indigo-500 text-white text-center text-xl font-bold flex justify-between items-center">
            Chat with AI
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "user" ? "ml-auto overflow-x-hidden break-words bg-green-400 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
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

