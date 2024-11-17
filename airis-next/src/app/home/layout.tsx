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
  
      <div className="bg-background text-foreground">
        <Navbar />
        <main>
        <div className="min-h-screen bg-black text-white">
        <div className="main-container h-full mt-16">
          {children}
          </div>
          </div>
        </main>

      </div>

  );
}
