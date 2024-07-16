import React, { useState, useEffect } from 'react';
import Node from './Node';
import Edge from './Edge';

interface NodeData {
    id: string;
    x: number;
    y: number;
}

interface EdgeData {
    source: string;
    target: string;
    directed: boolean;
    bend: number;
}

interface GraphProps {
    numNodes: number;
    showMatrix: boolean;
    edges: EdgeData[];
    isDirected: boolean;
    setEdges: React.Dispatch<React.SetStateAction<EdgeData[]>>;
    setSelectedNode: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedEdge: React.Dispatch<React.SetStateAction<number | null>>;
    nodes: NodeData[];
    setNodes: React.Dispatch<React.SetStateAction<NodeData[]>>;
}

const Graph: React.FC<GraphProps> = ({
                                         numNodes,
                                         showMatrix,
                                         edges,
                                         isDirected,
                                         setEdges,
                                         setSelectedNode,
                                         setSelectedEdge,
                                         nodes,
                                         setNodes,
                                     }) => {
    const [selectedStartNode, setSelectedStartNode] = useState<string | null>(null);
    const [drawingEdge, setDrawingEdge] = useState<{ x: number; y: number } | null>(null);
    const [deleteMode, setDeleteMode] = useState(false);

    useEffect(() => {
        const headerHeight = document.querySelector('.header')?.clientHeight || 60;
        const sidebarWidth = document.querySelector('.sidebar')?.clientWidth || window.innerWidth * 0.15;

        const availableWidth = window.innerWidth - sidebarWidth;
        const availableHeight = window.innerHeight - headerHeight;

        const newNodes: NodeData[] = [];
        for (let i = 0; i < numNodes; i++) {
            newNodes.push({
                id: `v${i + 1}`,
                x: Math.random() * (availableWidth - 40) + sidebarWidth + 20,
                y: Math.random() * (availableHeight - 40) + headerHeight + 20,
            });
        }
        setNodes(newNodes);
    }, [numNodes, setNodes]);

    const handleNodeClick = (id: string, x: number, y: number) => {
        if (selectedStartNode === null) {
            setSelectedStartNode(id);
            setDrawingEdge({ x, y });
        } else {
            if (id !== selectedStartNode) {
                setEdges([...edges, { source: selectedStartNode, target: id, directed: isDirected, bend: 0 }]);
                setSelectedStartNode(null);
                setDrawingEdge(null);
            } else {
                setSelectedStartNode(null);
                setDrawingEdge(null);
            }
        }
    };

    const handleNodeDrag = (id: string, x: number, y: number) => {
        setNodes(nodes.map(node => (node.id === id ? { ...node, x, y } : node)));
    };

    const handleNodeMouseDown = (id: string) => {
        setSelectedNode(id);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (drawingEdge) {
            const containerRect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - containerRect.left;
            const y = event.clientY - containerRect.top;
            setDrawingEdge({ x, y });
        }
    };

    const handleMouseUp = () => {
        setDrawingEdge(null);
    };

    const handleEdgeClick = (index: number) => {
        setSelectedEdge(index);
    };

    const handleEdgeDoubleClick = (index: number) => {
        if (deleteMode) {
            setEdges(edges.filter((_, i) => i !== index));
            setDeleteMode(false);
        }
    };

    const adjacencyMatrix = nodes.map(node => nodes.map(() => 0));
    const degrees = nodes.map(node => 0);
    edges.forEach(edge => {
        const sourceIndex = nodes.findIndex(node => node.id === edge.source);
        const targetIndex = nodes.findIndex(node => node.id === edge.target);
        adjacencyMatrix[sourceIndex][targetIndex] = 1;
        if (sourceIndex === targetIndex) {
            degrees[sourceIndex] += 2; // Петля додає два ступені
        } else {
            degrees[sourceIndex] += 1;
            degrees[targetIndex] += 1;
        }
    });

    const isGraphDirected = edges.some(edge => edge.directed);

    return (
        <div className="graph-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {edges.map((edge, index) => {
                const sourceNode = nodes.find(node => node.id === edge.source);
                const targetNode = nodes.find(node => node.id === edge.target);
                if (!sourceNode || !targetNode) return null;
                return (
                    <Edge
                        key={index}
                        index={index}
                        sourceX={sourceNode.x}
                        sourceY={sourceNode.y}
                        targetX={targetNode.x}
                        targetY={targetNode.y}
                        directed={edge.directed}
                        bend={edge.bend}
                        onToggleDirection={() => {}}
                        onBend={() => {}}
                        onClick={() => handleEdgeClick(index)}
                        onDoubleClick={() => handleEdgeDoubleClick(index)}
                    />
                );
            })}
            {nodes.map(node => (
                <Node
                    key={node.id}
                    id={node.id}
                    cx={node.x}
                    cy={node.y}
                    onMouseDown={() => handleNodeMouseDown(node.id)}
                    onClick={(x, y) => handleNodeClick(node.id, x, y)}
                    onDrag={handleNodeDrag}
                    degree={degrees[nodes.indexOf(node)]}
                />
            ))}
            {drawingEdge && selectedStartNode && (
                <svg>
                    <line
                        x1={nodes.find(node => node.id === selectedStartNode)!.x}
                        y1={nodes.find(node => node.id === selectedStartNode)!.y}
                        x2={drawingEdge.x}
                        y2={drawingEdge.y}
                        stroke="#999"
                        strokeWidth={2}
                        markerEnd={isGraphDirected ? "url(#arrowhead)" : ""}
                    />
                </svg>
            )}
            {showMatrix && (
                <div>
                    <h3>{isGraphDirected ? 'Орієнтований граф' : 'Неорієнтований граф'}</h3>
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            {nodes.map((node, index) => (
                                <th key={index}>{node.id}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {adjacencyMatrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <th>{nodes[rowIndex].id}</th>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Graph;























