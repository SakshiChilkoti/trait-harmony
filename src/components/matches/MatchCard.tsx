import React from 'react';
import { motion } from 'framer-motion';
import { MatchResult } from '@/types/personality';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTraitDisplayName, getTraitDescription } from '@/utils/matchingAlgorithm';
import { Heart, MessageCircle, User, Star } from 'lucide-react';

interface MatchCardProps {
  match: MatchResult;
  index: number;
  onContact?: (userId: string) => void;
}

export function MatchCard({ match, index, onContact }: MatchCardProps) {
  const { user, score, compatibilityDetails } = match;
  const matchPercentage = Math.round(score * 100);
  
  // Get top 3 compatibility traits
  const topTraits = compatibilityDetails
    .sort((a, b) => b.compatibility - a.compatibility)
    .slice(0, 3);

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-success';
    if (score >= 0.6) return 'text-primary';
    if (score >= 0.4) return 'text-secondary';
    return 'text-muted-foreground';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 0.8) return 'default';
    if (score >= 0.6) return 'secondary';
    return 'outline';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="w-full"
    >
      <Card className="overflow-hidden bg-gradient-card shadow-card border-0 hover:shadow-glow transition-all duration-300">
        <CardContent className="p-0">
          {/* Header with Match Score */}
          <div className="relative p-6 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 ring-4 ring-white/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl font-bold bg-gradient-primary text-primary-foreground">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {index === 0 ? 'Best Match' : index === 1 ? 'Great Match' : 'Good Match'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <motion.div
                  className={`text-3xl font-bold ${getScoreColor(score)}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  {matchPercentage}%
                </motion.div>
                <Badge variant={getScoreBadgeVariant(score)} className="mt-1">
                  <Heart className="w-3 h-3 mr-1" />
                  Match
                </Badge>
              </div>
            </div>
          </div>

          {/* Compatibility Details */}
          <div className="p-6 space-y-4">
            <h4 className="font-semibold text-foreground mb-3">
              Top Compatibility Areas
            </h4>
            
            <div className="space-y-3">
              {topTraits.map((trait, traitIndex) => {
                const compatibilityPercent = Math.round(trait.compatibility * 100);
                
                return (
                  <motion.div
                    key={trait.trait}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + traitIndex * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {getTraitDisplayName(trait.trait)}
                      </span>
                      <span className={`text-sm font-medium ${getScoreColor(trait.compatibility)}`}>
                        {compatibilityPercent}%
                      </span>
                    </div>
                    
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <div className="flex-1">
                        <span className="font-medium">You:</span> {getTraitDescription(trait.trait, trait.userValue)}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">Them:</span> {getTraitDescription(trait.trait, trait.matchValue)}
                      </div>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${compatibilityPercent}%` }}
                        transition={{ 
                          delay: index * 0.1 + traitIndex * 0.1 + 0.2,
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Preferences */}
            {user.preferences && (
              <div className="pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {user.preferences.smoking === false && (
                    <Badge variant="outline" className="text-xs">
                      Non-smoker
                    </Badge>
                  )}
                  {user.preferences.pets && (
                    <Badge variant="outline" className="text-xs">
                      Pet-friendly
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onContact?.(user.id)}
                className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-lg font-semibold 
                         hover:shadow-primary transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Connect with {user.name.split(' ')[0]}
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}