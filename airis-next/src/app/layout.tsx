import React from 'react';
import Navbar from '@/components/Navbar';
import Login from '@/components/Login';
import Register from '@/components/Register';
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
      </body>
    </html>
  );
}
