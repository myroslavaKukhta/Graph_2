import React from 'react';
import styles from './Edge.module.css';

interface EdgeProps {
    index: number;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    directed: boolean;
    bend: number;
    onToggleDirection: () => void;
    onBend: (bend: number) => void;
    onClick: () => void;
    onDoubleClick: () => void;
}

const Edge: React.FC<EdgeProps> = ({
                                       index,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       directed,
                                       bend,
                                       onToggleDirection,
                                       onBend,
                                       onClick,
                                       onDoubleClick,
                                   }) => {
    const handleMouseDown = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        const dx = event.clientX - sourceX;
        const dy = event.clientY - sourceY;
        const newBend = Math.sqrt(dx * dx + dy * dy) / 2;
        onBend(newBend);
    };

    const midX = (sourceX + targetX) / 2 + bend;
    const midY = (sourceY + targetY) / 2 + bend;

    const isLoop = sourceX === targetX && sourceY === targetY;
    const loopRadius = 60;

    return (
        <g>
            {isLoop ? (
                <path
                    className={styles.edge}
                    d={`M ${sourceX} ${sourceY} C ${sourceX + loopRadius} ${sourceY - loopRadius}, ${sourceX - loopRadius} ${sourceY - loopRadius}, ${sourceX} ${sourceY}`}
                    stroke="#999"
                    strokeWidth={2}
                    fill="none"
                    markerEnd={directed ? 'url(#arrowhead)' : ''}
                    onMouseDown={handleMouseDown}
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                />
            ) : (
                <path
                    className={styles.edge}
                    d={`M ${sourceX},${sourceY} Q ${midX},${midY} ${targetX},${targetY}`}
                    stroke="#999"
                    strokeWidth={2}
                    fill="none"
                    markerEnd={directed ? 'url(#arrowhead)' : ''}
                    onMouseDown={handleMouseDown}
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                />
            )}
            <text x={midX} y={midY} fill="black" fontSize="12" cursor="pointer" onClick={onToggleDirection}>
                e{index + 1}
            </text>
        </g>
    );
};

export default Edge;




