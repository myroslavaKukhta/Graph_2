import React from 'react';
import styles from './Node.module.css';

interface NodeProps {
    id: string;
    cx: number;
    cy: number;
    onDrag: (id: string, x: number, y: number) => void;
    onMouseDown: (id: string) => void;
    onClick: (x: number, y: number) => void;
    degree: number;
}

const Node: React.FC<NodeProps> = ({ id, cx, cy, onDrag, onMouseDown, onClick, degree }) => {
    const handleMouseDown = (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        onMouseDown(id);
    };

    const handleMouseMove = (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        if (event.buttons === 1) {
            const svgRect = (event.target as SVGCircleElement).ownerSVGElement!.getBoundingClientRect();
            const x = event.clientX - svgRect.left;
            const y = event.clientY - svgRect.top;
            onDrag(id, x, y);
        }
    };

    const handleClick = (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        const svgRect = (event.target as SVGCircleElement).ownerSVGElement!.getBoundingClientRect();
        const x = event.clientX - svgRect.left;
        const y = event.clientY - svgRect.top;
        onClick(x, y);
    };

    return (
        <>
            <circle
                className={styles.node}
                r={10}
                cx={cx}
                cy={cy}
                fill="#1f77b4"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
            />
            <text x={cx + 15} y={cy - 15} className={styles.text}>{id}</text>
            <text x={cx - 5} y={cy + 25} className={styles.text}>d: {degree}</text>
        </>
    );
};

export default Node;






