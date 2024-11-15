'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Edge,
  NodeProps,
} from 'react-flow-renderer';
import { ButtonEdge } from '../../components/button-edge';
import { Handle, Position } from 'react-flow-renderer';

const awsIcons = [
  { id: '1', label: 'EC2', x: 100, y: 100, image: '/images/EC2.svg' },
  { id: '2', label: 'DynamoDB', x: 300, y: 100, image: '/images/DynamoDB.svg' },
  { id: '3', label: 'Load Balancer', x: 500, y: 100, image: '/images/Elastic Load Balancing.svg' },
];

const AWSIconNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="draggable p-2 flex flex-col justify-center items-center gap-2 relative bg-gray-800 rounded-lg">
      <Handle type="target" position={Position.Left} />
      <img src={data.image} alt={`${data.label} icon`} className="w-16 h-16" />
      <span className="text-white">{data.label}</span>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

const nodeTypes = {
  awsIconNode: AWSIconNode,
};

const edgeTypes = {
  buttonEdge: ButtonEdge,
};

const GraphPage: React.FC = () => {
  const [nodes, setNodes] = useState(
    awsIcons.map((icon) => ({
      id: icon.id,
      type: 'awsIconNode',
      data: { label: icon.label, image: icon.image },
      position: { x: icon.x, y: icon.y },
    }))
  );

  const [edges, setEdges] = useState<Edge[]>([
    {
      id: '1-2',
      source: '1',
      target: '2',
      type: 'default',
    },
  ]);

  // Node and Edge Change Handlers
  const onNodesChange = useCallback(
    (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes:any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className="h-[100vh] w-[100vw]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          style={{ backgroundColor: '#212121' }}
        >
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GraphPage;
