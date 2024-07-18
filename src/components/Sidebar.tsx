import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, removeNode, removeEdge, setDeleteMode, setAddingEdge, setIsDirected } from '../redux/graphSlice';
import { RootState } from '../redux/store';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const [numNodes, setNumNodes] = useState<number>(0);
    const [nodeIdToRemove, setNodeIdToRemove] = useState<string>("");
    const [edgeLabelToRemove, setEdgeLabelToRemove] = useState<string>("");
    const isDirected = useSelector((state: RootState) => state.graph.isDirected);

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
        dispatch(setDeleteMode(true));
    };

    const handleToggleDirected = () => {
        dispatch(setIsDirected(!isDirected));
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
                    onChange={handleToggleDirected}
                />
                Орієнтоване
            </label>
            <button onClick={handleRemoveEdge}>Видалити ребро</button>
        </div>
    );
};

export default Sidebar;










































