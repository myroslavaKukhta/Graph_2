import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNode, removeNode, removeEdge, setDeleteMode, setAddingEdge } from '../redux/graphSlice';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const [numNodes, setNumNodes] = useState<number>(0);
    const [nodeIdToRemove, setNodeIdToRemove] = useState<string>("");
    const [edgeLabelToRemove, setEdgeLabelToRemove] = useState<string>("");
    const [isDirected, setIsDirected] = useState<boolean>(false);

    const handleAddNodes = () => {
        for (let i = 0; i < numNodes; i++) {
            const x = Math.random() * 500;
            const y = Math.random() * 500;
            dispatch(addNode({ x, y }));
        }
    };

    const handleRemoveNode = () => {
        if (nodeIdToRemove) {
            dispatch(removeNode(nodeIdToRemove));
        }
    };

    const handleAddEdge = () => {
        dispatch(setAddingEdge(true));
    };

    const handleRemoveEdge = () => {
        if (edgeLabelToRemove) {
            dispatch(removeEdge(edgeLabelToRemove));
        }
    };

    const handleToggleDeleteMode = () => {
        dispatch(setDeleteMode(true));
    };

    return (
        <div className={styles.sidebar}>
            <input
                type="number"
                value={numNodes}
                onChange={(e) => setNumNodes(Number(e.target.value))}
                placeholder="Кількість вершин"
                min="0"
            />
            <button onClick={handleAddNodes}>Додати вершини</button>
            <input
                type="text"
                value={nodeIdToRemove}
                onChange={(e) => setNodeIdToRemove(e.target.value)}
                placeholder="Вершина для видалення"
            />
            <button onClick={handleRemoveNode}>Видалити вершину</button>
            <button onClick={handleAddEdge}>Додати ребро</button>
            <input
                type="text"
                value={edgeLabelToRemove}
                onChange={(e) => setEdgeLabelToRemove(e.target.value)}
                placeholder="Назва ребра для видалення"
            />
            <label>
                <input
                    type="checkbox"
                    checked={isDirected}
                    onChange={() => setIsDirected(!isDirected)}
                />
                Орієнтоване
            </label>
            <button onClick={handleRemoveEdge}>Видалити ребро</button>
        </div>
    );
};

export default Sidebar;





































