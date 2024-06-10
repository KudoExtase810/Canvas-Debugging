import { useParams } from "next/navigation";

import { usePlayground } from "./usePlayground";

const useTools = () => {
    const {
        imageData,
        setImageData,
        imageUrl,
        setIsLoading,
        success,
        setSuccess,
    } = usePlayground();

    const { tool } = useParams();

    const removeWatermark = async () => {
        alert("Watermark Removed!!!");
    };

    const handleRetouch = async (
        getImgDataUrl: () => Promise<string | null>,
        clearCanvas: () => void
    ) => {
        alert("Magically Earased !!!");
    };

    const handleDownload = () => {
        if (!success) return;

        const downloadLink = document.createElement("a");
        downloadLink.href = imageData;
        downloadLink.download = "no-watermark.png";

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
    };

    const tools = {
        "watermark-remover": {
            title: "Watermark Remover",
            onApply: removeWatermark,
            isCanvasBased: false,
        },
        "magic-eraser": {
            title: "Magic Eraser",
            onApply: (
                getImgDataUrl: () => Promise<string | null>,
                clearCanvas: () => void
            ) => {
                handleRetouch(getImgDataUrl, clearCanvas);
            },
            isCanvasBased: true,
        },
    };
    const currentTool = tools[tool as "magic-eraser"];

    return { currentTool, downloadResult: handleDownload };
};
export { useTools };
