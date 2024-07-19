import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setNodes, setEdges, addNode, addEdge, removeNode, removeEdge, setAddingEdge, setDeleteMode, dfsTraversal, bfsTraversal } from '../redux/graphSlice';
import styles from './Graph.module.css';
import Matrix from './Matrix';

const Graph: React.FC = () => {
    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.graph.nodes);
    const edges = useSelector((state: RootState) => state.graph.edges);
    const showMatrix = useSelector((state: RootState) => state.graph.showMatrix);
    const deleteMode = useSelector((state: RootState) => state.graph.deleteMode);
    const addingEdge = useSelector((state: RootState) => state.graph.addingEdge);
    const isDirected = useSelector((state: RootState) => state.graph.isDirected);
    const traversalResult = useSelector((state: RootState) => state.graph.traversalResult);
    const [edgeSource, setEdgeSource] = useState<string | null>(null);
    const [draggingNode, setDraggingNode] = useState<string | null>(null);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [tempEdge, setTempEdge] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as SVGElement;
            if (deleteMode) {
                if (target.tagName === 'circle') {
                    const nodeId = target.getAttribute('id');
                    if (nodeId) {
                        dispatch(removeNode(nodeId));
                    }
                } else if (target.tagName === 'line' || target.tagName === 'path') {
                    const edgeId = target.getAttribute('id');
                    if (edgeId) {
                        dispatch(removeEdge(edgeId));
                    }
                }
            } else if (addingEdge && target.tagName === 'circle') {
                const nodeId = target.getAttribute('id');
                const node = nodes.find(n => n.id === nodeId);
                if (nodeId && edgeSource) {
                    dispatch(addEdge({ source: edgeSource, target: nodeId, directed: isDirected }));
                    setEdgeSource(null);
                    setTempEdge(null);
                    dispatch(setAddingEdge(false));
                } else if (nodeId && node) {
                    setEdgeSource(nodeId);
                    setTempEdge({ x1: node.x, y1: node.y, x2: node.x, y2: node.y });
                }
            } else if (target.tagName === 'circle') {
                setDraggingNode(target.getAttribute('id'));
                setPosition({ x: event.clientX, y: event.clientY });
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (draggingNode) {
                const dx = event.clientX - position.x;
                const dy = event.clientY - position.y;
                dispatch(setNodes(nodes.map(node =>
                    node.id === draggingNode
                        ? { ...node, x: node.x + dx, y: node.y + dy }
                        : node
                )));
                setPosition({ x: event.clientX, y: event.clientY });
            }
            if (tempEdge) {
                setTempEdge({ ...tempEdge, x2: event.clientX, y2: event.clientY });
            }
        };

        const handleMouseUp = () => {
            setDraggingNode(null);
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [deleteMode, addingEdge, edgeSource, draggingNode, position, nodes, dispatch, isDirected, tempEdge]);

    const handleLineClick = (event: React.MouseEvent<SVGLineElement, MouseEvent>) => {
        if (deleteMode) {
            const edgeId = event.currentTarget.getAttribute('id');
            if (edgeId) {
                dispatch(removeEdge(edgeId));
            }
        }
    };

    const handleDFS = () => {
        dispatch(dfsTraversal());
    };

    const handleBFS = () => {
        dispatch(bfsTraversal());
    };

    return (
        <div className={styles.graphContainer}>
            <div className={styles.graph}>
                <svg width="2000" height="2000">
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L10,3 L0,6 z" fill="#00008B" />
                        </marker>
                    </defs>
                    {edges.map(edge => {
                        const sourceNode = nodes.find(node => node.id === edge.source);
                        const targetNode = nodes.find(node => node.id === edge.target);
                        if (!sourceNode || !targetNode) return null;
                        const isLoop = sourceNode.id === targetNode.id;
                        return (
                            <g key={edge.id}>
                                {isLoop ? (
                                    <path
                                        id={edge.id}
                                        d={`M ${sourceNode.x} ${sourceNode.y} C ${sourceNode.x - 20} ${sourceNode.y - 20}, ${sourceNode.x + 20} ${sourceNode.y - 20}, ${sourceNode.x} ${sourceNode.y}`}
                                        stroke="#00008B"
                                        fill="transparent"
                                        markerEnd={edge.directed ? "url(#arrow)" : ""}
                                        strokeWidth="2"
                                        onClick={handleLineClick}
                                    />
                                ) : (
                                    <line
                                        id={edge.id}
                                        x1={sourceNode.x}
                                        y1={sourceNode.y}
                                        x2={targetNode.x}
                                        y2={targetNode.y}
                                        stroke="#00008B"
                                        strokeWidth="2"
                                        markerEnd={edge.directed ? "url(#arrow)" : ""}
                                        onClick={handleLineClick}
                                    />
                                )}
                                <text
                                    x={(sourceNode.x + targetNode.x) / 2}
                                    y={(sourceNode.y + targetNode.y) / 2}
                                    fontSize="12"
                                    fill="black"
                                >
                                    {edge.label}
                                </text>
                            </g>
                        );
                    })}
                    {tempEdge && (
                        <line
                            x1={tempEdge.x1}
                            y1={tempEdge.y1}
                            x2={tempEdge.x2}
                            y2={tempEdge.y2}
                            stroke="red"
                            strokeDasharray="5,5"
                        />
                    )}
                    {nodes.map(node => (
                        <g key={node.id}>
                            <circle
                                id={node.id}
                                cx={node.x}
                                cy={node.y}
                                r={10}
                                fill="black"
                                onMouseDown={() => setDraggingNode(node.id)}
                            />
                            <text x={node.x + 12} y={node.y + 4} fontSize="12" fill="black">{node.label}</text>
                            <text x={node.x - 12} y={node.y + 20} fontSize="12" fill="red">d: {node.degree}</text>
                        </g>
                    ))}
                </svg>
            </div>
            {showMatrix && (
                <div className={styles.matrixContainer}>
                    <Matrix nodes={nodes} edges={edges} />
                </div>
            )}
            <div className={styles.traversalResult}>
                <h3>Результат обходу (DFS/BFS):</h3>
                <p>{traversalResult.join(' -> ')}</p>
            </div>
        </div>
    );
};

export default Graph;



































