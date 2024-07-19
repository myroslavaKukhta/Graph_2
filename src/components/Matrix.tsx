import React from 'react';
import styles from './Matrix.module.css';

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    degree: number;
}

interface Edge {
    id: string;
    label: string;
    source: string;
    target: string;
    directed: boolean;
}

interface MatrixProps {
    nodes: Node[];
    edges: Edge[];
}

const Matrix: React.FC<MatrixProps> = ({ nodes, edges }) => {
    const adjacencyMatrix = nodes.map(node => nodes.map(() => 0));

    edges.forEach(edge => {
        const sourceIndex = nodes.findIndex(node => node.id === edge.source);
        const targetIndex = nodes.findIndex(node => node.id === edge.target);
        if (sourceIndex !== -1 && targetIndex !== -1) {
            adjacencyMatrix[sourceIndex][targetIndex] = 1;
            if (!edge.directed) {
                adjacencyMatrix[targetIndex][sourceIndex] = 1;
            }
        }
    });

    return (
        <div className={styles.matrixContainer}>
            <table className={styles.matrixTable}>
                <thead>
                <tr>
                    <th></th>
                    {nodes.map(node => (
                        <th key={node.id}>{node.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {nodes.map((node, rowIndex) => (
                    <tr key={node.id}>
                        <th>{node.label}</th>
                        {nodes.map((_, colIndex) => (
                            <td key={colIndex}>{adjacencyMatrix[rowIndex][colIndex]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Matrix;










