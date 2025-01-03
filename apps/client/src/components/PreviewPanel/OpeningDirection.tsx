// src/components/OpeningDirection.tsx
import React from 'react';
import {Line} from 'react-konva';

interface OpeningDirectionProps {
    width: number;
    height: number;
    type: string;
    padding: number;
}

const OpeningDirection: React.FC<OpeningDirectionProps> = ({ width, height, type, padding }) => {
    if (type === 'none') {
        return null;
    }

    return (
        <>
            {type.includes('left') && (
                <Line
                    points={[padding, padding, width - padding, height / 2, 0, height]}
                    stroke="black"
                    strokeWidth={1}
                />
            )}
            {type.includes('right') && (
                <Line
                    points={[
                        width - padding,
                        padding,
                        padding,
                        height / 2,
                        width - padding,
                        height - padding,
                    ]}
                    stroke="black"
                    strokeWidth={1}
                />
            )}
            {type.includes('tilt') && (
                <Line
                    points={[
                        padding,
                        height - padding,
                        width / 2,
                        padding,
                        width - padding,
                        height - padding,
                    ]}
                    stroke="black"
                    strokeWidth={1}
                />
            )}
        </>
    );
};

export default OpeningDirection;