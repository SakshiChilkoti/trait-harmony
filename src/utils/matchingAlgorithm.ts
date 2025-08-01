import { PersonalityTraits, UserProfile, MatchResult } from '@/types/personality';

/**
 * Calculate cosine similarity between two personality trait vectors
 * Higher values indicate better compatibility (closer to 1 = perfect match)
 */
export function calculateCosineSimilarity(traits1: PersonalityTraits, traits2: PersonalityTraits): number {
  const vector1 = Object.values(traits1);
  const vector2 = Object.values(traits2);
  
  // Calculate dot product
  let dotProduct = 0;
  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
  }
  
  // Calculate magnitudes
  let magnitude1 = 0;
  let magnitude2 = 0;
  for (let i = 0; i < vector1.length; i++) {
    magnitude1 += vector1[i] * vector1[i];
    magnitude2 += vector2[i] * vector2[i];
  }
  
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);
  
  // Avoid division by zero
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }
  
  return dotProduct / (magnitude1 * magnitude2);
}

/**
 * Calculate detailed compatibility between two users
 * Returns compatibility scores for each trait
 */
export function calculateDetailedCompatibility(
  userTraits: PersonalityTraits, 
  candidateTraits: PersonalityTraits
): { trait: keyof PersonalityTraits; userValue: number; matchValue: number; compatibility: number }[] {
  const traitKeys = Object.keys(userTraits) as (keyof PersonalityTraits)[];
  
  return traitKeys.map(trait => {
    const userValue = userTraits[trait];
    const matchValue = candidateTraits[trait];
    
    // Calculate trait-specific compatibility
    // Some traits are better when similar (cleanliness, routine)
    // Others can be complementary (social vs privacy can balance)
    let compatibility: number;
    
    switch (trait) {
      case 'cleanliness':
      case 'routine':
      case 'earlyBird':
        // These traits work best when similar
        compatibility = 1 - Math.abs(userValue - matchValue);
        break;
        
      case 'social':
      case 'noiseTolerance':
        // These can work with some difference but not too much
        const diff = Math.abs(userValue - matchValue);
        compatibility = diff < 0.5 ? 1 - diff : 0.5 - (diff - 0.5);
        compatibility = Math.max(0, compatibility);
        break;
        
      case 'conflictStyle':
        // Direct + avoidant can balance each other
        const avgDiff = Math.abs(userValue - matchValue);
        compatibility = avgDiff > 0.3 && avgDiff < 0.7 ? 0.8 : 1 - avgDiff;
        break;
        
      default:
        // Default: moderate similarity is good
        compatibility = 1 - Math.abs(userValue - matchValue) * 0.8;
    }
    
    return {
      trait,
      userValue,
      matchValue,
      compatibility: Math.max(0, Math.min(1, compatibility))
    };
  });
}

/**
 * Apply hard filters (non-negotiable preferences)
 */
export function applyHardFilters(
  user: UserProfile,
  candidates: UserProfile[]
): UserProfile[] {
  return candidates.filter(candidate => {
    if (candidate.id === user.id) return false;
    
    // Example hard filters - in a real app these would be user preferences
    if (user.preferences?.smoking === false && candidate.preferences?.smoking === true) {
      return false;
    }
    
    // Could add more filters like location, budget range, etc.
    return true;
  });
}

/**
 * Find top roommate matches for a user
 */
export function findTopMatches(
  user: UserProfile,
  allUsers: UserProfile[],
  limit: number = 3
): MatchResult[] {
  // Apply hard filters first
  const filteredCandidates = applyHardFilters(user, allUsers);
  
  // Calculate compatibility scores
  const matches: MatchResult[] = filteredCandidates.map(candidate => {
    const cosineSimilarity = calculateCosineSimilarity(user.traits, candidate.traits);
    const compatibilityDetails = calculateDetailedCompatibility(user.traits, candidate.traits);
    
    // Weight the final score based on overall compatibility
    const avgTraitCompatibility = compatibilityDetails.reduce((sum, detail) => sum + detail.compatibility, 0) / compatibilityDetails.length;
    
    // Combine cosine similarity with weighted trait compatibility
    const finalScore = (cosineSimilarity * 0.4) + (avgTraitCompatibility * 0.6);
    
    return {
      user: candidate,
      score: finalScore,
      compatibilityDetails
    };
  });
  
  // Sort by score (highest first) and return top matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get trait name in human-readable format
 */
export function getTraitDisplayName(trait: keyof PersonalityTraits): string {
  const traitNames: Record<keyof PersonalityTraits, string> = {
    earlyBird: 'Sleep Schedule',
    cleanliness: 'Cleanliness',
    social: 'Social Energy',
    noiseTolerance: 'Noise Tolerance',
    fitness: 'Fitness Interest',
    routine: 'Routine vs Spontaneity',
    conflictStyle: 'Communication Style',
    privacy: 'Privacy Preference',
    aesthetic: 'Living Style'
  };
  
  return traitNames[trait];
}

/**
 * Get trait description based on value
 */
export function getTraitDescription(trait: keyof PersonalityTraits, value: number): string {
  const descriptions: Record<keyof PersonalityTraits, [string, string]> = {
    earlyBird: ['Night Owl', 'Early Bird'],
    cleanliness: ['Relaxed', 'Very Organized'],
    social: ['Introverted', 'Extroverted'],
    noiseTolerance: ['Prefers Quiet', 'Enjoys Activity'],
    fitness: ['Relaxed Lifestyle', 'Very Active'],
    routine: ['Spontaneous', 'Routine-Oriented'],
    conflictStyle: ['Diplomatic', 'Direct'],
    privacy: ['Open & Sharing', 'Values Privacy'],
    aesthetic: ['Minimalist', 'Maximalist']
  };
  
  const [lowEnd, highEnd] = descriptions[trait];
  
  if (value < 0.3) return lowEnd;
  if (value > 0.7) return highEnd;
  return `Balanced (${lowEnd} + ${highEnd})`;
}
