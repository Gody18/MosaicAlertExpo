import { InferenceResult } from '../types/models';

class InferenceService {
  private isLoaded = false;

  async initModel(): Promise<void> {
    this.isLoaded = true;
  }

  async runInference(_imagePath: string): Promise<InferenceResult> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { class: 'Healthy', confidence: 0.87 };
  }

  getIsLoaded() {
    return this.isLoaded;
  }
}

export type { InferenceResult };
export default new InferenceService();
