import React from 'react';
import Login from '@/components/Login';
import Register from '@/components/Register';
import { Toaster } from "@/components/ui/toaster"
import '@/styles/globals.css';

export const metadata = {
  title: 'Airis',
  description: 'Autonomous cloud infrastructure constructor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
          <main>{children}</main>
        <Login />
        <Register /> 
        <Toaster/>
      </body>
    </html>
  );
}
