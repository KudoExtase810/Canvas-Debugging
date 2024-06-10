export type Endpoint = "Magic Eraser" | "Watermark Remover";

export type Point = {
    x: number;
    y: number;
};

export type Path = {
    points: Point[];
    brushSize: number;
};
