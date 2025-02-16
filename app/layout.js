"use client";

import { SessionProvider } from "next-auth/react"; // import SessionProvider
import Navbar from "./components/Navbar"; // navbar component
import { useEffect, useState } from "react"; // Import useEffect and useState for client-side rendering
import "./globals.css";

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false); // Track if client-side rendering is complete

  useEffect(() => {
    setIsClient(true); // Once the component is mounted on the client, update the state
  }, []);

  if (!isClient) {
    return null; // Return null until client-side rendering is ready
  }

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
