import OpenAI from "openai";
import type { AnalysisResult } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function analyzeTextForManipulation(text: string): Promise<AnalysisResult> {
  try {
    const prompt = `You are a psychology expert specializing in identifying manipulation tactics in conversations. Analyze the following text for psychological manipulation patterns.

Respond with a JSON object containing:
1. overallRisk: "high", "medium", or "low" based on the severity of manipulation detected
2. tacticsDetected: Array of manipulation tactics found, each with:
   - name: The name of the tactic (e.g., "Gaslighting", "Guilt-Tripping")
   - description: Brief explanation of what this tactic does
   - riskLevel: "high", "medium", or "low"
   - examples: Array of specific phrases/sentences from the text that demonstrate this tactic
   - copingStrategy: Advice on how to respond to this tactic
   - category: Type of manipulation (e.g., "emotional", "psychological", "control")
3. summary: Brief overall assessment of the manipulation patterns
4. suggestedResponses: Array of example responses that would be healthy/appropriate
5. recommendsProfessionalHelp: Boolean indicating if the situation warrants professional intervention

Common manipulation tactics to look for:
- Gaslighting (making someone question reality)
- Guilt-tripping (using guilt to control)
- Love bombing (excessive affection to manipulate)
- Emotional blackmail (threatening consequences for boundaries)
- Silent treatment (withdrawing to punish)
- Triangulation (involving third parties inappropriately)
- Moving goalposts (changing standards constantly)
- Isolation tactics (cutting off support systems)
- Victim playing (acting like the victim to avoid accountability)
- Projection (accusing others of their own behavior)

Text to analyze:
"${text}"

Respond only with valid JSON.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a psychology expert who analyzes text for manipulation tactics. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate the response structure
    if (!result.overallRisk || !result.tacticsDetected || !Array.isArray(result.tacticsDetected)) {
      throw new Error("Invalid response format from OpenAI");
    }

    return result as AnalysisResult;
  } catch (error) {
    console.error("OpenAI analysis error:", error);
    throw new Error(`Failed to analyze text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
