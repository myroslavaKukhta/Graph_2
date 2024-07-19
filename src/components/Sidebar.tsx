import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, removeNode, removeEdge, setDeleteMode, setAddingEdge, setIsDirected } from '../redux/graphSlice';
import { RootState } from '../redux/store';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const [numNodes, setNumNodes] = useState<number>(0);
    const isDirected = useSelector((state: RootState) => state.graph.isDirected);

    const handleAddNodes = () => {
        for (let i = 0; i < numNodes; i++) {
            const x = Math.random() * 500;
            const y = Math.random() * 500;
            dispatch(addNode({ x, y }));
        }
    };

    const handleRemoveNode = () => {
        dispatch(setDeleteMode(true));
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

    const handleIncrementNodes = () => {
        setNumNodes(numNodes + 1);
    };

    const handleDecrementNodes = () => {
        if (numNodes > 0) {
            setNumNodes(numNodes - 1);
        }
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.nodeControl}>
                <button className={styles.controlButton} onClick={handleDecrementNodes}>-</button>
                <input
                    type="number"
                    value={numNodes}
                    onChange={(e) => setNumNodes(Number(e.target.value))}
                    className={styles.input}
                    min="0"
                />
                <button className={styles.controlButton} onClick={handleIncrementNodes}>+</button>
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
                Орієнтоване
            </label>
        </div>
    );
};

export default Sidebar;












































