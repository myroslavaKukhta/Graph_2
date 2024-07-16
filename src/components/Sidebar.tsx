import React from 'react';

interface SidebarProps {
    numNodes: number;
    setNumNodes: (num: number) => void;
    isDirected: boolean;
    setIsDirected: (directed: boolean) => void;
    addEdgeMode: () => void;
    addNode: () => void;
    deleteNode: () => void;
    deleteEdge: () => void;
    setDeleteMode: (mode: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             numNodes,
                                             setNumNodes,
                                             isDirected,
                                             setIsDirected,
                                             addEdgeMode,
                                             addNode,
                                             deleteNode,
                                             deleteEdge,
                                             setDeleteMode
                                         }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-controls">
                <label>
                    Кількість вершин:
                    <input type="number" value={numNodes} onChange={(e) => setNumNodes(Number(e.target.value))} />
                </label>
                <label>
                    Спрямоване:
                    <input type="checkbox" checked={isDirected} onChange={() => setIsDirected(!isDirected)} />
                </label>
                <button onClick={addEdgeMode}>Додати ребро</button>
                <button onClick={addNode}>Додати вершину</button>
                <button onClick={deleteNode}>Видалити вершину</button>
                <button onClick={() => setDeleteMode(true)}>Видалити ребро</button>
            </div>
        </aside>
    );
};

export default Sidebar;


