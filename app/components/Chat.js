// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import AuthStatus from "./AuthStatus"; // Import AuthStatus component

// const Chat = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (input.trim() === "") return;

//     // Send message to API (where i'll process the chat)
//     setMessages([...messages, { text: input, sender: "user" }]);
//     setInput("");

//     // Example of API interaction (i'll need to implement this backend)
//     // const response = await fetch('/api/chat', { method: 'POST', body: { message: input }});
//     // const data = await response.json();
//     // setMessages([...messages, { text: data.reply, sender: "ai" }]);
//   };

//   if (!session) {
//     return (
//       <div>
//         <AuthStatus />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Welcome, {session.user.name}! Start chatting below.</h2>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index} className={message.sender === "user" ? "user-message" : "ai-message"}>
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;
