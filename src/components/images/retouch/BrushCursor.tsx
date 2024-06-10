import { useEffect, useRef } from "react";

function BrushCursor({
    brushSize,
    canvasElement,
}: {
    brushSize: number;
    canvasElement: HTMLCanvasElement | null;
}) {
    const brushCursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasElement) return;

        function updateCursorPosition(event: MouseEvent) {
            const cursor = brushCursorRef.current;
            if (!canvasElement || !cursor) return;

            const { clientX, clientY } = event;
            const rect = canvasElement.getBoundingClientRect();
            const offsetX = clientX - rect.left - brushSize / 2;
            const offsetY = clientY - rect.top - brushSize / 2;

            cursor.style.left = `${offsetX}px`;
            cursor.style.top = `${offsetY}px`;
        }

        canvasElement.addEventListener("mousemove", updateCursorPosition);

        return () => {
            canvasElement.removeEventListener(
                "mousemove",
                updateCursorPosition
            );
        };
    }, [brushSize, canvasElement]);

    return (
        <div
            ref={brushCursorRef}
            style={{
                width: `${brushSize}px`,
                height: `${brushSize}px`,
            }}
            className="pointer-events-none absolute inset-0 z-50 hidden rounded-full bg-blue-500/40 lg:block"
        ></div>
    );
}

export default BrushCursor;
