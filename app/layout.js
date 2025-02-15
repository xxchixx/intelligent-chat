"use client";

import { SessionProvider } from "next-auth/react"; // import SessionProvider
import Navbar from "./components/Navbar"; // navbar component
import "./globals.css";

export default function RootLayout({ children }) {
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
