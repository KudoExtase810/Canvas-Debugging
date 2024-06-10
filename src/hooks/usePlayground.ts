import { create } from "zustand";

interface ImageStore {
    imageData: string;
    imageUrl: string;
    setImageData: (data: string) => void;
    setImageUrl: (url: string) => void;
    isLoading: boolean;
    setIsLoading: (loadingState: boolean) => void;
    isPlaygroundLoading: boolean;
    setIsPlaygroundLoading: (loadingState: boolean) => void;
    success: boolean;
    setSuccess: (successState: boolean) => void;
    clearAll: () => void;
}

const usePlayground = create<ImageStore>((set) => ({
    imageData: "",
    imageUrl: "",
    setImageData: (data) => set({ imageData: data }),
    setImageUrl: (url) => set({ imageUrl: url }),
    isLoading: false,
    setIsLoading: (loadingState) => set({ isLoading: loadingState }),
    isPlaygroundLoading: true,
    setIsPlaygroundLoading: (loadingState) =>
        set({ isPlaygroundLoading: loadingState }),
    success: false,
    setSuccess: (successState) => set({ success: successState }),
    clearAll: () =>
        set({ imageData: "", imageUrl: "", success: false, isLoading: false }),
}));

export { usePlayground };
