// src/components/SectionInner.tsx
import React from 'react';
import {Group, Rect} from 'react-konva';
import {inject, observer} from 'mobx-react';

import Sash from './Sash';
import Glass from './Glass';
import OpeningDirection from './OpeningDirection';
import Handle from './Handle';
import Devider from './Devider';

interface SectionInnerProps {
    section: {
        id: string;
        width: number;
        height: number;
        frameSize: number;
        splitDirection?: 'vertical' | 'horizontal';
        nodeType: string;
        sections: any[];
        type: string;
    };
    x: number;
    y: number;
    store?: {
        selectedSection: any;
        selectedSectionId: string | null;
    };
}

const SectionInner: React.FC<SectionInnerProps> = ({ section, x, y, store }) => {
    const handleClick = (e: any) => {
        const firstSection = e.target.findAncestor('.section');
        if (firstSection === groupRef.current) {
            store?.selectedSectionId = section.id;
        }
    };

    const isSelected = store?.selectedSection === section;

    const childSections: JSX.Element[] = [];
    let offsetX = 0;
    let offsetY = 0;
    for (const child of section.sections) {
        if (child.nodeType === 'section') {
            childSections.push(<Section section={child} x={offsetX} y={offsetY} />);
        } else {
            childSections.push(
                <Devider width={child.width} height={child.height} x={offsetX} y={offsetY} />
            );
        }

        if (section.splitDirection === 'vertical') {
            offsetX += child.width;
        } else {
            offsetY += child.height;
        }
    }

    const groupRef = React.useRef<any>(null);

    return (
        <Group
            x={x}
            y={y}
            onClick={handleClick}
            ref={groupRef}
            name="section"
        >
            <Glass width={section.width} height={section.height} padding={section.frameSize} />
            <OpeningDirection
                width={section.width}
                height={section.height}
                padding={section.frameSize}
                type={section.type}
            />
            <Sash width={section.width} height={section.height} size={section.frameSize} />
            <Handle
                width={section.width}
                height={section.height}
                padding={section.frameSize}
                type={section.type}
            />
            {isSelected && (
                <Rect width={section.width} height={section.height} fill="green" opacity={0.3} />
            )}
            {childSections}
        </Group>
    );
};

const Section = inject('store')(observer(SectionInner));

export default Section;