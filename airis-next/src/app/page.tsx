import React from 'react';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Navbar from '@/components/Navbar';

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="main-container flex flex-col items-center justify-center">
        <Register />
        <Login />
        
      </div>
    </div>
  );
};

export default Page;
