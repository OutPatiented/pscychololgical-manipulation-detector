import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { analyzeTextSchema } from "@shared/schema";
import { analyzeTextForManipulation } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze text for manipulation tactics
  app.post("/api/analyze", async (req, res) => {
    try {
      const validatedData = analyzeTextSchema.parse(req.body);
      
      const analysisResult = await analyzeTextForManipulation(validatedData.text);
      
      res.json({
        success: true,
        data: analysisResult
      });
    } catch (error) {
      console.error("Analysis error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid input",
          details: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to analyze text"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
