"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/CodeBlock";
import useUserStore from "@/hooks/useUserStore";
import { Edge } from "@xyflow/react";

interface SavedItem {
  id: string;
  name: string;
  prompt : string;
  nodes? : Node[];
  edges? : Edge[];
  terraformCode : string
}

const Page: React.FC = () => {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const savedItems = useUserStore((state: any) => state.savedItems);
  console.log(savedItems)
  return (
    <div className="flex min-h-[90vh] justify-center">
      <div className={`history-section ${savedItems ? "w-1/4" : "w-full"} p-4 overflow-y-auto`}>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        {savedItems ? (
          <ul>
            {savedItems.map((item : SavedItem) => (
              <li key={item.id}>
                <Button
                  variant={selectedCode === item.terraformCode ? "white" : "outline"}
                  onClick={() => setSelectedCode(item.terraformCode)}
                  className={`w-full text-left p-2 mb-2`}
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
                <h3 className="text-lg font-bold mb-2">Graph-Based Terraform</h3><div >
                <h2>How do I run my terraform file?</h2>
              </div>
                <p className="text-gray-600">
                  Create Terraform configurations with an intuitive graphical interface.
                </p>
              </div>
              
            </div>
            <div className="mt-5 ">
                <h2 className="text-xl font-bold mb-4">How do I run my terraform file?</h2>
                <p>In order to run the file make sure that you have terraform installed on you PC. <a className="text-blue-600" href="https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli" target = "_blank">(Installation guide)</a></p>
                <p>Once that is done you can easily create your cloud infra without clicking a button. Just run the following commands</p>
                <br />
                <h3 className="text-md font-bold mb-4">1. Initalize terraform</h3>
                <CodeBlock code="terraform init" />
                <br />
                <h3 className="text-md font-bold mb-4">2. Validate the terraform file</h3>
                <CodeBlock code="terraform validate" />
                <br />
                <h3 className="text-md font-bold mb-4">3. Run the terraform file</h3>
                <CodeBlock code="terraform apply" />
                <br />
                <h3 className="text-md font-bold mb-4">4. Delete the infra {'('}if you want to {')'}</h3>
                <CodeBlock code="terraform destroy" />
              </div>
          </div>
        )}
      </div>


      {savedItems && (
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
