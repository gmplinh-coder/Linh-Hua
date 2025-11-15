import React, { useState } from 'react';
import { QuizResult, Question } from '../types';
import { generateRoundsData } from '../hooks/useQuizData'; // To get question details for review
import { CheckCircle, XCircle, ArrowRight, BookOpen, LayoutDashboard } from 'lucide-react';

interface SummaryProps {
  result: QuizResult;
  onBackToDashboard: () => void;
}

const allQuestions = generateRoundsData().flatMap(r => r.questions);

const Summary: React.FC<SummaryProps> = ({ result, onBackToDashboard }) => {
  const [isReviewMode, setIsReviewMode] = useState(false);
  const { score, xpEarned, coinsEarned, incorrectQuestions, answers } = result;

  const getQuestionById = (id: number): Question | undefined => {
    return allQuestions.find(q => q.id === id);
  };
  
  if (isReviewMode) {
      return (
          <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-2xl border border-pink-400/20 animate-fadeIn">
              <h2 className="text-3xl font-bold text-center mb-6 font-orbitron text-pink-400">Review Round {result.roundId}</h2>
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
                  {Object.keys(answers).map(questionIdStr => {
                      const questionId = parseInt(questionIdStr, 10);
                      const question = getQuestionById(questionId);
                      const userAnswer = answers[questionId];
                      const isCorrect = userAnswer === question?.correctAnswer;

                      if (!question) return null;

                      return (
                          <div key={question.id} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                              <p className="font-semibold text-lg">{question.questionText}</p>
                              <div className="mt-2 text-sm space-y-1">
                                  <p>Your answer: <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{userAnswer}</span></p>
                                  {!isCorrect && <p>Correct answer: <span className="font-bold text-green-400">{question.correctAnswer}</span></p>}
                              </div>
                              <p className="mt-3 text-xs text-gray-300 bg-gray-700/50 p-2 rounded"><span className="font-bold text-cyan-400">Explanation:</span> {question.explanation}</p>
                          </div>
                      );
                  })}
              </div>
              <button onClick={() => setIsReviewMode(false)} className="mt-8 w-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center">
                  Trở về Tổng kết
              </button>
          </div>
      );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-800 rounded-2xl shadow-2xl border border-cyan-400/20 text-center animate-fadeIn">
      <h2 className="text-4xl font-bold font-orbitron text-cyan-400">Round Complete!</h2>
      
      <div className="my-8">
        <p className="text-lg text-gray-300">Your Score</p>
        <p className="text-7xl font-bold font-orbitron text-yellow-300 my-2">{score}</p>
        <p className="text-gray-400">out of 200</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">XP Earned</p>
          <p className="text-2xl font-bold text-cyan-400">+{xpEarned}</p>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Coins Earned</p>
          <p className="text-2xl font-bold text-pink-500">+{coinsEarned}</p>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Accuracy</p>
          <p className="text-2xl font-bold text-green-400">{((score / 200) * 100).toFixed(0)}%</p>
        </div>
      </div>
      
      {incorrectQuestions.length > 0 && (
          <div className="text-left my-8 bg-gray-900/50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-400 mb-2">Mistakes to Review:</h3>
              <ul className="list-disc list-inside text-sm text-gray-300">
                  {incorrectQuestions.map(q => (
                      <li key={q.id}>{q.questionText.substring(0, 50)}...</li>
                  ))}
              </ul>
          </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button onClick={onBackToDashboard} className="flex-1 bg-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center">
          <LayoutDashboard className="mr-2" size={20}/>
          Trở về Dashboard
        </button>
        <button onClick={() => setIsReviewMode(true)} className="flex-1 bg-cyan-500/20 text-cyan-400 border border-cyan-400 font-bold py-3 px-6 rounded-lg hover:bg-cyan-500/40 transition-colors flex items-center justify-center">
          <BookOpen className="mr-2" size={20}/>
          Xem Lại Đáp Án
        </button>
      </div>
    </div>
  );
};

export default Summary;