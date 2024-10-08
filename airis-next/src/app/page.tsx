"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button'; // Adjust the import path as needed

interface HistoryItem {
  id: number;
  title: string;
  code: string;
}

const Page: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const historyItems: HistoryItem[] = [
    { id: 1, title: 'EC2', code: 'const x = 1;\nconsole.log(x);' },
    { id: 2, title: 'SQS', code: 'function greet() {\n  return "Hello, World!";\n}' },
    { id: 3, title: 'S3', code: 'let arr = [1, 2, 3];\narr.forEach(x => console.log(x));' },
  ];

  return (
    <div className="flex min-h-[90vh] justify-center ">
      {/* History Section */}
      <div className="history-section w-1/4 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">History</h2>
        <ul>
          {historyItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={selectedCode === item.code ? "white" : "outline"} // Change the variant based on selection
                onClick={() => setSelectedCode(item.code)}
                className={`w-full text-left p-2 mb-2`}
              >
                {item.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="code-section w-3/4 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Terraform code</h2>
        <pre className="bg-[#212121] p-4 rounded h-full overflow-y-auto">
          {selectedCode ? selectedCode : 'Select a history item to view the code.'}
        </pre>
      </div>
    </div>
  );
};

export default Page;
