import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setGraphName,
    createNewGraph,
    resetGraph,
    saveGraph,
    toggleSidebar,
    toggleShowMatrix,
} from '../redux/graphSlice';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const graphName = useSelector((state: RootState) => state.graph.graphName);

    return (
        <div className={styles.header}>
            <div className={styles['header-controls']}>
                <input
                    type="text"
                    value={graphName}
                    onChange={(e) => dispatch(setGraphName(e.target.value))}
                    placeholder="Назва графа"
                />
                <button onClick={() => dispatch(createNewGraph())}>Новий граф</button>
                <button onClick={() => dispatch(resetGraph())}>Скинути граф</button>
                <button onClick={() => dispatch(saveGraph())}>Зберегти граф</button>
                <button onClick={() => dispatch(toggleShowMatrix())}>Показати матрицю</button>
                <button onClick={() => dispatch(toggleSidebar())}>Меню</button>
            </div>
        </div>
    );
};

export default Header;







