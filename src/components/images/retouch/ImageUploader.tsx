"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import URLInput from "../URLInput";
import { usePlayground } from "@/hooks/usePlayground";
import { useRouter } from "next/navigation";

const ImageUploader = () => {
    const { setImageData } = usePlayground();
    const router = useRouter();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setImageData(reader.result);
                router.push("/playground/magic-eraser");
            }
        };
        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop,
        accept: { "image/*": [] },
    });

    return (
        <>
            <URLInput tool="magic-eraser" />
            <div className="my-10 mx-auto w-fit text-lg">or</div>
            <div
                {...getRootProps()}
                className="flex gap-2 items-center justify-center mt-4 rounded-3xl py-24 border-primary border-2 border-dashed text-center text-xl font-semibold cursor-pointer w-full bg-primary bg-opacity-0 hover:bg-opacity-10 transition-background duration-300"
            >
                <input {...getInputProps()} />
                Upload Image <FiUpload className="text-2xl" />
            </div>
        </>
    );
};

export default ImageUploader;
