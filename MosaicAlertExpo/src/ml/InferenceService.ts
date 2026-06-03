import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';
import { preprocessImageForModel } from './ImagePreprocessor';
import { InferenceResult } from '../types/models';

export type { InferenceResult };

class InferenceService {
  private model: TensorflowModel | null = null;
  private isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  async initModel(): Promise<void> {
    if (this.isLoaded) return;
    if (this.loadingPromise) return this.loadingPromise;

    this.loadingPromise = (async () => {
      try {
        this.model = await loadTensorflowModel(
          require('../assets/models/mosaicalert_f16.tflite')
        );
        this.isLoaded = true;
        console.log('TFLite model loaded successfully');
      } catch (error) {
        this.loadingPromise = null;
        console.error('Failed to load TFLite model:', error);
        throw error;
      }
    })();

    return this.loadingPromise;
  }

  async runInference(imagePath: string): Promise<InferenceResult> {
    if (!this.model) {
      await this.initModel();
    }

    if (!this.model) {
      throw new Error('Model not loaded');
    }

    const inputTensor = await preprocessImageForModel(imagePath);
    const results = await this.model.run([inputTensor]);
    const outputs = results[0] as Float32Array;

    // Class order from training: index 0 = healthy, index 1 = mosaic
    const probHealthy = outputs[0];
    const probMosaic = outputs[1];

    if (probMosaic > probHealthy) {
      return { class: 'Mosaic', confidence: probMosaic };
    }

    return { class: 'Healthy', confidence: probHealthy };
  }

  getIsLoaded() {
    return this.isLoaded;
  }
}

export default new InferenceService();
