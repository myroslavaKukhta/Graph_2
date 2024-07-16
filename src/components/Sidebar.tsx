import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setNumNodes,
    addNode,
    removeNode,
    addEdge,
    removeEdge,
    toggleDeleteMode,
    setNodes,
} from '../redux/graphSlice';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const numNodes = useSelector((state: RootState) => state.graph.numNodes);
    const nodes = useSelector((state: RootState) => state.graph.nodes);
    const deleteMode = useSelector((state: RootState) => state.graph.deleteMode);

    useEffect(() => {
        const newNodes = [];
        for (let i = 0; i < numNodes; i++) {
            newNodes.push({ id: `v_${i + 1}`, x: Math.random() * 400, y: Math.random() * 400 });
        }
        dispatch(setNodes(newNodes));
    }, [numNodes, dispatch]);

    const handleAddNode = () => {
        const newNode = { id: `v_${nodes.length + 1}`, x: Math.random() * 400, y: Math.random() * 400 };
        dispatch(addNode(newNode));
    };

    const handleRemoveNode = () => {
        if (nodes.length > 0) {
            dispatch(removeNode(nodes[nodes.length - 1].id));
        }
    };

    const handleAddEdge = () => {
        if (nodes.length > 1) {
            const source = nodes[0].id;
            const target = nodes[1].id;
            dispatch(addEdge({ source, target, directed: false }));
        }
    };

    const handleRemoveEdge = () => {
        if (nodes.length > 1) {
            dispatch(removeEdge(nodes.length - 1));
        }
    };

    return (
        <div className={styles.sidebar}>
            <label>
                Кількість вершин:
                <input
                    type="number"
                    value={numNodes}
                    onChange={(e) => dispatch(setNumNodes(Number(e.target.value)))}
                />
            </label>
            <button onClick={handleAddNode}>Додати вершину</button>
            <button onClick={handleRemoveNode}>Видалити вершину</button>
            <button onClick={handleAddEdge}>Додати ребро</button>
            <button onClick={handleRemoveEdge}>Видалити ребро</button>
            <button onClick={() => dispatch(toggleDeleteMode())}>
                {deleteMode ? 'Режим перегляду' : 'Режим видалення'}
            </button>
        </div>
    );
};

export default Sidebar;













