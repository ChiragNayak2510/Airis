import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, Node, Edge, NodeChange, EdgeChange, Connection } from '@xyflow/react';

// Define the Zustand store for managing graph state

const useGraphStore = create<{
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setNodes: (nodes) => set({ nodes }),

  setEdges: (edges) => set({ edges }),
}));

export default useGraphStore;
