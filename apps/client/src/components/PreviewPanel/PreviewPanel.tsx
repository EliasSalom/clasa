import {Circle, Layer, Rect, Stage} from "react-konva";

export const ClosetPlanner = () => {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Rect width={50} height={50} fill="red" />
                <Circle x={200} y={200} stroke="black" radius={50} />
            </Layer>
        </Stage>
    );
};
