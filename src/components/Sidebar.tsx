import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    addNode,
    removeNode,
    addEdge,
    removeEdge,
    setDeleteMode,
    setAddingEdge,
    setIsDirected,
    dfsTraversal,
    bfsTraversal,
} from '../redux/graphSlice';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const [numNodes, setNumNodes] = useState<number>(0);
    const isDirected = useSelector((state: RootState) => state.graph.isDirected);
    const selectedEdge = useSelector((state: RootState) => state.graph.selectedEdge);

    const handleAddNodes = () => {
        if (numNodes > 0) {
            for (let i = 0; i < numNodes; i++) {
                const x = Math.random() * 500;
                const y = Math.random() * 500;
                dispatch(addNode({ x, y }));
            }
        } else {
            alert("Введіть коректну кількість вершин для додавання.");
        }
    };

    const handleRemoveNode = () => {
        dispatch(setDeleteMode(true));
    };

    const handleAddEdge = () => {
        dispatch(setAddingEdge(true));
    };

    const handleRemoveEdge = () => {
        if (selectedEdge) {
            dispatch(removeEdge(selectedEdge));
        } else {
            alert("Виберіть ребро для видалення.");
        }
    };

    const handleToggleDirected = () => {
        dispatch(setIsDirected(!isDirected));
    };

    const handleIncrementNodes = () => {
        setNumNodes((prevNumNodes) => prevNumNodes + 1);
    };

    const handleDecrementNodes = () => {
        setNumNodes((prevNumNodes) => Math.max(prevNumNodes - 1, 0));
    };

    const handleDFS = () => {
        dispatch(dfsTraversal());
    };

    const handleBFS = () => {
        dispatch(bfsTraversal());
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.nodeControl}>
                <button className={styles.controlButton} onClick={handleDecrementNodes}>-</button>
                <button className={styles.controlButton} onClick={handleIncrementNodes}>+</button>
                <input
                    type="number"
                    value={numNodes}
                    onChange={(e) => setNumNodes(Number(e.target.value))}
                    className={styles.input}
                    min="0"
                />

            </div>
            <button className={styles.button} onClick={handleAddNodes}>Додати вершини</button>
            <button className={styles.button} onClick={handleRemoveNode}>Видалити вершину</button>
            <button className={styles.button} onClick={handleAddEdge}>Додати ребро</button>
            <button className={styles.button} onClick={handleRemoveEdge}>Видалити ребро</button>
            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={isDirected}
                    onChange={handleToggleDirected}
                    className={styles.checkbox}
                />
                Орієнтоване ребро
            </label>
            <button className={styles.button} onClick={handleDFS}>DFS <br/>(пошук в глибину)</button>
            <button className={styles.button} onClick={handleBFS}>BFS <br/> (пошук в ширину) </button>
        </div>
    );
};

export default Sidebar;



























