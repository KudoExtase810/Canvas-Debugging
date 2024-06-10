"use client";
import { useEffect } from "react";
import BrushCursor from "./BrushCursor";

import loadImageScaled from "@/utils/images/loadImageScaled";
import { usePlayground } from "@/hooks/usePlayground";

interface RetoucherProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    brushSize: number;
}

const Retoucher = ({ canvasRef, brushSize }: RetoucherProps) => {
    const { imageData, imageUrl } = usePlayground();

    useEffect(() => {
        async function load() {
            const canvas = canvasRef?.current;
            if ((!imageData && !imageUrl) || !canvas) return;

            loadImageScaled(imageData, imageUrl, canvas);
        }

        load();
        window.addEventListener("resize", load);

        return () => {
            window.removeEventListener("resize", load);
        };
    }, [imageData, imageUrl, canvasRef]);

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                className="cursor-none bg-repeat bg-[url(/images/transparent-background.jpg)] w-full"
            >
                You either have disabled JavaScript or your browser does not
                support the canvas element. Enable JavaScript or use a modern
                browser that supports HTML5 canvas to view this content.
            </canvas>
            <BrushCursor
                brushSize={brushSize}
                canvasElement={canvasRef?.current}
            />
        </div>
    );
};

export default Retoucher;
