import { Path, Point } from "@/types";
import {
    downloadMaskedImage,
    getDataURL,
} from "@/utils/images/downloadMaskedImage";
import loadImageScaled from "@/utils/images/loadImageScaled";
import { useEffect, useState } from "react";

function useDrawWithHistory(
    imageData: string,
    imageUrl: string,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    brushSize: number
) {
    const [history, setHistory] = useState<Path[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [prevPosition, setPrevPosition] = useState<Point | null>(null);

    const undoable = currentStep > -1;
    const redoable = currentStep < history.length - 1;

    // Clear drawing history when a new image is loaded
    useEffect(() => {
        clearHistory();
    }, [imageData, imageUrl]);

    useEffect(() => {
        function handleResize() {
            clearHistory();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function startDrawing(event: MouseEvent | TouchEvent) {
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            let x: number, y: number;

            if (event instanceof MouseEvent) {
                x = event.clientX - rect.left;
                y = event.clientY - rect.top;
            } else if (event instanceof TouchEvent) {
                x = event.touches[0].clientX - rect.left;
                y = event.touches[0].clientY - rect.top;
            } else {
                return;
            }

            setPrevPosition({ x, y });
            setPoints((prevPoints) => [...prevPoints, { x, y }]);
            setIsDrawing(true);
        }

        function draw(event: MouseEvent | TouchEvent) {
            if (!isDrawing || !prevPosition || !canvas || !ctx) return;

            const rect = canvas.getBoundingClientRect();
            let x: number, y: number;
            if (event instanceof MouseEvent) {
                x = event.clientX - rect.left;
                y = event.clientY - rect.top;
            } else if (event instanceof TouchEvent) {
                x = event.touches[0].clientX - rect.left;
                y = event.touches[0].clientY - rect.top;
            } else {
                return;
            }

            ctx.strokeStyle = "white";
            ctx.lineJoin = "round";
            ctx.lineWidth = brushSize;

            ctx.beginPath();
            ctx.moveTo(prevPosition.x, prevPosition.y);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();

            setPrevPosition({ x, y });
            setPoints((prevPoints) => [...prevPoints, { x, y }]);
        }

        function endDrawing() {
            setIsDrawing(false);
            setPrevPosition(null);
            setHistory((oldHistory) => {
                const newHistory = [
                    ...oldHistory.slice(0, currentStep + 1),
                    { points, brushSize },
                ];
                return newHistory;
            });
            setCurrentStep(currentStep + 1);
            setPoints([]);
        }

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("touchstart", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("touchmove", draw);
        canvas.addEventListener("mouseup", endDrawing);
        canvas.addEventListener("touchend", endDrawing);
        canvas.addEventListener("touchcancel", endDrawing);

        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("touchstart", startDrawing);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("touchmove", draw);
            canvas.removeEventListener("mouseup", endDrawing);
            canvas.removeEventListener("touchend", endDrawing);
            canvas.removeEventListener("touchcancel", endDrawing);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasRef, isDrawing, prevPosition, brushSize, currentStep]);

    const undo = () => {
        if (undoable) {
            setCurrentStep(currentStep - 1);
            redrawHistory(currentStep - 1);
        }
    };

    const redo = () => {
        if (redoable) {
            setCurrentStep(currentStep + 1);
            redrawHistory(currentStep + 1);
        }
    };

    const clearHistory = () => {
        setPoints([]);
        setHistory([]);
        setCurrentStep(-1);
    };

    const redrawHistory = async (step: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        await loadImageScaled(imageData, imageUrl, canvas);

        ctx.strokeStyle = "white";
        ctx.lineJoin = "round";

        history.slice(0, step + 1).forEach((path) => {
            ctx.lineWidth = path.brushSize;

            for (let i = 0; i < path.points.length - 1; i++) {
                const currentPoint = path.points[i];
                const nextPoint = path.points[i + 1];

                ctx.beginPath();
                ctx.moveTo(currentPoint.x, currentPoint.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                ctx.closePath();
                ctx.stroke();
            }
        });
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        loadImageScaled(imageData, imageUrl, canvas);

        clearHistory();
    };

    const download = () => {
        downloadMaskedImage(imageData, canvasRef.current, history);
    };

    const getImgDataUrl = async () => {
        const dataURL = await getDataURL(imageData, canvasRef.current, history);
        return dataURL;
    };

    return {
        undo,
        redo,
        download,
        getImgDataUrl,
        clearCanvas,
        undoable,
        redoable,
    };
}

export default useDrawWithHistory;
