import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Node {
    id: string;
    x: number;
    y: number;
}

interface Edge {
    source: string;
    target: string;
    directed: boolean;
}

interface GraphState {
    nodes: Node[];
    edges: Edge[];
    numNodes: number;
    graphName: string;
    isDirected: boolean;
    selectedNode: string | null;
    selectedEdge: number | null;
    showMatrix: boolean;
    sidebarOpen: boolean;
    history: any[];
    deleteMode: boolean;
}

const initialState: GraphState = {
    nodes: [],
    edges: [],
    numNodes: 0,
    graphName: '',
    isDirected: false,
    selectedNode: null,
    selectedEdge: null,
    showMatrix: false,
    sidebarOpen: true,
    history: [],
    deleteMode: false,
};

const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<Node>) => {
            state.nodes.push(action.payload);
        },
        addEdge: (state, action: PayloadAction<Edge>) => {
            state.edges.push(action.payload);
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
        setSelectedEdge: (state, action: PayloadAction<number | null>) => {
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
            state.nodes = state.nodes.filter(node => node.id !== action.payload);
            state.edges = state.edges.filter(edge => edge.source !== action.payload && edge.target !== action.payload);
        },
        removeEdge: (state, action: PayloadAction<number>) => {
            state.edges.splice(action.payload, 1);
        },
        createNewGraph: (state) => {
            state.nodes = [];
            state.edges = [];
            state.numNodes = 0;
            state.graphName = '';
            state.isDirected = false;
            state.selectedNode = null;
            state.selectedEdge = null;
            state.showMatrix = false;
            state.sidebarOpen = true;
            state.history = [];
            state.deleteMode = false;
        },
        resetGraph: (state) => {
            state.nodes = [];
            state.edges = [];
            state.selectedNode = null;
            state.selectedEdge = null;
            state.history = [];
            state.deleteMode = false;
            state.showMatrix = false;
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
} = graphSlice.actions;

export default graphSlice.reducer;



