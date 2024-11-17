// app/prompt/page.tsx

'use client';

import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { FaArrowCircleUp } from "react-icons/fa";

const PromptPage = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState<string | null>(null);
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerateCode = () => {
    if (prompt.trim()) {
      setCode(`Generated code for: ${prompt}`);
    } else {
      setCode(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 gap-4">
      {/* Code Section */}
      <div className="w-full max-w-2xl bg-[#212121] p-4 rounded overflow-y-auto flex-1">
        <pre className="p-4 rounded h-full">
          {code ? code : 'Generated code will appear here.'}
        </pre>
      </div>

      {/* Prompt Input Section */}
      <div className="w-full max-w-2xl mb-4 flex gap-2">
      <Input
        type="text"
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter your prompt here..."
        className="min-w-56 p-2 bg-gray-800 outline-none border-white rounded-xl text-white placeholder-gray-400 flex-grow"
      />
      <button
        onClick={handleGenerateCode}
      >
        <FaArrowCircleUp size={32}/>
      </button>
    </div>
    </div>
  );
};

export default PromptPage;
