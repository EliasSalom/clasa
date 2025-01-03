// src/components/Metrics.tsx
import React from 'react';
import {Group} from 'react-konva';
import {inject, observer} from 'mobx-react';
import VerticalMetric from './VerticalMetric';
import HorizontalMetric from './HorizontalMetric';
import Store from "../../store/store.ts";

interface MetricsProps {
    store: typeof Store;
}

const METRIC_SIZE = 100;

const Metrics: React.FC<MetricsProps> = ({ store }) => {
    const { width, height } = store.root;

    const verticalComponents: JSX.Element[] = [];
    const horizontalComponents: JSX.Element[] = [];

    const processSection = (
        sec: any, // Replace 'any' with your actual section type
        verticalPos: { x: number; y: number },
        horizontalPos: { x: number; y: number }
    ) => {
        verticalComponents.push(
            <VerticalMetric height={sec.height} x={verticalPos.x} y={verticalPos.y} />
        );
        horizontalComponents.push(
            <HorizontalMetric x={horizontalPos.x} y={horizontalPos.y} width={sec.width} />
        );

        const isVertical = sec.splitDirection === 'vertical';
        const isHorizontal = sec.splitDirection === 'horizontal';
        const hasSections = sec.sections.length > 0;

        let childOffset = 0;
        if (isHorizontal) {
            for (const child of sec.sections) {
                processSection(
                    child,
                    { x: verticalPos.x + METRIC_SIZE, y: verticalPos.y + childOffset },
                    horizontalPos
                );
                childOffset += child.height;
            }
        }
        if (isVertical) {
            for (const child of sec.sections) {
                processSection(
                    child,
                    verticalPos,
                    { x: horizontalPos.x + childOffset, y: horizontalPos.y + METRIC_SIZE }
                );
                childOffset += child.width;
            }
        }
        if (!isVertical && !isHorizontal && hasSections) {
            processSection(
                sec.sections[0],
                { x: verticalPos.x + METRIC_SIZE, y: verticalPos.y + sec.frameSize },
                { x: horizontalPos.x + sec.frameSize, y: horizontalPos.y + METRIC_SIZE }
            );
        }
    };

    processSection(store.root, { x: 0, y: 0 }, { x: 0, y: 0 });

    return (
        <Group>
            <Group x={width}>{verticalComponents}</Group>
            <Group y={height}>{horizontalComponents}</Group>
        </Group>
    );
};

export default inject('store')(observer(Metrics));