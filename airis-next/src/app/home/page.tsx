"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface HistoryItem {
  id: number;
  title: string;
  code: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[] | null>(null);

  return (
    <div className="flex min-h-[90vh] justify-center">
      {/* History Section */}
      <div className={`history-section ${historyItems ? "w-1/4" : "w-full"} p-4 overflow-y-auto`}>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        {historyItems ? (
          <ul>
            {historyItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={selectedCode === item.code ? "white" : "outline"}
                  onClick={() => setSelectedCode(item.code)}
                  className={`w-full text-left p-2 mb-2`}
                >
                  {item.title}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-gray-400">
              Welcome to Airis dashboard. Your history section is empty. Let&apos;s get you started.
            </p>
            <div className="flex flex-col lg:flex-row gap-4 mt-6">
              {/* Prompt-Based Terraform */}
              <div
                className="flex-1 border border-gray-300 rounded p-4 cursor-pointer hover:bg-white hover:text-black"
                onClick={() => router.push("/home/prompt")}
              >
                <h3 className="text-lg font-bold mb-2">Prompt-Based Terraform</h3>
                <p className="text-gray-600">
                  Generate Terraform configurations easily by describing your requirements.
                </p>
              </div>

              {/* Graph-Based Terraform */}
              <div
                className="flex-1 border border-gray-300 rounded p-4 cursor-pointer hover:bg-white hover:text-black"
                onClick={() => router.push("/home/graph")}
              >
                <h3 className="text-lg font-bold mb-2">Graph-Based Terraform</h3>
                <p className="text-gray-600">
                  Create Terraform configurations with an intuitive graphical interface.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code Section */}
      {historyItems && (
        <div className="code-section w-3/4 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Terraform code</h2>
          <pre className="bg-[#212121] p-4 rounded h-full overflow-y-auto">
            {selectedCode ? selectedCode : "Select a history item to view the code."}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Page;
