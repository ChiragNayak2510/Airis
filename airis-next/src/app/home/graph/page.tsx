'use client';

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Handle,
  Position,
  Edge,
} from '@xyflow/react';
import { FaArrowRight, FaClipboard } from "react-icons/fa6";
import '@xyflow/react/dist/style.css';
import useGraphStore from '@/hooks/useGraphStore';
import CodeModal from '@/components/CodeModal'; 
import HashLoader from "react-spinners/HashLoader";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { FaSave } from 'react-icons/fa';
import useSaveModal from '@/hooks/useSaveModal';
import SaveModal from '@/components/SaveModal';


type AwsIcon = {
  id: string;
  label: string;
  image: string;
};

const awsIcons: AwsIcon[] = [
  { id: 'ec2', label: 'EC2', image: '/images/EC2.svg' },
  { id: 'dynamodb', label: 'DynamoDB', image: '/images/DynamoDB.svg' },
  { id: 'elb', label: 'Load Balancer', image: '/images/Elastic Load Balancing.svg' },
  { id: 's3', label: 'S3', image: '/images/Simple Storage Service.svg' },
];

const AWSIconNode: React.FC<{ data: AwsIcon & { id: string; onDelete: (id: string) => void } }> = ({ data }) => (
  <div className="relative p-2 flex flex-col justify-center items-center gap-2 bg-gray-800 rounded-lg">
    <button
      className="absolute flex items-center justify-center top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
      onClick={() => data.onDelete(data.id)}
    >
      <p>✕</p>
    </button>
    <Handle type="target" position={Position.Left} />
    <img src={data.image} alt={`${data.label} icon`} className="w-16 h-16" />
    <span className="text-white">{data.label}</span>
    <Handle type="source" position={Position.Right} />
  </div>
);

const nodeTypes = {
  awsIconNode: AWSIconNode,
};

const Graph: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
  } = useGraphStore();

  const [idStore, setIdStore] = useState<number>(0);
  const [terraformCode, setTerraformCode] = useState<string>('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onOpen } = useSaveModal();
  const router = useRouter()
  const addNode = (icon: AwsIcon) => {
    setNodes([
      ...nodes,
      {
        id: String(idStore),
        type: 'awsIconNode',
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: {
          id: String(idStore),
          label: icon.label,
          image: icon.image,
          onDelete: onDeleteNode,
        },
      },
    ]);
    setIdStore(idStore + 1);
  };

  const { toast } = useToast()
  const convertTerraformToText = (terraformCode: string) => {
    return terraformCode.replace(/\\n/g, '\n').replace(/\\"/g, '"');
  };

  const handleGraph = async () => {
    setIsLoading(true); 
    setIsCodeModalOpen(true); 
    setTerraformCode('')
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('You have logged out!')
        router.push('/')
        return;
      }
  
      const response = await fetch('https://airis-backend.onrender.com/fromGraph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token, 
        },
        body: JSON.stringify({ nodes, edges }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const { data } = await response.json();
      const formattedCode = convertTerraformToText(data.terraform);
      setTerraformCode(formattedCode); 
    } catch (err) {
      console.error('Error:', err);
      alert(err);
    } finally {
      setIsLoading(false); 
    }
  };

  const onDeleteNode = (id: string) => {
    setNodes(nodes.filter((node) => node.id !== id));
    setEdges(edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation();
      setEdges(edges.filter((e) => e.id !== edge.id));
    },
    [edges, setEdges]
  );

  return (
    <div className="flex justify-center">
      <SaveModal prompt={''} terraformCode=''/>
      <div className="h-full w-16 flex flex-col">
        {awsIcons.map((icon) => (
          <button key={icon.id} onClick={() => addNode(icon)}>
            <img src={icon.image} alt={`${icon.label} icon`} />
          </button>
        ))}
      </div>

      <div className="h-[100vh] w-full relative">
        <button
          onClick={handleGraph}
          className="absolute top-4 right-4 z-20 bg-white text-black px-4 py-2 rounded-lg shadow-lg hover:bg-gray-300"
        >
          <FaArrowRight size={24} className="inline-block mr-2" />
          Generate
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          fitView
          style={{ backgroundColor: '#212121' }}
        >
          <Background color="#aaa" gap={16} />
        </ReactFlow>

        <CodeModal
        title={
          isLoading ? "Generating terraform code..." : "Terraform code"
        }
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        bodyContent={
          isLoading ? (
            <div className="flex justify-center items-center h-64">
              <HashLoader color="white" />
            </div>
          ) : (
            <div className="relative">
              {terraformCode && (
                <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => {
                    if (terraformCode) {
                      navigator.clipboard.writeText(terraformCode).then(
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
              )}
              <pre className="bg-[#212121] text-white p-4 rounded overflow-auto whitespace-pre-wrap">
                {terraformCode}
              </pre>
            </div>
          )
  }
/>

      </div>
    </div>
  );
};

export default Graph;
