import React from 'react';
import { Node, Edge } from '../redux/graphSlice';
import styles from './Matrix.module.css';

interface MatrixProps {
    nodes: Node[];
    edges: Edge[];
}

const Matrix: React.FC<MatrixProps> = ({ nodes, edges }) => {
    const nodeLabels = nodes.map(node => node.label);
    const nodeIds = nodes.map(node => node.id);
    const matrix: number[][] = Array(nodeIds.length).fill(0).map(() => Array(nodeIds.length).fill(0));

    edges.forEach(edge => {
        const sourceIndex = nodeIds.indexOf(edge.source);
        const targetIndex = nodeIds.indexOf(edge.target);
        if (sourceIndex !== -1 && targetIndex !== -1) {
            matrix[sourceIndex][targetIndex] = 1;
            if (!edge.directed) {
                matrix[targetIndex][sourceIndex] = 1;
            }
        }
    });

    return (
        <table className={styles.matrixTable}>
            <thead>
            <tr>
                <th></th>
                {nodeLabels.map(label => <th key={label}>{label}</th>)}
            </tr>
            </thead>
            <tbody>
            {matrix.map((row, rowIndex) => (
                <tr key={nodeLabels[rowIndex]}>
                    <th>{nodeLabels[rowIndex]}</th>
                    {row.map((cell, cellIndex) => (
                        <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Matrix;









