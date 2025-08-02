import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Play, Waves, Zap } from 'lucide-react';

interface VideoChoiceQuestionProps {
  question: string;
  description?: string;
  onAnswer: (choice: 'peaceful' | 'chaotic') => void;
}

export function VideoChoiceQuestion({ question, description, onAnswer }: VideoChoiceQuestionProps) {
  const [selectedChoice, setSelectedChoice] = useState<'peaceful' | 'chaotic' | null>(null);

  const handleChoice = (choice: 'peaceful' | 'chaotic') => {
    setSelectedChoice(choice);
    onAnswer(choice);
  };

  const videoOptions = [
    {
      id: 'peaceful',
      title: 'Peaceful Scene',
      description: 'Calm ocean waves at sunset',
      icon: <Waves className="w-8 h-8" />,
      gradient: 'from-blue-400 to-teal-300',
      preview: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Cdefs%3E%3ClinearGradient id='peaceful' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2387CEEB'/%3E%3Cstop offset='100%25' style='stop-color:%2320B2AA'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='200' fill='url(%23peaceful)'/%3E%3Ctext x='150' y='100' text-anchor='middle' fill='white' font-size='20'%3E🌊 Peaceful%3C/text%3E%3Ctext x='150' y='130' text-anchor='middle' fill='white' font-size='12'%3ECalm ocean waves%3C/text%3E%3C/svg%3E"
    },
    {
      id: 'chaotic',
      title: 'Energetic Scene', 
      description: 'City life and bustling energy',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-orange-400 to-red-400',
      preview: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Cdefs%3E%3ClinearGradient id='energetic' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF8C00'/%3E%3Cstop offset='100%25' style='stop-color:%23DC143C'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='200' fill='url(%23energetic)'/%3E%3Ctext x='150' y='100' text-anchor='middle' fill='white' font-size='20'%3E⚡ Energetic%3C/text%3E%3Ctext x='150' y='130' text-anchor='middle' fill='white' font-size='12'%3ECity bustling energy%3C/text%3E%3C/svg%3E"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{question}</CardTitle>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {videoOptions.map((option) => {
              const isSelected = selectedChoice === option.id;
              
              return (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-4 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => handleChoice(option.id as 'peaceful' | 'chaotic')}
                >
                  <Card className={`overflow-hidden transition-all duration-300 ${
                    isSelected ? 'border-primary' : 'hover:border-primary/50'
                  }`}>
                    <div className="relative">
                      {/* Video Preview */}
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={option.preview}
                          alt={option.description}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-20`} />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                          >
                            <Play className="w-8 h-8 text-white" />
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${option.gradient}`}>
                            {option.icon}
                          </div>
                          <h3 className="text-xl font-semibold">{option.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2"
                      >
                        ✓
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          {selectedChoice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <p className="text-lg font-medium text-primary">
                You chose the {selectedChoice} environment!
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}