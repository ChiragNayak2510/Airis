import React from 'react';
import Home from '../components/Home';
import Toggle from '../components/Toggle';
const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Toggle/>
      <Home />
    </div>
  );
}

export default Page;
