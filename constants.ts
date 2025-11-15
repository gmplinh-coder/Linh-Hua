
import { UserProfile } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Student01',
  level: 1,
  xp: 0,
  coins: 50,
  badges: ['The Newbie'],
  skillPerformance: {
    'Grammar & Vocabulary': 75,
    'Phonetics': 60,
    'Reading & General Knowledge': 80,
    'Listening': 65,
  },
  mistakes: [],
};

export const QUESTIONS_PER_ROUND = 20;
export const TOTAL_ROUNDS = 10;
export const TIME_PER_QUESTION = 20; // seconds
