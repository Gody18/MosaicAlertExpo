import { ScanRecord } from '../types/models';

const memoryStore: ScanRecord[] = [];
let nextId = 1;

class DatabaseService {
  async initDB() {
    return null;
  }

  async saveScan(scan: ScanRecord) {
    const record = { ...scan, id: nextId++ };
    memoryStore.unshift(record);
    return record.id;
  }

  async getHistory(): Promise<ScanRecord[]> {
    return [...memoryStore];
  }

  async deleteScan(id: number) {
    const index = memoryStore.findIndex((item) => item.id === id);
    if (index >= 0) {
      memoryStore.splice(index, 1);
    }
  }
}

export type { ScanRecord };
export default new DatabaseService();
