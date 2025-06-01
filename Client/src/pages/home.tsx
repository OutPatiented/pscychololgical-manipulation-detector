import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import TextAnalyzer from "@/components/text-analyzer";
import AnalysisResults from "@/components/analysis-results";
import EducationalResources from "@/components/educational-resources";
import { analyzeText } from "@/lib/api";
import type { AnalysisResult } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: analyzeText,
    onSuccess: (result) => {
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "Your text has been analyzed for manipulation tactics.",
      });
    },
    onError: (error) => {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze text. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = (text: string) => {
    analyzeMutation.mutate(text);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading State */}
        {analyzeMutation.isPending && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Analyzing Your Text</h3>
                <p className="text-muted-foreground">This may take a few moments...</p>
                <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-md mx-auto">
                  <div className="bg-primary h-2 rounded-full animate-pulse w-3/5"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {analysisResult && !analyzeMutation.isPending ? (
          <AnalysisResults results={analysisResult} onNewAnalysis={handleNewAnalysis} />
        ) : !analyzeMutation.isPending ? (
          <TextAnalyzer onAnalyze={handleAnalyze} isAnalyzing={analyzeMutation.isPending} />
        ) : null}

        {/* Educational Resources */}
        <div className="mt-16">
          <EducationalResources />
        </div>

        {/* Support & Disclaimer */}
        <div className="mt-12">
          <Card>
            <CardContent className="pt-6">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Important Disclaimer</h3>
                  <div className="max-w-4xl mx-auto space-y-4 text-sm text-muted-foreground">
                    <p>
                      SafeText Analyzer is an educational tool designed to help identify potential manipulation tactics in text. 
                      It is not a substitute for professional psychological evaluation, therapy, or crisis intervention.
                    </p>
                    <p>
                      If you are experiencing abuse, manipulation, or are in immediate danger, please contact local emergency 
                      services or a crisis hotline immediately. Your safety is the top priority.
                    </p>
                    <p>
                      This tool provides general information and should not be considered as professional advice. 
                      For persistent concerns about manipulation or abuse, please consult with a qualified mental health professional.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
