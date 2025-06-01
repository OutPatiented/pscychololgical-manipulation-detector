import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, Trash2, Shield, Lock } from "lucide-react";
import logoSvg from "../assets/logo.svg";
import heroIllustration from "../assets/hero-illustration.svg";

interface TextAnalyzerProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

const sampleTexts = {
  gaslighting: "You're being way too sensitive about this. I never said that - you must be imagining things again. You always twist my words and make me out to be the bad guy. I'm just trying to help you see things clearly, but you're being impossible to reason with.",
  "guilt-trip": "After everything I've done for you, this is how you repay me? I've sacrificed so much for our relationship and you can't even do this one small thing. You clearly don't care about my feelings at all. Fine, I'll just handle everything myself like I always do.",
  "love-bombing": "You're absolutely perfect and I can't live without you! I've never felt this way about anyone before. You're my soulmate and we're meant to be together forever. I want to move in together next week and meet your family right away. Nobody will ever love you the way I do."
};

export default function TextAnalyzer({ onAnalyze, isAnalyzing }: TextAnalyzerProps) {
  const [text, setText] = useState("");
  const maxLength = 5000;

  const handleAnalyze = () => {
    if (text.trim().length > 0) {
      onAnalyze(text);
    }
  };

  const handleClear = () => {
    setText("");
  };

  const loadSample = (sampleKey: keyof typeof sampleTexts) => {
    setText(sampleTexts[sampleKey]);
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src={logoSvg} alt="Gaslight Detector Logo" className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Gaslight Detector</h1>
                <p className="text-sm text-muted-foreground">Identify manipulation tactics in conversations</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-6">
              <div className="lg:flex-1">
                <p className="text-muted-foreground max-w-xl">
                  Paste any conversation, email, or message below to identify potential psychological manipulation tactics. 
                  Our AI will help you understand what to look for and how to respond.
                </p>
              </div>
              <div className="lg:flex-1 max-w-sm">
                <img src={heroIllustration} alt="Conversation Analysis Illustration" className="w-full h-auto" />
              </div>
            </div>
          </div>
          
          {/* Privacy Notice */}
          <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground mb-1">Your Privacy is Protected</h3>
                <p className="text-sm text-muted-foreground">
                  We don't store your conversations. All analysis happens in real-time and data is not saved.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Text Input */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Search className="h-5 w-5 text-primary mr-2" />
              Conversation Text
            </h3>
            
            <div className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your conversation, email, or message here..."
                className="h-64 resize-none"
                maxLength={maxLength}
              />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {text.length} / {maxLength} characters
                </span>
                <div className="flex space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    disabled={!text.trim() || isAnalyzing}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                  <Button
                    onClick={handleAnalyze}
                    disabled={!text.trim() || isAnalyzing}
                    className="flex items-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    <span>{isAnalyzing ? "Analyzing..." : "Analyze"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Texts */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Try Sample Texts
            </h3>
            
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => loadSample("gaslighting")}
                disabled={isAnalyzing}
              >
                <div>
                  <div className="font-medium text-foreground">Gaslighting Example</div>
                  <div className="text-sm text-muted-foreground">Common gaslighting phrases and patterns</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => loadSample("guilt-trip")}
                disabled={isAnalyzing}
              >
                <div>
                  <div className="font-medium text-foreground">Guilt-Tripping Example</div>
                  <div className="text-sm text-muted-foreground">Emotional manipulation through guilt</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => loadSample("love-bombing")}
                disabled={isAnalyzing}
              >
                <div>
                  <div className="font-medium text-foreground">Love-Bombing Example</div>
                  <div className="text-sm text-muted-foreground">Excessive affection as manipulation</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
