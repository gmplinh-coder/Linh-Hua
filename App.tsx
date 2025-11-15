
import React, { useState, useCallback, useEffect } from 'react';
import { UserProfile, Round, QuizResult } from './types';
import { generateRoundsData } from './hooks/useQuizData';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Summary from './components/Summary';
import { INITIAL_USER_PROFILE } from './constants';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'dashboard' | 'quiz' | 'summary'>('login');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    setRounds(generateRoundsData());
  }, []);
  
  const handleLogin = useCallback((name: string) => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      name: name,
    }));
    setCurrentScreen('dashboard');
  }, []);


  const startQuiz = useCallback((roundId: number) => {
    const roundToStart = rounds.find(r => r.id === roundId);
    if (roundToStart) {
      setCurrentRound(roundToStart);
      setCurrentScreen('quiz');
    }
  }, [rounds]);

  const finishQuiz = useCallback((result: QuizResult) => {
    setLastResult(result);

    setUserProfile(prevProfile => {
      const newXp = prevProfile.xp + result.xpEarned;
      const newCoins = prevProfile.coins + result.coinsEarned;
      const newLevel = Math.floor(newXp / 1000) + 1;

      const newMistakes = [...prevProfile.mistakes];
      result.incorrectQuestions.forEach(q => {
        if (!newMistakes.find(m => m.id === q.id)) {
          newMistakes.push(q);
        }
      });
      
      const newSkillPerformance = {...prevProfile.skillPerformance};
      newSkillPerformance['Grammar & Vocabulary'] = Math.min(100, newSkillPerformance['Grammar & Vocabulary'] + 5);
      newSkillPerformance['Listening'] = Math.min(100, newSkillPerformance['Listening'] + 3);
      newSkillPerformance['Phonetics'] = Math.min(100, newSkillPerformance['Phonetics'] + 2);
      newSkillPerformance['Reading & General Knowledge'] = Math.min(100, newSkillPerformance['Reading & General Knowledge'] + 4);


      return {
        ...prevProfile,
        xp: newXp,
        coins: newCoins,
        level: newLevel,
        mistakes: newMistakes,
        skillPerformance: newSkillPerformance,
      };
    });

    setRounds(prevRounds => prevRounds.map(r => {
      if (r.id === result.roundId) {
        return {
          ...r,
          status: 'completed',
          highScore: Math.max(r.highScore, result.score),
        };
      }
      return r;
    }));

    setCurrentScreen('summary');
  }, []);

  const backToDashboard = useCallback(() => {
    setCurrentRound(null);
    setLastResult(null);
    setCurrentScreen('dashboard');
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'quiz':
        return currentRound && <Quiz round={currentRound} onFinish={finishQuiz} />;
      case 'summary':
        return lastResult && <Summary result={lastResult} onBackToDashboard={backToDashboard} />;
      case 'dashboard':
      default:
        return <Dashboard userProfile={userProfile} rounds={rounds} onStartQuiz={startQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 font-roboto">
      <div className="max-w-7xl mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
