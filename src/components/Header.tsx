import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    setGraphName,
    resetGraph,
    toggleShowMatrix,
    toggleSidebar,
    createNewGraph,
    saveGraphThunk,
    loadGraphThunk,
} from '../redux/graphSlice';
import { RootState } from '../redux/store';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const graphState = useSelector((state: RootState) => state.graph);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        setMenuOpen(false);  // Закрити меню після навігації
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        handleNavigation('/login');
    };

    const handleCreateNewGraph = () => {
        dispatch(createNewGraph());
    };

    const handleResetGraph = () => {
        dispatch(resetGraph());
    };

    const handleSaveGraph = () => {
        dispatch(saveGraphThunk(graphState));
    };

    const handleLoadGraph = () => {
        dispatch(loadGraphThunk());
    };

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleToggleShowMatrix = () => {
        dispatch(toggleShowMatrix());
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
            <button onClick={toggleMenu} className={styles.burgerButton}>
                ☰ Меню
            </button>
            {menuOpen && (
                <div className={styles.burgerMenu}>
                    <button onClick={() => handleNavigation('/')}>Головна сторінка</button>
                    <button onClick={() => handleNavigation('/help')}>Інструкції</button>
                    <button onClick={() => handleNavigation('/settings')}>Налаштування</button>
                    <button onClick={() => handleNavigation('/about')}>Про нас</button>
                    <button onClick={handleLogout}>Вихід</button>
                </div>
            )}
        </div>
    );
};

export default Header;





























