import { Point } from "@/types";

export default function scaleCoordinates(
  point: Point,
  originalBrushSize: number,
  originalDimensions: { width: number; height: number },
  targetDimensions: { width: number; height: number }
): { scaledPoint: Point; scaledBrushSize: number } {
  const scaleX = targetDimensions.width / originalDimensions.width;
  const scaleY = targetDimensions.height / originalDimensions.height;

  const scaledX = point.x * scaleX;
  const scaledY = point.y * scaleY;
  const scaledBrushSize = originalBrushSize * Math.sqrt(scaleX * scaleY);

  return {
    scaledPoint: {
      x: scaledX,
      y: scaledY
    },
    scaledBrushSize
  };
}
