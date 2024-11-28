"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edge } from "@xyflow/react";
import useUserStore from "@/hooks/useUserStore";

interface SavedItem {
  id: string;
  name: string;
  prompt: string;
  nodes?: Node[];
  edges?: Edge[];
  terraformCode: string;
}

async function fetchSavedItems(
  token: string,
  email: string,
  setSavedItems: React.Dispatch<React.SetStateAction<SavedItem[]>>
): Promise<void> {
  if (!token || !email) {
    console.error("Token and email are required to fetch saved items.");
    return;
  }

  try {
    const res = await fetch("https://airis-backend.onrender.com/getSaved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ email }),
    });

    const response = await res.json();

    if (!res.ok) {
      console.error(`Failed to fetch saved items: ${response.message}`);
      return;
    }

    const savedItemsResponse = response?.data?.saved || [];
    const savedItems: SavedItem[] = savedItemsResponse.map((item: any) => ({
      id: item._id || "",
      name: item.name || "",
      prompt: item.prompt || "",
      nodes: item.nodes || null,
      edges: item.edges || null,
      terraformCode: item.terraform || "Your terraform is missing.",
    }));
    setSavedItems(savedItems);
  } catch (error) {
    console.error("Error fetching saved items:", error);
  }
}

const Page: React.FC = () => {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user = useUserStore((state:any)=>(state.user))

  useEffect(() => {
    if (token && user) {
      fetchSavedItems(token, user.email, setSavedItems);
    } else {
      alert("You have logged out!");
      router.push("/");
    }
  }, []);

  const hasSavedItems = savedItems.length > 0;

  return (
    <div className="flex min-h-[90vh] justify-center">
      <div className={`history-section ${hasSavedItems ? "w-1/4" : "w-full"} p-4 overflow-y-auto`}>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        {hasSavedItems ? (
          <ul>
            {savedItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={selectedCode === item.terraformCode ? "white" : "outline"}
                  onClick={() => setSelectedCode(item.terraformCode)}
                  className="w-full text-left p-2 mb-2"
                >
                  {item.name}
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
              <div
                className="flex-1 border border-gray-300 rounded p-4 cursor-pointer hover:bg-white hover:text-black"
                onClick={() => router.push("/home/prompt")}
              >
                <h3 className="text-lg font-bold mb-2">Prompt-Based Terraform</h3>
                <p className="text-gray-600">
                  Generate Terraform configurations easily by describing your requirements.
                </p>
              </div>
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
      {hasSavedItems && (
        <div className="code-section w-3/4 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Terraform code</h2>
          <pre className="bg-[#212121] p-4 rounded h-full overflow-y-auto">
            {selectedCode ? selectedCode : "Select a saved item."}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Page;
