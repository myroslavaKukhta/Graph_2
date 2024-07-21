import React from 'react';
import { useDispatch } from 'react-redux';
import {
    setGraphName,
    resetGraph,
    toggleShowMatrix,
    toggleSidebar,
    saveGraph,
    loadGraph,
    createNewGraph,
} from '../redux/graphSlice';
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

    const handleLoadGraph = () => {
        dispatch(loadGraph());
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
            />
            <button onClick={handleCreateNewGraph}>Новий граф</button>
            <button onClick={handleResetGraph}>Скинути граф</button>
            <button onClick={handleSaveGraph}>Зберегти граф</button>
            <button onClick={handleLoadGraph}>Завантажити граф</button>
            <button onClick={handleToggleShowMatrix}>Показати матрицю</button>
            <button onClick={handleToggleSidebar}>Меню</button>
        </div>
    );
};

export default Header;





















