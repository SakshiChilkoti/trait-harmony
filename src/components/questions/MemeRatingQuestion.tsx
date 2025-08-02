import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';
import { mockMemeData } from '@/data/emotionalQuestions';

interface MemeRatingQuestionProps {
  question: string;
  description?: string;
  options: { id: string; text: string; value: number }[];
  onAnswer: (value: number) => void;
}

export function MemeRatingQuestion({ question, description, options, onAnswer }: MemeRatingQuestionProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    onAnswer(rating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-card card-3d">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{question}</CardTitle>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Meme Display */}
          <motion.div 
            className="flex justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src={mockMemeData.imageUrl}
                alt={mockMemeData.altText}
                className="rounded-xl shadow-card max-w-full h-auto"
                style={{ maxHeight: '300px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
            </div>
          </motion.div>

          {/* Star Rating */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => {
                const isSelected = selectedRating && rating <= selectedRating;
                const isHovered = hoveredRating && rating <= hoveredRating;
                
                return (
                  <motion.button
                    key={rating}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingSelect(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(null)}
                    className="transition-all duration-200"
                  >
                    <Star
                      className={`w-12 h-12 transition-colors ${
                        isSelected || isHovered
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 hover:text-yellow-200'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
            
            {/* Rating Labels */}
            <div className="grid grid-cols-5 gap-2 text-sm text-muted-foreground">
              {options.map((option) => (
                <div key={option.id} className="text-center">
                  {option.text}
                </div>
              ))}
            </div>
            
            {selectedRating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-primary"
              >
                You rated this {selectedRating}/5 stars!
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}