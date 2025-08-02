export interface EmotionalQuestion {
  id: string;
  type: 'meme-rating' | 'video-choice' | 'multiple-choice' | 'voice-response';
  question: string;
  description?: string;
  options?: {
    id: string;
    text: string;
    value: number;
    media?: string;
  }[];
  mediaUrl?: string;
  videoOptions?: {
    peaceful: string;
    chaotic: string;
  };
  traits: string[];
}

export const emotionalQuestions: EmotionalQuestion[] = [
  {
    id: 'meme-1',
    type: 'meme-rating',
    question: 'How funny do you find this meme?',
    description: 'Rate this meme on a scale of 1-5',
    mediaUrl: '/api/placeholder/400/400', // Placeholder for meme image
    options: [
      { id: '1', text: 'Not funny at all', value: 1 },
      { id: '2', text: 'Slightly amusing', value: 2 },
      { id: '3', text: 'Pretty funny', value: 3 },
      { id: '4', text: 'Very funny', value: 4 },
      { id: '5', text: 'Hilarious!', value: 5 }
    ],
    traits: ['creative', 'social']
  },
  {
    id: 'video-choice-1',
    type: 'video-choice',
    question: 'Which environment appeals to you more right now?',
    description: 'Choose the video that resonates with your current mood',
    videoOptions: {
      peaceful: '/api/placeholder/video/peaceful.mp4',
      chaotic: '/api/placeholder/video/energetic.mp4'
    },
    traits: ['peaceful', 'energetic']
  },
  {
    id: 'stress-response',
    type: 'multiple-choice',
    question: 'When you feel overwhelmed, what do you typically do?',
    options: [
      { id: 'alone', text: 'I need alone time to recharge', value: 0.8 },
      { id: 'talk', text: 'I talk to friends or family', value: 0.2 },
      { id: 'distract', text: 'I distract myself with activities', value: 0.5 },
      { id: 'analyze', text: 'I analyze the situation logically', value: 0.9 }
    ],
    traits: ['introspective', 'social', 'analytical']
  },
  {
    id: 'team-role',
    type: 'multiple-choice',
    question: 'In a team project, you naturally become the...',
    options: [
      { id: 'leader', text: 'Leader who organizes everything', value: 0.9 },
      { id: 'creative', text: 'Creative idea generator', value: 0.8 },
      { id: 'supporter', text: 'Supportive team player', value: 0.3 },
      { id: 'analyzer', text: 'Detail-oriented analyzer', value: 0.7 }
    ],
    traits: ['social', 'creative', 'analytical']
  },
  {
    id: 'voice-emotion',
    type: 'voice-response',
    question: 'Describe a moment that made you feel truly happy recently',
    description: 'Speak naturally about a positive experience (or type your response)',
    traits: ['social', 'creative', 'peaceful']
  },
  {
    id: 'conflict-style',
    type: 'multiple-choice',
    question: 'When facing a disagreement with someone close to you, you...',
    options: [
      { id: 'direct', text: 'Address it directly and openly', value: 0.8 },
      { id: 'avoid', text: 'Try to avoid confrontation', value: 0.2 },
      { id: 'think', text: 'Take time to think before responding', value: 0.9 },
      { id: 'mediate', text: 'Look for compromise and common ground', value: 0.6 }
    ],
    traits: ['social', 'introspective', 'analytical']
  }
];

export const emotionalTraits = {
  peaceful: {
    name: 'Peaceful',
    description: 'Prefers calm, serene environments and activities',
    color: 'hsl(var(--trait-peaceful))'
  },
  energetic: {
    name: 'Energetic', 
    description: 'Thrives in dynamic, stimulating environments',
    color: 'hsl(var(--trait-energetic))'
  },
  social: {
    name: 'Social',
    description: 'Enjoys connecting and communicating with others',
    color: 'hsl(var(--trait-social))'
  },
  introspective: {
    name: 'Introspective',
    description: 'Values self-reflection and internal processing',
    color: 'hsl(var(--trait-introspective))'
  },
  creative: {
    name: 'Creative',
    description: 'Appreciates and generates original ideas and expressions',
    color: 'hsl(var(--trait-creative))'
  },
  analytical: {
    name: 'Analytical',
    description: 'Approaches situations with logic and systematic thinking',
    color: 'hsl(var(--trait-analytical))'
  }
};

export const mockMemeData = {
  imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3e8ff'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%236b46c1' font-size='24' font-family='Arial'%3EMock Meme%3C/text%3E%3Ctext x='200' y='200' text-anchor='middle' fill='%236b46c1' font-size='16' font-family='Arial'%3EWhen you finally%3C/text%3E%3Ctext x='200' y='220' text-anchor='middle' fill='%236b46c1' font-size='16' font-family='Arial'%3Eunderstand emotions%3C/text%3E%3Ctext x='200' y='270' text-anchor='middle' fill='%236b46c1' font-size='32' font-family='Arial'%3E😄%3C/text%3E%3C/svg%3E",
  altText: "Emotional understanding meme"
};