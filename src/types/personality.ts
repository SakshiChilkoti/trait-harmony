export interface PersonalityTraits {
  earlyBird: number; // 0-1 (0 = night owl, 1 = early bird)
  cleanliness: number; // 0-1 (0 = messy, 1 = very clean)
  social: number; // 0-1 (0 = introvert, 1 = extrovert)
  noiseTolerance: number; // 0-1 (0 = quiet, 1 = noisy)
  fitness: number; // 0-1 (0 = not interested, 1 = very active)
  routine: number; // 0-1 (0 = spontaneous, 1 = routine-oriented)
  conflictStyle: number; // 0-1 (0 = avoidant, 1 = direct)
  privacy: number; // 0-1 (0 = open, 1 = private)
  aesthetic: number; // 0-1 (0 = minimalist, 1 = maximalist)
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'visual' | 'voice';
  options?: {
    id: string;
    text: string;
    value: Partial<PersonalityTraits>;
    image?: string;
  }[];
  visualOptions?: {
    id: string;
    text: string;
    value: Partial<PersonalityTraits>;
    image: string;
  }[];
  voicePrompt?: string;
  traits: (keyof PersonalityTraits)[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  traits: PersonalityTraits;
  preferences?: {
    location?: string;
    budget?: number;
    smoking?: boolean;
    pets?: boolean;
  };
  createdAt: Date;
}

export interface MatchResult {
  user: UserProfile;
  score: number;
  compatibilityDetails: {
    trait: keyof PersonalityTraits;
    userValue: number;
    matchValue: number;
    compatibility: number;
  }[];
}

export interface QuestionnaireState {
  currentQuestionIndex: number;
  answers: Record<string, any>;
  traits: Partial<PersonalityTraits>;
  isCompleted: boolean;
}