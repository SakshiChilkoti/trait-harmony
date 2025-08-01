import { Question } from '@/types/personality';
import minimalistRoom from '@/assets/minimalist-room.jpg';
import cozyRoom from '@/assets/cozy-room.jpg';
import quietSpace from '@/assets/quiet-space.jpg';
import socialSpace from '@/assets/social-space.jpg';

export const personalityQuestions: Question[] = [
  {
    id: 'sleep-schedule',
    text: 'What describes your ideal daily rhythm?',
    type: 'multiple-choice',
    traits: ['earlyBird', 'routine'],
    options: [
      {
        id: 'early-bird',
        text: 'Early to bed, early to rise - I love morning productivity',
        value: { earlyBird: 0.9, routine: 0.7 }
      },
      {
        id: 'moderate',
        text: 'Flexible schedule - adapt to what the day brings',
        value: { earlyBird: 0.5, routine: 0.3 }
      },
      {
        id: 'night-owl',
        text: 'Night owl - my creativity peaks after midnight',
        value: { earlyBird: 0.1, routine: 0.4 }
      }
    ]
  },
  {
    id: 'living-space',
    text: 'Choose your ideal living environment:',
    type: 'visual',
    traits: ['cleanliness', 'aesthetic'],
    visualOptions: [
      {
        id: 'minimalist',
        text: 'Minimalist & Clean',
        value: { cleanliness: 0.9, aesthetic: 0.2 },
        image: minimalistRoom
      },
      {
        id: 'cozy-lived',
        text: 'Cozy & Lived-in',
        value: { cleanliness: 0.6, aesthetic: 0.8 },
        image: cozyRoom
      }
    ]
  },
  {
    id: 'social-energy',
    text: 'Describe your ideal weekend at home:',
    type: 'voice',
    traits: ['social', 'privacy'],
    voicePrompt: 'Tell me about your perfect weekend at home. Do you prefer hosting friends, having quiet time alone, or something in between?'
  },
  {
    id: 'noise-activity',
    text: 'What sounds make you feel most at home?',
    type: 'visual',
    traits: ['noiseTolerance', 'social'],
    visualOptions: [
      {
        id: 'quiet',
        text: 'Peaceful Silence',
        value: { noiseTolerance: 0.2, social: 0.3 },
        image: quietSpace
      },
      {
        id: 'lively',
        text: 'Lively Conversations',
        value: { noiseTolerance: 0.8, social: 0.9 },
        image: socialSpace
      }
    ]
  },
  {
    id: 'lifestyle-habits',
    text: 'Which lifestyle aligns with yours?',
    type: 'multiple-choice',
    traits: ['fitness', 'routine', 'social'],
    options: [
      {
        id: 'fitness-focused',
        text: 'Active lifestyle - gym sessions, outdoor activities, healthy eating',
        value: { fitness: 0.9, routine: 0.7, social: 0.6 }
      },
      {
        id: 'balanced',
        text: 'Balanced approach - occasional workouts, flexible routine',
        value: { fitness: 0.5, routine: 0.5, social: 0.5 }
      },
      {
        id: 'relaxed',
        text: 'Relaxed pace - prefer mental activities, cozy nights in',
        value: { fitness: 0.2, routine: 0.3, social: 0.4 }
      }
    ]
  },
  {
    id: 'conflict-communication',
    text: 'How do you prefer to handle roommate disagreements?',
    type: 'voice',
    traits: ['conflictStyle', 'social', 'privacy'],
    voicePrompt: 'Think about a time when you had to resolve a disagreement. How do you prefer to approach these situations - directly, diplomatically, or do you need time to think first?'
  }
];

// Mock user data for matching algorithm
export const mockUsers = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: '/api/placeholder/100/100?text=SC',
    traits: {
      earlyBird: 0.8,
      cleanliness: 0.9,
      social: 0.6,
      noiseTolerance: 0.4,
      fitness: 0.7,
      routine: 0.8,
      conflictStyle: 0.7,
      privacy: 0.6,
      aesthetic: 0.3
    },
    preferences: { smoking: false, pets: true },
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    avatar: '/api/placeholder/100/100?text=MJ',
    traits: {
      earlyBird: 0.3,
      cleanliness: 0.6,
      social: 0.9,
      noiseTolerance: 0.8,
      fitness: 0.8,
      routine: 0.4,
      conflictStyle: 0.8,
      privacy: 0.3,
      aesthetic: 0.7
    },
    preferences: { smoking: false, pets: false },
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    avatar: '/api/placeholder/100/100?text=ER',
    traits: {
      earlyBird: 0.7,
      cleanliness: 0.8,
      social: 0.5,
      noiseTolerance: 0.3,
      fitness: 0.9,
      routine: 0.9,
      conflictStyle: 0.6,
      privacy: 0.7,
      aesthetic: 0.2
    },
    preferences: { smoking: false, pets: true },
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Alex Kim',
    email: 'alex@example.com',
    avatar: '/api/placeholder/100/100?text=AK',
    traits: {
      earlyBird: 0.2,
      cleanliness: 0.7,
      social: 0.8,
      noiseTolerance: 0.9,
      fitness: 0.6,
      routine: 0.3,
      conflictStyle: 0.9,
      privacy: 0.4,
      aesthetic: 0.8
    },
    preferences: { smoking: false, pets: false },
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Zoe Williams',
    email: 'zoe@example.com',
    avatar: '/api/placeholder/100/100?text=ZW',
    traits: {
      earlyBird: 0.5,
      cleanliness: 0.8,
      social: 0.4,
      noiseTolerance: 0.2,
      fitness: 0.5,
      routine: 0.7,
      conflictStyle: 0.5,
      privacy: 0.8,
      aesthetic: 0.1
    },
    preferences: { smoking: false, pets: true },
    createdAt: new Date()
  }
];