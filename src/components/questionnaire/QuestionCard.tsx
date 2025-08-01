import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/types/personality';
import { Button } from '@/components/ui/button';
import { VoiceInput } from './VoiceInput';
import { Card, CardContent } from '@/components/ui/card';

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, answer: any) => void;
  className?: string;
}

export function QuestionCard({ question, onAnswer, className }: QuestionCardProps) {
  const handleMultipleChoice = (optionId: string, value: any) => {
    onAnswer(question.id, { type: 'multiple-choice', optionId, value });
  };

  const handleVisualChoice = (optionId: string, value: any) => {
    onAnswer(question.id, { type: 'visual', optionId, value });
  };

  const handleVoiceAnswer = (transcript: string) => {
    onAnswer(question.id, { type: 'voice', transcript });
  };

  const renderMultipleChoice = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
        {question.text}
      </h2>
      <div className="grid gap-4">
        {question.options?.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="choice"
              className="w-full p-6 h-auto text-left justify-start"
              onClick={() => handleMultipleChoice(option.id, option.value)}
            >
              <div>
                <p className="font-semibold text-base mb-1">{option.text}</p>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderVisualChoice = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-foreground">
        {question.text}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {question.visualOptions?.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => handleVisualChoice(option.id, option.value)}
          >
            <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-card">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={option.image}
                  alt={option.text}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{option.text}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-muted-foreground">
        Click on your preferred choice
      </p>
    </div>
  );

  const renderVoiceInput = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-foreground">
        {question.text}
      </h2>
      <VoiceInput
        prompt={question.voicePrompt || question.text}
        onSubmit={handleVoiceAnswer}
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.5 
      }}
      className={className}
    >
      <Card className="bg-gradient-card shadow-card border-0 p-8">
        <CardContent className="p-0">
          {question.type === 'multiple-choice' && renderMultipleChoice()}
          {question.type === 'visual' && renderVisualChoice()}
          {question.type === 'voice' && renderVoiceInput()}
        </CardContent>
      </Card>
    </motion.div>
  );
}