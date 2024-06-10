export default async function getImageDimensions(
  imageData: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = imageData;
  });
}
