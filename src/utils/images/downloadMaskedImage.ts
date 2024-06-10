import { Path } from "@/types";
import getImageDimensions from "./getImageDimensions";
import scaleCoordinates from "./scaleCoordinates";

export async function downloadMaskedImage(
    imageData: string,
    canvas: HTMLCanvasElement | null,
    history: Path[]
) {
    if (!imageData || !canvas) return;

    const canvasDimensions = { width: canvas.width, height: canvas.height };
    const imageDimensions = await getImageDimensions(imageData);

    // Create a new canvas with the same dimensions as the original image
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d")!;
    maskCanvas.width = imageDimensions.width;
    maskCanvas.height = imageDimensions.height;
    // Fill the new canvas with black background
    maskCtx.fillStyle = "black";
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    // Redraw the paths onto the new canvas with white strokes
    history.forEach((path) => {
        const { scaledBrushSize } = scaleCoordinates(
            path.points[0],
            path.brushSize,
            canvasDimensions,
            imageDimensions
        );

        maskCtx.strokeStyle = "white";
        maskCtx.lineWidth = scaledBrushSize;
        maskCtx.lineJoin = "round";

        for (let i = 0; i < path.points.length - 1; i++) {
            const { scaledPoint: currentPoint } = scaleCoordinates(
                path.points[i],
                path.brushSize,
                canvasDimensions,
                imageDimensions
            );
            const { scaledPoint: nextPoint } = scaleCoordinates(
                path.points[i + 1],
                path.brushSize,
                canvasDimensions,
                imageDimensions
            );

            maskCtx.beginPath();
            maskCtx.moveTo(currentPoint.x, currentPoint.y);
            maskCtx.lineTo(nextPoint.x, nextPoint.y);
            maskCtx.closePath();
            maskCtx.stroke();
        }
    });

    // Convert the canvas to a data URL
    const dataURL = maskCanvas.toDataURL("image/png");

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "masked_image.png";

    // Trigger the download
    downloadLink.click();

    // Remove the dynamically created elements
    maskCanvas.remove();
    downloadLink.remove();
}

export async function getDataURL(
    imageData: string,
    canvas: HTMLCanvasElement | null,
    history: Path[]
): Promise<string | null> {
    if (!imageData || !canvas) return null;

    const canvasDimensions = { width: canvas.width, height: canvas.height };
    const imageDimensions = await getImageDimensions(imageData);

    // Create a new canvas with the same dimensions as the original image
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d")!;
    maskCanvas.width = imageDimensions.width;
    maskCanvas.height = imageDimensions.height;
    // Fill the new canvas with black background
    maskCtx.fillStyle = "black";
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    // Redraw the paths onto the new canvas with white strokes
    history.forEach((path) => {
        const { scaledBrushSize } = scaleCoordinates(
            path.points[0],
            path.brushSize,
            canvasDimensions,
            imageDimensions
        );

        maskCtx.strokeStyle = "white";
        maskCtx.lineWidth = scaledBrushSize;
        maskCtx.lineJoin = "round";

        for (let i = 0; i < path.points.length - 1; i++) {
            const { scaledPoint: currentPoint } = scaleCoordinates(
                path.points[i],
                path.brushSize,
                canvasDimensions,
                imageDimensions
            );
            const { scaledPoint: nextPoint } = scaleCoordinates(
                path.points[i + 1],
                path.brushSize,
                canvasDimensions,
                imageDimensions
            );

            maskCtx.beginPath();
            maskCtx.moveTo(currentPoint.x, currentPoint.y);
            maskCtx.lineTo(nextPoint.x, nextPoint.y);
            maskCtx.closePath();
            maskCtx.stroke();
        }
    });

    // Convert the canvas to a data URL
    const dataURL = maskCanvas.toDataURL("image/png");

    // Clean up
    maskCanvas.remove();

    return dataURL;
}
