// src/components/HorizontalMetric.tsx
import React from 'react';
import {Arrow, Group, Label, Line, Tag, Text} from 'react-konva';

const METRIC_SIZE = 100;

interface HorizontalMetricProps {
    x: number;
    y: number;
    width: number;
}

const HorizontalMetric: React.FC<HorizontalMetricProps> = ({ x, y, width }) => {
    return (
        <Group x={x} y={y}>
            <Arrow
                points={[0, METRIC_SIZE / 2, width, METRIC_SIZE / 2]}
                stroke="black"
                fill="black"
                pointerAtBeginning
            />
            <Line points={[0, 0, 0, METRIC_SIZE]} stroke="black" />
            <Line points={[width, 0, width, METRIC_SIZE]} stroke="black" />
            <Label x={width / 2} y={METRIC_SIZE / 2}>
                <Tag fill="white" stroke="black" />
                <Text text={`${width} mm`} padding={10} />
            </Label>
        </Group>
    );
};

export default HorizontalMetric;