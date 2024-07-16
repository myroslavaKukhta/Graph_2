import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Node from './Node';
import Edge from './Edge';
import { setNodes, setEdges } from '../redux/graphSlice';
import styles from './Graph.module.css';

const Graph: React.FC = () => {
    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.graph.nodes);
    const edges = useSelector((state: RootState) => state.graph.edges);

    useEffect(() => {
        // Initialize nodes and edges
        dispatch(setNodes([]));
        dispatch(setEdges([]));
    }, [dispatch]);

    const handleMouseMove = (e: React.MouseEvent) => {
        console.log("Mouse move:", e.clientX, e.clientY);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        console.log("Mouse up:", e.clientX, e.clientY);
    };

    return (
        <div className={styles.graphContainer} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <svg width="100%" height="100%">
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
                            bend={0}
                            onToggleDirection={() => {}}
                            onBend={() => {}}
                            onClick={() => {}}
                            onDoubleClick={() => {}}
                        />
                    );
                })}
                {nodes.map(node => (
                    <Node key={node.id} id={node.id} cx={node.x} cy={node.y} degree={0} onDrag={() => {}} onMouseDown={() => {}} onClick={() => {}} />
                ))}
            </svg>
        </div>
    );
};

export default Graph;












