import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from './store';
import { saveGraph as saveGraphAPI, loadGraph as loadGraphAPI } from '../services/api';

// Оголошення інтерфейсів
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
    traversalResult: string[];
    traversalOrder: string[]; // Додаємо для візуалізації
    currentTraversalIndex: number; // Індекс для візуалізації
    isVisualizing: boolean; // Флаг для візуалізації
}

// Початковий стан
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
    traversalResult: [],
    traversalOrder: [], // Початкове значення для візуалізації
    currentTraversalIndex: -1, // Початковий індекс візуалізації
    isVisualizing: false, // Початковий стан візуалізації
};

// Асинхронні дії для збереження та завантаження графу
export const saveGraphThunk = createAsyncThunk(
    'graph/saveGraph',
    async (graphData: GraphState, { rejectWithValue }) => {
        try {
            const response = await saveGraphAPI(graphData);
            return response;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const loadGraphThunk = createAsyncThunk(
    'graph/loadGraph',
    async (_, { rejectWithValue }) => {
        try {
            const response = await loadGraphAPI();
            return response;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Слайс для управління станом графу
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
            state.deleteMode = false;
        },
        removeEdge: (state, action: PayloadAction<string>) => {
            const edgeToRemove = state.edges.find(edge => edge.id === action.payload);
            if (edgeToRemove) {
                const sourceNode = state.nodes.find(node => node.id === edgeToRemove.source);
                const targetNode = state.nodes.find(node => node.id === edgeToRemove.target);
                if (sourceNode) sourceNode.degree -= 1;
                if (targetNode) targetNode.degree -= 1;
                state.edges = state.edges.filter(edge => edge.id !== action.payload);
            }
            state.deleteMode = false;
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
            state.traversalResult = [];
            state.traversalOrder = [];
            state.currentTraversalIndex = -1;
            state.isVisualizing = false;
        },
        resetGraph: (state) => {
            state.nodes = [];
            state.edges = [];
            state.numNodes = 0;
            state.numEdges = 0;
            state.selectedNode = null;
            state.selectedEdge = null;
            state.history = [];
            state.deleteMode = false;
            state.showMatrix = false;
            state.addingEdge = false;
            state.traversalResult = [];
            state.traversalOrder = [];
            state.currentTraversalIndex = -1;
            state.isVisualizing = false;
        },
        saveGraph: (state) => {
            console.log("Graph saved:", state);
        },
        loadGraph: (state) => {
            const graphData = localStorage.getItem('graphData');
            if (graphData) {
                const parsedData = JSON.parse(graphData);
                state.nodes = parsedData.nodes;
                state.edges = parsedData.edges;
                state.numNodes = parsedData.numNodes;
                state.numEdges = parsedData.numEdges;
                state.graphName = parsedData.graphName;
                state.isDirected = parsedData.isDirected;
            }
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
        dfsTraversal: (state) => {
            const visited: { [key: string]: boolean } = {};
            const result: string[] = [];

            const dfs = (nodeId: string) => {
                if (!visited[nodeId]) {
                    visited[nodeId] = true;
                    const node = state.nodes.find(n => n.id === nodeId);
                    if (node) {
                        result.push(node.label);
                    }
                    const neighbors = state.edges.reduce<string[]>((acc, edge) => {
                        if (edge.source === nodeId) acc.push(edge.target);
                        if (edge.target === nodeId && !edge.directed) acc.push(edge.source);
                        return acc;
                    }, []);
                    neighbors.forEach(neighbor => dfs(neighbor));
                }
            };

            if (state.nodes.length > 0) {
                dfs(state.nodes[0].id);
            }

            state.traversalResult = result;
            state.traversalOrder = result;
            state.currentTraversalIndex = 0;
            state.isVisualizing = true;
        },
        bfsTraversal: (state) => {
            const visited: { [key: string]: boolean } = {};
            const result: string[] = [];
            const queue: string[] = [];

            const bfs = (startNodeId: string) => {
                queue.push(startNodeId);
                visited[startNodeId] = true;

                while (queue.length > 0) {
                    const nodeId = queue.shift()!;
                    const node = state.nodes.find(n => n.id === nodeId);
                    if (node) {
                        result.push(node.label);
                    }
                    const neighbors = state.edges.reduce<string[]>((acc, edge) => {
                        if (edge.source === nodeId) acc.push(edge.target);
                        if (edge.target === nodeId && !edge.directed) acc.push(edge.source);
                        return acc;
                    }, []);
                    neighbors.forEach(neighbor => {
                        if (!visited[neighbor]) {
                            queue.push(neighbor);
                            visited[neighbor] = true;
                        }
                    });
                }
            };

            if (state.nodes.length > 0) {
                bfs(state.nodes[0].id);
            }

            state.traversalResult = result;
            state.traversalOrder = result;
            state.currentTraversalIndex = 0;
            state.isVisualizing = true;
        },
        updateTraversalVisualization: (state) => {
            if (state.currentTraversalIndex < state.traversalOrder.length - 1) {
                state.currentTraversalIndex += 1;
            } else {
                state.isVisualizing = false;
            }
        },
        resetTraversalVisualization: (state) => {
            state.traversalOrder = [];
            state.currentTraversalIndex = -1;
            state.isVisualizing = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveGraphThunk.fulfilled, (state, action) => {
                console.log('Graph saved to server:', action.payload);
            })
            .addCase(saveGraphThunk.rejected, (state, action) => {
                console.error('Failed to save graph to server:', action.payload);
            })
            .addCase(loadGraphThunk.fulfilled, (state, action) => {
                const { nodes, edges, numNodes, numEdges, graphName, isDirected } = action.payload;
                state.nodes = nodes;
                state.edges = edges;
                state.numNodes = numNodes;
                state.numEdges = numEdges;
                state.graphName = graphName;
                state.isDirected = isDirected;
            })
            .addCase(loadGraphThunk.rejected, (state, action) => {
                console.error('Failed to load graph from server:', action.payload);
            });
    }
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
    loadGraph,
    toggleShowMatrix,
    toggleSidebar,
    toggleDeleteMode,
    setAddingEdge,
    dfsTraversal,
    bfsTraversal,
    updateTraversalVisualization,
    resetTraversalVisualization,
} = graphSlice.actions;

export default graphSlice.reducer;
