import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalityQuestions } from '@/data/questions';
import { QuestionCard } from './QuestionCard';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { PersonalityTraits } from '@/types/personality';

interface QuestionnaireProps {
  onComplete: (traits: PersonalityTraits) => void;
  onBack?: () => void;
}

export function Questionnaire({ onComplete, onBack }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const currentQuestion = personalityQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / personalityQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === personalityQuestions.length - 1;

  const handleAnswer = async (questionId: string, answer: any) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setIsProcessing(true);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate personality traits from answers
      const traits = calculateTraitsFromAnswers(newAnswers);
      onComplete(traits);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateTraitsFromAnswers = (allAnswers: Record<string, any>): PersonalityTraits => {
    const traits: PersonalityTraits = {
      earlyBird: 0.5,
      cleanliness: 0.5,
      social: 0.5,
      noiseTolerance: 0.5,
      fitness: 0.5,
      routine: 0.5,
      conflictStyle: 0.5,
      privacy: 0.5,
      aesthetic: 0.5
    };

    // Process explicit trait values from multiple choice and visual questions
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      if (answer.value) {
        Object.entries(answer.value).forEach(([trait, value]) => {
          if (trait in traits) {
            traits[trait as keyof PersonalityTraits] = value as number;
          }
        });
      }
    });

    // Process voice answers with simple keyword analysis
    // In a real app, this would use AI like OpenAI GPT for sophisticated analysis
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      if (answer.type === 'voice' && answer.transcript) {
        const text = answer.transcript.toLowerCase();
        const question = personalityQuestions.find(q => q.id === questionId);
        
        if (question?.id === 'social-energy') {
          if (text.includes('friends') || text.includes('party') || text.includes('social')) {
            traits.social = Math.min(1, traits.social + 0.3);
            traits.privacy = Math.max(0, traits.privacy - 0.2);
          }
          if (text.includes('quiet') || text.includes('alone') || text.includes('peaceful')) {
            traits.social = Math.max(0, traits.social - 0.3);
            traits.privacy = Math.min(1, traits.privacy + 0.3);
          }
        }
        
        if (question?.id === 'conflict-communication') {
          if (text.includes('direct') || text.includes('upfront') || text.includes('straightforward')) {
            traits.conflictStyle = Math.min(1, traits.conflictStyle + 0.4);
          }
          if (text.includes('avoid') || text.includes('diplomatically') || text.includes('careful')) {
            traits.conflictStyle = Math.max(0, traits.conflictStyle - 0.3);
            traits.privacy = Math.min(1, traits.privacy + 0.2);
          }
        }
      }
    });

    return traits;
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Analyzing Your Personality
            </h2>
            <p className="text-white/80">
              Our AI is processing your responses to create your unique personality profile...
            </p>
          </div>
          
          <motion.div
            className="w-64 h-1 bg-white/20 rounded-full mx-auto overflow-hidden"
          >
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {(currentQuestionIndex > 0 || onBack) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={currentQuestionIndex > 0 ? handlePrevious : onBack}
                  className="text-foreground hover:bg-white/20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}
              
              <div className="space-y-1">
                <h1 className="text-lg font-semibold text-foreground">
                  Personality Assessment
                </h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {personalityQuestions.length}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Progress</p>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-glow/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </div>
  );
}