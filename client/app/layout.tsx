import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from 'react-hot-toast';
import SocketIOProvider from '@/providers/SocketIOProvider';

export const metadata: Metadata = {
  title: "Chat",
  description: "Welcome to Chat! This is a real-time chat application with a Node.js/Express.js backend and a Next.js frontend. The application integrates Socket.IO for real-time communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <SessionProvider>
          <SocketIOProvider>
            {children}
            <Toaster />
          </SocketIOProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
