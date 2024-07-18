import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setNodes, setEdges, addNode, addEdge, removeNode, removeEdge } from '../redux/graphSlice';
import styles from './Graph.module.css';
import Matrix from './Matrix';

const Graph: React.FC = () => {
    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.graph.nodes);
    const edges = useSelector((state: RootState) => state.graph.edges);
    const showMatrix = useSelector((state: RootState) => state.graph.showMatrix);
    const deleteMode = useSelector((state: RootState) => state.graph.deleteMode);
    const addingEdge = useSelector((state: RootState) => state.graph.addingEdge);
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
                } else if (target.tagName === 'line') {
                    const edgeId = target.getAttribute('id');
                    if (edgeId) {
                        dispatch(removeEdge(edgeId));
                    }
                }
            } else if (addingEdge && target.tagName === 'circle') {
                const nodeId = target.getAttribute('id');
                const node = nodes.find(n => n.id === nodeId);
                if (nodeId && edgeSource) {
                    dispatch(addEdge({ source: edgeSource, target: nodeId, directed: false }));
                    setEdgeSource(null);
                    setTempEdge(null);
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
    }, [deleteMode, addingEdge, edgeSource, draggingNode, position, nodes, dispatch, tempEdge]);

    return (
        <div className={styles.graphContainer}>
            <svg className={styles.graph}>
                {edges.map(edge => {
                    const sourceNode = nodes.find(node => node.id === edge.source);
                    const targetNode = nodes.find(node => node.id === edge.target);
                    if (!sourceNode || !targetNode) return null;
                    return (
                        <g key={edge.id}>
                            <line
                                id={edge.id}
                                x1={sourceNode.x}
                                y1={sourceNode.y}
                                x2={targetNode.x}
                                y2={targetNode.y}
                                stroke="black"
                                markerEnd={edge.directed ? "url(#arrow)" : ""}
                            />
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
                        />
                        <text x={node.x + 12} y={node.y + 4} fontSize="12" fill="black">{node.label}</text>
                        <text x={node.x - 12} y={node.y + 20} fontSize="12" fill="red">d: {node.degree}</text>
                    </g>
                ))}
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#000" />
                    </marker>
                </defs>
            </svg>
            {showMatrix && (
                <div className={styles.matrixContainer}>
                    <Matrix nodes={nodes} edges={edges} />
                </div>
            )}
        </div>
    );
};

export default Graph;






















