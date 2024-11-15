'use client';

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Handle,
  Position,
  Node,
  Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import useGraphStore from '../../hooks/useGraphStore';

// Define types for AWS icon
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
    console.log(nodes)
    setIdStore(idStore + 1); 
  };

  const onDeleteNode = (id: string) => {
    console.log(id)
    console.log(nodes)
    console.log(edges)
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
      <div className="h-full w-16 bg-white flex flex-col">
        {awsIcons.map((icon) => (
          <button key={icon.id} onClick={() => addNode(icon)}>
            <img src={icon.image} alt={`${icon.label} icon`} />
          </button>
        ))}
      </div>

      <div className="h-[100vh] w-full">
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
      </div>
    </div>
  );
};

export default Graph;
