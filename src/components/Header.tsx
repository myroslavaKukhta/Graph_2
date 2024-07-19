import React from 'react';
import { useDispatch } from 'react-redux';
import { setGraphName, resetGraph, toggleShowMatrix, toggleSidebar, saveGraph, createNewGraph } from '../redux/graphSlice';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const dispatch = useDispatch();

    const handleCreateNewGraph = () => {
        dispatch(createNewGraph());
    };

    const handleResetGraph = () => {
        dispatch(resetGraph());
    };

    const handleSaveGraph = () => {
        dispatch(saveGraph());
    };

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleToggleShowMatrix = () => {
        dispatch(toggleShowMatrix());
    };

    return (
        <div className={styles.header}>
            <input
                type="text"
                placeholder="Назва графа"
                onChange={(e) => dispatch(setGraphName(e.target.value))}
                className={styles.input}
            />
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={handleCreateNewGraph}>Новий граф</button>
                <button className={styles.button} onClick={handleResetGraph}>Скинути граф</button>
                <button className={styles.button} onClick={handleSaveGraph}>Зберегти граф</button>
                <button className={styles.button} onClick={handleToggleShowMatrix}>Показати матрицю</button>
                <button className={styles.burgerButton} onClick={handleToggleSidebar}>
                    <span className={styles.burgerIcon}></span>
                    <span className={styles.burgerIcon}></span>
                    <span className={styles.burgerIcon}></span>
                </button>
            </div>
        </div>
    );
};

export default Header;



















