import React from 'react';

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
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onMouseDown(id);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.buttons === 1) {
            const containerRect = (event.target as HTMLDivElement).parentElement!.getBoundingClientRect();
            const x = event.clientX - containerRect.left;
            const y = event.clientY - containerRect.top;
            onDrag(id, x, y);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const containerRect = (event.target as HTMLDivElement).parentElement!.getBoundingClientRect();
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;
        onClick(x, y);
    };

    return (
        <div
            className="node"
            style={{
                left: cx - 10,
                top: cy - 10,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        >
            <div style={{ position: 'absolute', top: '25px', left: '-5px', color: 'black', fontSize: '12px' }}>d: {degree}</div>
            <div style={{ position: 'absolute', top: '-20px', left: '5px', color: 'black', fontSize: '12px' }}>{id}</div>
        </div>
    );
};

export default Node;


















