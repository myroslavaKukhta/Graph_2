import React from 'react';

interface NodeProps {
    id: string;
    x: number;
    y: number;
    onClick: () => void;
}

export const Node: React.FC<NodeProps> = ({ id, x, y, onClick }) => {
    return (
        <g onClick={onClick}>
            <circle cx={x} cy={y} r={10} fill="black" />
            <text x={x + 15} y={y} fontSize="12" fill="black">{id}</text>
        </g>
    );
};









