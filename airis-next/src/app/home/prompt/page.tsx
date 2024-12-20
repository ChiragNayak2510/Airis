'use client';

import { Input } from '@/components/ui/input';
import useSaveModal from '@/hooks/useSaveModal';
import SaveModal from '@/components/SaveModal'; 
import { useToast } from '@/hooks/use-toast';
import React, { useState } from 'react';
import { FaArrowCircleUp, FaClipboard, FaSave } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from 'next/navigation';

const PromptPage = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState<string>(""); 
  let temp : string = ''
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onOpen } = useSaveModal(); 

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const convertTerraformToText = (terraformCode: string) => {
    return terraformCode.replace(/\\n/g, '\n').replace(/\\"/g, '"');
  };

  const { toast } = useToast();
  const router = useRouter();
  const handleGenerateCode = async () => {
    setCode(""); 
    if (!prompt.trim()) {
      alert('Invalid prompt');
      setCode("");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You have logged out!')
        router.push('/');
        return;
      }

      temp = prompt
      const response = await fetch('https://airis-backend.onrender.com/fromPrompt', {
        method: 'POST',
        headers: {
          'token': token, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = await response.json();
      const formattedCode = convertTerraformToText(data.terraform);
      setCode(formattedCode);
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong while generating the code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 gap-4">
      <SaveModal prompt={prompt} terraform={code} />
      <div className="relative w-full max-w-2xl bg-[#212121] p-4 rounded overflow-y-auto flex-1">
        {code ? (
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => {
                if (code) {
                  navigator.clipboard.writeText(code).then(
                    () => toast({ description: 'Code copied to clipboard!' }),
                    (err) => console.error('Could not copy text: ', err)
                  );
                }
              }}
              className="bg-black p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 z-10"
              aria-label="Copy to clipboard"
            >
              <FaClipboard size={20} />
            </button>
            <button
              onClick={onOpen} 
              className="bg-black p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 z-10"
              aria-label="Save code"
            >
              <FaSave size={20} />
            </button>
          </div>
        ) : null}
        {!code ? (
          <div className="flex items-center justify-center min-h-screen text-gray-300">
            {isLoading ? (
              <HashLoader color="white" />
            ) : (
              <p>Please enter your prompt below. Try and be specific about your architecture.</p>
            )}
          </div>
        ) : (
          <pre className="p-4 rounded h-full text-gray-100 whitespace-pre-wrap">
            {code}
          </pre>
        )}
      </div>

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
          className="text-gray-300 hover:text-white"
        >
          <FaArrowCircleUp size={32} />
        </button>
      </div>
    </div>
  );
};

export default PromptPage;
