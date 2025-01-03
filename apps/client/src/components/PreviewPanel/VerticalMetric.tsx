// src/components/VerticalMetric.tsx
import React from 'react';
import {Arrow, Group, Label, Line, Tag, Text} from 'react-konva';

const METRIC_SIZE = 100;

interface VerticalMetricProps {
    x: number;
    y: number;
    height: number;
}

const VerticalMetric: React.FC<VerticalMetricProps> = ({ x, y, height }) => {
    return (
        <Group x={x} y={y}>
            <Arrow
                points={[METRIC_SIZE / 2, 0, METRIC_SIZE / 2, height]}
                stroke="black"
                fill="black"
                pointerAtBeginning
            />
            <Line points={[0, 0, METRIC_SIZE, 0]} stroke="black" />
            <Line points={[0, height, METRIC_SIZE, height]} stroke="black" />
            <Label x={METRIC_SIZE / 2 - 50} y={height / 2}>
                <Tag fill="white" stroke="black" />
                <Text text={`${height} mm`} />
            </Label>
        </Group>
    );
};

export default VerticalMetric;