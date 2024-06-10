"use client";

import Loader from "@/components/Loader";
import Retoucher from "@/components/images/retouch/Retoucher";
import Header from "@/components/playground/Header";
import Sidebar from "@/components/playground/Sidebar";
import useDrawWithHistory from "@/hooks/useDrawWithHistory";
import { usePlayground } from "@/hooks/usePlayground";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Playground = ({ params: { tool } }: { params: { tool: string } }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [brushSize, setBrushSize] = useState<number>(10);

    const {
        isLoading,
        imageUrl,
        imageData,
        isPlaygroundLoading,
        setIsPlaygroundLoading,
    } = usePlayground();

    const drawingHistory = useDrawWithHistory(
        imageData,
        imageUrl,
        canvasRef,
        brushSize
    );

    const tools = {
        "magic-eraser": (
            <Retoucher canvasRef={canvasRef} brushSize={brushSize} />
        ),
    };

    const router = useRouter();

    useEffect(() => {
        setIsPlaygroundLoading(true);

        if (!imageData && !imageUrl) {
            router.push("/");
        } else {
            setIsPlaygroundLoading(false);
        }
    }, []);

    return (
        <>
            <Header drawingHistory={drawingHistory} />
            <div className="flex">
                <Sidebar brushSize={brushSize} setBrushSize={setBrushSize} />

                <div className="p-4 relative w-full bg-grid-white/[0.2] max-md:h-[calc(100vh-100px)]">
                    <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] max-sm:hidden"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative z-50">
                            {isPlaygroundLoading ? (
                                <Loader size={56} />
                            ) : (
                                tools[tool as keyof typeof tools]
                            )}

                            {isLoading && (
                                <div className="absolute inset-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-center justify-center">
                                    <Loader size={64} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Playground;
