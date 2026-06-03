export interface ScanRecord {
  id?: number;
  timestamp: string;
  prediction: string;
  confidence: number;
  imagePath: string;
  isSynced: number;
}

export interface InferenceResult {
  class: 'Healthy' | 'Mosaic';
  confidence: number;
}
