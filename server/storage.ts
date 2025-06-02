import { analyses, type Analysis, type InsertAnalysis } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // For this application, we don't need to store analyses as it's privacy-focused
  // The storage interface can remain minimal or be extended if needed later
}

export class MemStorage implements IStorage {
  constructor() {
    // No persistent storage needed for privacy reasons
  }
}

export const storage = new MemStorage();
