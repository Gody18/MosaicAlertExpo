import { Buffer } from 'buffer';
import * as ImageManipulator from 'expo-image-manipulator';
import jpeg from 'jpeg-js';

export const MODEL_INPUT_SIZE = 224;

/**
 * Resize a captured leaf photo to 224x224 and convert RGB pixels to a
 * normalized Float32 tensor matching MobileNetV2 training (0–1 rescale).
 */
export async function preprocessImageForModel(imagePath: string): Promise<Float32Array> {
  const uri = imagePath.startsWith('file://') ? imagePath : `file://${imagePath}`;

  const resized = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: MODEL_INPUT_SIZE, height: MODEL_INPUT_SIZE } }],
    {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    }
  );

  if (!resized.base64) {
    throw new Error('Failed to read image data for inference');
  }

  const raw = jpeg.decode(Buffer.from(resized.base64, 'base64'), {
    useTArray: true,
  });

  const { width, height, data } = raw;
  const tensor = new Float32Array(width * height * 3);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const rgbaIndex = (y * width + x) * 4;
      const tensorIndex = (y * width + x) * 3;
      tensor[tensorIndex] = data[rgbaIndex] / 255;
      tensor[tensorIndex + 1] = data[rgbaIndex + 1] / 255;
      tensor[tensorIndex + 2] = data[rgbaIndex + 2] / 255;
    }
  }

  return tensor;
}
