const CANVAS_MAX_HEIGHT = 512;

export default function loadImageScaled(
    imageData: string,
    imageUrl: string,
    canvas: HTMLCanvasElement
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Failed to get 2D context."));
                return;
            }

            // The direct parent is only used for the absolute positioning of BrushCursor
            // What we're looking for is the outer container
            const canvasContainer = canvas.parentElement?.parentElement;
            if (!canvasContainer) {
                reject(new Error("Canvas container not found."));
                return;
            }

            const canvasContainerComputedStyle =
                getComputedStyle(canvasContainer);
            const computedCanvasContainerWidth = parseInt(
                canvasContainerComputedStyle.width.replace("px", "")
            );

            const widthScale = computedCanvasContainerWidth / image.width;
            const heightScale = CANVAS_MAX_HEIGHT / image.height;

            const scale = Math.min(widthScale, heightScale);

            canvas.width = image.width * scale;
            canvas.height = image.height * scale;

            ctx.clearRect(
                0,
                0,
                computedCanvasContainerWidth,
                CANVAS_MAX_HEIGHT
            );
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                Math.floor(canvas.width),
                Math.floor(canvas.height)
            );

            resolve();
        };

        image.onerror = (error) => {
            reject(new Error("Failed to load image: " + error));
        };

        image.src = imageData || imageUrl;
    });
}
