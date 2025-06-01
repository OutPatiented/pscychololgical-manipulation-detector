import { apiRequest } from "./queryClient";
import type { AnalysisResult } from "@shared/schema";

export interface AnalyzeTextRequest {
  text: string;
}

export interface AnalyzeTextResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
  details?: any;
}

export async function analyzeText(text: string): Promise<AnalysisResult> {
  const response = await apiRequest("POST", "/api/analyze", { text });
  const data: AnalyzeTextResponse = await response.json();
  
  if (!data.success || !data.data) {
    throw new Error(data.error || "Failed to analyze text");
  }
  
  return data.data;
}
