import React, {useEffect, useRef, useState} from "react";
import {inject, observer, Provider} from "mobx-react";
import {Layer, Stage} from "react-konva";

import Section from "./Section";
import Sash from "./Sash";
import Metrics from "./Metrics";
import Store from "../../store/store.ts";
import {KonvaEventObject} from "konva/lib/Node";

interface RootFrameProps {
    store: typeof Store;
}

const RootFrame: React.FC<RootFrameProps> = ({ store }) => {
    const [width, setWidth] = useState(100);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const stageRef = useRef<any>(null); // Adjust this type based on your actual Konva ref type

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
    }, []);

    const handleClick = (e: KonvaEventObject<MouseEvent>) => {
        if (e.target.nodeType === "Stage") {
            store.selectedSectionId = null;
        }
    };

    const padding = 150;
    const { root } = store;
    const scale = (width - padding * 2) / root.width;
    const height = padding * 2 + root.height * scale;

    return (
        <div ref={containerRef}>
            <Stage
                width={width}
                height={height}
                ref={stageRef}
                onClick={handleClick}
            >
                <Provider store={window.store}>
                    <Layer scaleX={scale} scaleY={scale} y={20} x={20}>
                        <Section
                            section={root.sections[0]}
                            x={root.frameSize}
                            y={root.frameSize}
                        />
                        <Sash
                            width={root.width}
                            height={root.height}
                            size={root.frameSize}
                        />
                        <Metrics store={store} />
                    </Layer>
                </Provider>
            </Stage>
        </div>
    );
};

export default inject("store")(observer(RootFrame));