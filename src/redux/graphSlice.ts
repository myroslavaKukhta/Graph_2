import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    degree: number;
}

interface Edge {
    id: string;
    label: string;
    source: string;
    target: string;
    directed: boolean;
}

interface GraphState {
    nodes: Node[];
    edges: Edge[];
    numNodes: number;
    numEdges: number;
    graphName: string;
    isDirected: boolean;
    selectedNode: string | null;
    selectedEdge: string | null;
    showMatrix: boolean;
    sidebarOpen: boolean;
    history: any[];
    deleteMode: boolean;
    addingEdge: boolean;
}

const initialState: GraphState = {
    nodes: [],
    edges: [],
    numNodes: 0,
    numEdges: 0,
    graphName: '',
    isDirected: false,
    selectedNode: null,
    selectedEdge: null,
    showMatrix: false,
    sidebarOpen: true,
    history: [],
    deleteMode: false,
    addingEdge: false,
};

const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<Omit<Node, 'id' | 'label' | 'degree'>>) => {
            state.numNodes += 1;
            const newNode: Node = { ...action.payload, id: uuidv4(), label: `v${state.numNodes}`, degree: 0 };
            state.nodes.push(newNode);
        },
        addEdge: (state, action: PayloadAction<Omit<Edge, 'id' | 'label'>>) => {
            state.numEdges += 1;
            const newEdge: Edge = { ...action.payload, id: uuidv4(), label: `e${state.numEdges}` };
            const sourceNode = state.nodes.find(node => node.id === newEdge.source);
            const targetNode = state.nodes.find(node => node.id === newEdge.target);
            if (sourceNode) sourceNode.degree += 1;
            if (targetNode) targetNode.degree += 1;
            state.edges.push(newEdge);
        },
        setNodes: (state, action: PayloadAction<Node[]>) => {
            state.nodes = action.payload;
        },
        setEdges: (state, action: PayloadAction<Edge[]>) => {
            state.edges = action.payload;
        },
        setNumNodes: (state, action: PayloadAction<number>) => {
            state.numNodes = action.payload;
        },
        setGraphName: (state, action: PayloadAction<string>) => {
            state.graphName = action.payload;
        },
        setIsDirected: (state, action: PayloadAction<boolean>) => {
            state.isDirected = action.payload;
        },
        setSelectedNode: (state, action: PayloadAction<string | null>) => {
            state.selectedNode = action.payload;
        },
        setSelectedEdge: (state, action: PayloadAction<string | null>) => {
            state.selectedEdge = action.payload;
        },
        setShowMatrix: (state, action: PayloadAction<boolean>) => {
            state.showMatrix = action.payload;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        setHistory: (state, action: PayloadAction<any[]>) => {
            state.history = action.payload;
        },
        saveHistory: (state) => {
            state.history.push({
                nodes: [...state.nodes],
                edges: [...state.edges],
            });
        },
        undoLastAction: (state) => {
            if (state.history.length > 0) {
                const lastState = state.history.pop();
                state.nodes = lastState.nodes;
                state.edges = lastState.edges;
            }
        },
        setDeleteMode: (state, action: PayloadAction<boolean>) => {
            state.deleteMode = action.payload;
        },
        removeNode: (state, action: PayloadAction<string>) => {
            const nodeToRemove = state.nodes.find(node => node.id === action.payload);
            if (nodeToRemove) {
                state.edges = state.edges.filter(edge => {
                    if (edge.source === nodeToRemove.id || edge.target === nodeToRemove.id) {
                        const sourceNode = state.nodes.find(node => node.id === edge.source);
                        const targetNode = state.nodes.find(node => node.id === edge.target);
                        if (sourceNode) sourceNode.degree -= 1;
                        if (targetNode) targetNode.degree -= 1;
                        return false;
                    }
                    return true;
                });
                state.nodes = state.nodes.filter(node => node.id !== action.payload);
            }
        },
        removeEdge: (state, action: PayloadAction<string>) => {
            const edgeToRemove = state.edges.find(edge => edge.label === action.payload);
            if (edgeToRemove) {
                const sourceNode = state.nodes.find(node => node.id === edgeToRemove.source);
                const targetNode = state.nodes.find(node => node.id === edgeToRemove.target);
                if (sourceNode) sourceNode.degree -= 1;
                if (targetNode) targetNode.degree -= 1;
                state.edges = state.edges.filter(edge => edge.label !== action.payload);
            }
        },
        createNewGraph: (state) => {
            state.nodes = [];
            state.edges = [];
            state.numNodes = 0;
            state.numEdges = 0;
            state.graphName = '';
            state.isDirected = false;
            state.selectedNode = null;
            state.selectedEdge = null;
            state.showMatrix = false;
            state.sidebarOpen = true;
            state.history = [];
            state.deleteMode = false;
            state.addingEdge = false;
        },
        resetGraph: (state) => {
            state.nodes = [];
            state.edges = [];
            state.selectedNode = null;
            state.selectedEdge = null;
            state.history = [];
            state.deleteMode = false;
            state.showMatrix = false;
            state.addingEdge = false;
        },
        saveGraph: (state) => {
            console.log("Graph saved:", state);
        },
        toggleShowMatrix: (state) => {
            state.showMatrix = !state.showMatrix;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleDeleteMode: (state) => {
            state.deleteMode = !state.deleteMode;
        },
        setAddingEdge: (state, action: PayloadAction<boolean>) => {
            state.addingEdge = action.payload;
        },
    },
});

export const {
    addNode,
    addEdge,
    setNodes,
    setEdges,
    setNumNodes,
    setGraphName,
    setIsDirected,
    setSelectedNode,
    setSelectedEdge,
    setShowMatrix,
    setSidebarOpen,
    setHistory,
    saveHistory,
    undoLastAction,
    setDeleteMode,
    removeNode,
    removeEdge,
    createNewGraph,
    resetGraph,
    saveGraph,
    toggleShowMatrix,
    toggleSidebar,
    toggleDeleteMode,
    setAddingEdge,
} = graphSlice.actions;

export default graphSlice.reducer;





















