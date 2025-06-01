import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Eye, 
  Lightbulb, 
  Heart,
  Phone,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from "lucide-react";
import { useState } from "react";
import type { AnalysisResult, ManipulationTactic } from "@shared/schema";

interface AnalysisResultsProps {
  results: AnalysisResult;
  onNewAnalysis: () => void;
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high":
      return "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200";
    case "medium":
      return "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200";
    case "low":
      return "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200";
    default:
      return "bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200";
  }
};

const getRiskBadgeVariant = (risk: string): "destructive" | "secondary" | "default" => {
  switch (risk) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    default:
      return "default";
  }
};

function TacticCard({ tactic }: { tactic: ManipulationTactic }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border rounded-lg p-4 ${getRiskColor(tactic.riskLevel)}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Badge variant={getRiskBadgeVariant(tactic.riskLevel)} className="text-xs font-medium">
              {tactic.riskLevel.toUpperCase()} RISK
            </Badge>
            <h4 className="font-semibold text-foreground">{tactic.name}</h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{tactic.description}</p>

        <CollapsibleContent className="space-y-3">
          {tactic.examples.length > 0 && (
            <div className="bg-white dark:bg-gray-900 p-3 rounded border">
              <h5 className="font-medium text-foreground mb-2">Specific Examples Found:</h5>
              <ul className="space-y-1">
                {tactic.examples.map((example, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                    <span className="text-xs mt-1">"</span>
                    <span className="italic">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 p-3 rounded border">
            <h5 className="font-medium text-foreground mb-2 flex items-center">
              <Lightbulb className="h-4 w-4 mr-1 text-primary" />
              Coping Strategy
            </h5>
            <p className="text-sm text-muted-foreground">{tactic.copingStrategy}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default function AnalysisResults({ results, onNewAnalysis }: AnalysisResultsProps) {
  const tacticsCount = {
    high: results.tacticsDetected.filter(t => t.riskLevel === "high").length,
    medium: results.tacticsDetected.filter(t => t.riskLevel === "medium").length,
    low: results.tacticsDetected.filter(t => t.riskLevel === "low").length,
  };

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground flex items-center">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              Analysis Summary
            </h2>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Analysis Complete</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 dark:bg-red-950/50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{tacticsCount.high}</div>
              <div className="text-sm text-muted-foreground">High Risk</div>
            </div>
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{tacticsCount.medium}</div>
              <div className="text-sm text-muted-foreground">Medium Risk</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{tacticsCount.low}</div>
              <div className="text-sm text-muted-foreground">Low Risk</div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${getRiskColor(results.overallRisk)}`}>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {results.overallRisk === "high" ? "High Risk Manipulation Detected" :
                   results.overallRisk === "medium" ? "Potential Manipulation Detected" :
                   "Low Risk Assessment"}
                </h4>
                <p className="text-sm">{results.summary}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identified Tactics */}
      {results.tacticsDetected.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Eye className="h-5 w-5 text-red-500 mr-2" />
              Identified Tactics ({results.tacticsDetected.length})
            </h3>

            <div className="space-y-4">
              {results.tacticsDetected.map((tactic, index) => (
                <TacticCard key={index} tactic={tactic} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggested Responses */}
      {results.suggestedResponses.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 text-green-500 mr-2" />
              Suggested Responses
            </h3>

            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Healthy Response Strategies</h4>
                <ul className="space-y-2">
                  {results.suggestedResponses.map((response, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{response}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Help Notice */}
      {results.recommendsProfessionalHelp && (
        <Card>
          <CardContent className="pt-6">
            <div className="bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-2">Professional Support Recommended</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on the analysis, we recommend considering professional support. You don't have to handle this alone.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border">
                      <h5 className="font-medium text-foreground mb-2 flex items-center">
                        <Phone className="h-4 w-4 text-primary mr-2" />
                        Crisis Support
                      </h5>
                      <p className="text-sm text-muted-foreground mb-2">National Domestic Violence Hotline</p>
                      <p className="text-sm font-medium text-primary">1-800-799-7233</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border">
                      <h5 className="font-medium text-foreground mb-2 flex items-center">
                        <ExternalLink className="h-4 w-4 text-primary mr-2" />
                        Professional Help
                      </h5>
                      <p className="text-sm text-muted-foreground mb-2">Find a therapist or counselor</p>
                      <p className="text-sm font-medium text-primary">Psychology Today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Button */}
      <div className="flex justify-center">
        <Button onClick={onNewAnalysis} size="lg" className="flex items-center space-x-2">
          <RotateCcw className="h-4 w-4" />
          <span>Analyze New Text</span>
        </Button>
      </div>
    </div>
  );
}
