import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { GraduationCap, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

const tacticCategories = [
  {
    name: "Gaslighting",
    description: "Making someone question their own reality, memory, or perceptions.",
    examples: [
      '"You\'re being too sensitive"',
      '"That never happened"',
      '"You\'re imagining things"'
    ]
  },
  {
    name: "Emotional Manipulation",
    description: "Using emotions like guilt, fear, or shame to control behavior.",
    examples: [
      "Playing victim",
      "Silent treatment",
      "Emotional blackmail"
    ]
  },
  {
    name: "Love Bombing",
    description: "Excessive affection and attention to gain control or dependency.",
    examples: [
      "Overwhelming compliments",
      "Rapid escalation",
      "Future promises"
    ]
  },
  {
    name: "Isolation",
    description: "Cutting someone off from support systems and relationships.",
    examples: [
      "Discouraging friendships",
      "Creating conflict with family",
      "Monopolizing time"
    ]
  },
  {
    name: "Triangulation",
    description: "Bringing third parties into conflicts to create confusion and drama.",
    examples: [
      '"So-and-so agrees with me"',
      "Creating jealousy",
      "Playing sides against each other"
    ]
  },
  {
    name: "Moving Goalposts",
    description: "Constantly changing expectations so nothing is ever good enough.",
    examples: [
      "Shifting standards",
      "New demands after compliance",
      "Never satisfied"
    ]
  }
];

const educationalSections = [
  {
    title: "What is Gaslighting?",
    content: `Gaslighting is a form of psychological manipulation where someone tries to make you question your 
    memory, perception, or judgment. It's a serious form of emotional abuse that can leave you feeling 
    confused and doubting yourself.`,
    signs: [
      '"That never happened" or "You\'re imagining things"',
      '"You\'re too sensitive" or "You\'re overreacting"',
      "Denying previous conversations or agreements",
      "Making you question your memory of events"
    ]
  },
  {
    title: "Emotional Manipulation Tactics",
    content: `Emotional manipulation involves using your emotions against you to control your behavior or decisions. 
    These tactics can be subtle and often target your empathy and care for others.`,
    signs: [
      "Guilt-tripping: Making you feel guilty for normal boundaries",
      "Silent treatment: Withdrawing communication to punish",
      "Emotional blackmail: Threatening consequences for boundaries",
      "Playing victim: Acting helpless to avoid accountability"
    ]
  },
  {
    title: "Building Healthy Boundaries",
    content: `Healthy boundaries are essential for protecting your mental health and maintaining respectful relationships. 
    They help you communicate your needs and limits clearly.`,
    signs: [
      "Be clear and direct about your limits",
      "Don't justify or over-explain your boundaries",
      "Stay consistent in enforcing your boundaries",
      'Remember that "no" is a complete sentence'
    ]
  }
];

function EducationalSection({ section }: { section: typeof educationalSections[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-auto p-4">
          <h3 className="font-medium text-foreground text-left">{section.title}</h3>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-lg bg-gray-50 dark:bg-gray-900/50">
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-4">{section.content}</p>
          <div className="bg-white dark:bg-gray-900 p-3 rounded border">
            <h4 className="font-medium text-foreground text-sm mb-2">
              {section.title.includes("Boundaries") ? "Boundary Setting Tips:" : "Common Signs:"}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {section.signs.map((sign, index) => (
                <li key={index}>• {sign}</li>
              ))}
            </ul>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function EducationalResources() {
  return (
    <div className="space-y-8">
      {/* Manipulation Tactics Grid */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
            <GraduationCap className="h-5 w-5 text-primary mr-2" />
            Understanding Manipulation Tactics
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tacticCategories.map((tactic, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-foreground mb-2">{tactic.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{tactic.description}</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {tactic.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex}>• {example}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-2">Remember:</h4>
                <p className="text-sm text-muted-foreground">
                  Trust your instincts. If something feels wrong, it probably is. Your feelings and experiences are valid, 
                  and you deserve to be treated with respect and kindness.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Accordion */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Learn More About Manipulation</h2>
          
          <div className="space-y-4">
            {educationalSections.map((section, index) => (
              <EducationalSection key={index} section={section} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
