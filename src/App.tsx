import React, { useState } from 'react';
import './App.css';
import Graph from './components/Graph';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

interface EdgeData {
    source: string;
    target: string;
    directed: boolean;
    bend: number;
}

interface NodeData {
    id: string;
    x: number;
    y: number;
}

const App: React.FC = () => {
    const [numNodes, setNumNodes] = useState(0);
    const [showMatrix, setShowMatrix] = useState(false);
    const [isDirected, setIsDirected] = useState(false);
    const [graphName, setGraphName] = useState('Монте-Крісто');
    const [edges, setEdges] = useState<EdgeData[]>([]);
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [selectedEdge, setSelectedEdge] = useState<number | null>(null);
    const [history, setHistory] = useState<EdgeData[][]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [deleteMode, setDeleteMode] = useState(false);

    const handleNumNodesChange = (num: number) => {
        setNumNodes(num);
        const newNodes: NodeData[] = [];
        for (let i = 0; i < num; i++) {
            newNodes.push({ id: `v${i + 1}`, x: Math.random() * 600 + 100, y: Math.random() * 400 + 100 });
        }
        setNodes(newNodes);
    };

    const addNode = () => {
        setNumNodes(numNodes + 1);
        const newNode = { id: `v${numNodes + 1}`, x: Math.random() * 600 + 100, y: Math.random() * 400 + 100 };
        setNodes([...nodes, newNode]);
    };

    const handleAddEdgeMode = () => {
        setSelectedNode(null);
        setDeleteMode(false);
    };

    const handleDeleteNode = () => {
        if (selectedNode !== null) {
            saveHistory();
            setEdges(edges.filter(edge => edge.source !== selectedNode && edge.target !== selectedNode));
            setNodes(nodes.filter(node => node.id !== selectedNode));
            setSelectedNode(null);
        }
    };

    const handleDeleteEdge = () => {
        if (selectedEdge !== null) {
            saveHistory();
            const newEdges = [...edges];
            newEdges.splice(selectedEdge, 1);
            setEdges(newEdges);
            setSelectedEdge(null);
            setDeleteMode(false);
        }
    };

    const handleSaveGraph = () => {
        const graphData = {
            numNodes,
            edges,
            graphName,
        };
        console.log('Graph saved:', graphData);
    };

    const createNewGraph = () => {
        setGraphName('');
        setNumNodes(0);
        setEdges([]);
        setNodes([]);
        setSelectedNode(null);
        setSelectedEdge(null);
    };

    const resetGraph = () => {
        setGraphName('Монте-Крісто');
        setNumNodes(0);
        setEdges([]);
        setNodes([]);
        setSelectedNode(null);
        setSelectedEdge(null);
    };

    const undoLastAction = () => {
        if (history.length > 0) {
            const lastState = history[history.length - 1];
            setEdges(lastState);
            setHistory(history.slice(0, -1));
        }
    };

    const saveHistory = () => {
        setHistory([...history, edges]);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleShowMatrix = () => {
        setShowMatrix(!showMatrix);
    };

    return (
        <div className="App">
            <Header
                graphName={graphName}
                setGraphName={setGraphName}
                createNewGraph={createNewGraph}
                resetGraph={resetGraph}
                saveGraph={handleSaveGraph}
                toggleSidebar={toggleSidebar}
                toggleShowMatrix={toggleShowMatrix}
                showMatrix={showMatrix}
            />
            {sidebarOpen && (
                <Sidebar
                    numNodes={numNodes}
                    setNumNodes={handleNumNodesChange}
                    isDirected={isDirected}
                    setIsDirected={setIsDirected}
                    addEdgeMode={handleAddEdgeMode}
                    addNode={addNode}
                    deleteNode={handleDeleteNode}
                    deleteEdge={handleDeleteEdge}
                    setDeleteMode={setDeleteMode}
                />
            )}
            <main>
                <Graph
                    numNodes={numNodes}
                    edges={edges}
                    setEdges={setEdges}
                    isDirected={isDirected}
                    showMatrix={showMatrix}
                    setSelectedNode={setSelectedNode}
                    setSelectedEdge={setSelectedEdge}
                    nodes={nodes}
                    setNodes={setNodes}
                />
            </main>
        </div>
    );
};

export default App;
















