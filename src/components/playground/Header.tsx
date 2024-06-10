"use client";

import { usePlayground } from "@/hooks/usePlayground";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRedoAlt, FaUndoAlt } from "react-icons/fa";
import { FaDownload, FaEraser } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useTools } from "@/hooks/useTools";

interface HeaderProps {
    drawingHistory: {
        undo: () => void;
        redo: () => void;
        download: () => void;
        getImgDataUrl: () => Promise<string | null>;
        clearCanvas: () => void;
        undoable: boolean;
        redoable: boolean;
    };
}

const Header = ({ drawingHistory }: HeaderProps) => {
    const { isLoading, success, clearAll } = usePlayground();
    const { redo, redoable, undo, undoable, clearCanvas, getImgDataUrl } =
        drawingHistory;
    const { currentTool, downloadResult } = useTools();

    const router = useRouter();

    const goBack = () => {
        clearAll();
        router.back();
    };

    return (
        <header className="border-b border-divider flex justify-between items-center w-full h-16 px-2">
            <div className="flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                    <Button onClick={goBack} isIconOnly variant="light">
                        <IoIosArrowBack size={28} />
                    </Button>
                    <FaEraser
                        className="text-red-500 max-md:hidden"
                        size={28}
                    />
                    <h1 className=" max-md:hidden">{currentTool.title}</h1>
                </div>
                {currentTool.isCanvasBased && (
                    <div className="flex items-center gap-1.5">
                        <Button
                            isIconOnly
                            color="primary"
                            variant="flat"
                            onClick={undo}
                            isDisabled={!undoable}
                        >
                            <FaUndoAlt />
                        </Button>
                        <Button
                            isIconOnly
                            color="primary"
                            variant="flat"
                            onClick={redo}
                            isDisabled={!redoable}
                        >
                            <FaRedoAlt />
                        </Button>
                        <Button
                            color="danger"
                            isDisabled={!undoable}
                            variant="flat"
                            onClick={clearCanvas}
                        >
                            Clear
                        </Button>
                    </div>
                )}
            </div>
            <div className="space-x-2">
                <Button
                    disabled={
                        isLoading || (currentTool.isCanvasBased && !undoable)
                    }
                    onClick={() =>
                        currentTool.onApply(getImgDataUrl, clearCanvas)
                    }
                    color="default"
                    variant="flat"
                >
                    Apply
                </Button>
                <Button
                    className="max-md:hidden"
                    disabled={!success}
                    color="primary"
                    variant="flat"
                    onPress={downloadResult}
                >
                    Download
                </Button>
                <Button
                    isIconOnly
                    className="md:hidden"
                    disabled={!success}
                    color="primary"
                    variant="flat"
                    onPress={downloadResult}
                >
                    <FaDownload />
                </Button>
            </div>
        </header>
    );
};

export default Header;
