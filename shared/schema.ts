import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  results: jsonb("results").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAnalysisSchema = createInsertSchema(analyses).pick({
  text: true,
});

export const analyzeTextSchema = z.object({
  text: z.string().min(1, "Text is required").max(5000, "Text must be less than 5000 characters"),
});

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analyses.$inferSelect;

// Analysis result types
export type ManipulationTactic = {
  name: string;
  description: string;
  riskLevel: "high" | "medium" | "low";
  examples: string[];
  copingStrategy: string;
  category: string;
};

export type AnalysisResult = {
  overallRisk: "high" | "medium" | "low";
  tacticsDetected: ManipulationTactic[];
  summary: string;
  suggestedResponses: string[];
  recommendsProfessionalHelp: boolean;
};
