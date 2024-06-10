"use client";

import { useTools } from "@/hooks/useTools";
import { Slider } from "@nextui-org/slider";

interface SidebarProps {
    brushSize: number;
    setBrushSize: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar = ({ brushSize, setBrushSize }: SidebarProps) => {
    const { currentTool } = useTools();
    return (
        <div className="md:h-[calc(100vh-4rem)] z-50 bg-black max-md:fixed max-md:bottom-0  w-screen md:w-80 border-t md:border-r border-divider p-4 ">
            {currentTool.isCanvasBased && (
                <>
                    <Slider
                        className="max-md:hidden"
                        label="Brush size"
                        size="md"
                        color="primary"
                        step={1}
                        minValue={10}
                        maxValue={100}
                        onChange={(value) => setBrushSize(value as number)}
                        value={brushSize}
                    />
                    <Slider
                        className="md:hidden"
                        label="Brush size"
                        size="sm"
                        color="primary"
                        step={1}
                        minValue={10}
                        maxValue={100}
                        onChange={(value) => setBrushSize(value as number)}
                        value={brushSize}
                    />
                </>
            )}
        </div>
    );
};

export default Sidebar;
