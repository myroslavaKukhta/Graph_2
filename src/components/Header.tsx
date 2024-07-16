import React from 'react';

interface HeaderProps {
    graphName: string;
    setGraphName: (name: string) => void;
    createNewGraph: () => void;
    resetGraph: () => void;
    saveGraph: () => void;
    toggleSidebar: () => void;
    toggleShowMatrix: () => void;
    showMatrix: boolean;
}

const Header: React.FC<HeaderProps> = ({ graphName, setGraphName, createNewGraph, resetGraph, saveGraph, toggleSidebar, toggleShowMatrix, showMatrix }) => {
    return (
        <header className="header">
            <div className="header-controls">
                <label>
                    Назва графа:
                    <input type="text" value={graphName} onChange={(e) => setGraphName(e.target.value)} />
                </label>
                <button onClick={createNewGraph}>Новий граф</button>
                <button onClick={resetGraph}>Скинути граф</button>
                <button onClick={saveGraph}>Зберегти граф</button>
                <button onClick={toggleShowMatrix}>{showMatrix ? 'Сховати матрицю' : 'Показати матрицю'}</button>
                <button onClick={toggleSidebar}>☰</button>
            </div>
        </header>
    );
};

export default Header;


