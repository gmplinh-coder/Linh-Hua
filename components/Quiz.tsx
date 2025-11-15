import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Round, Question, QuizResult } from '../types';
import { TIME_PER_QUESTION } from '../constants';
import { generateSpeech, decodeAudioData, decode } from '../services/geminiService';
import { Volume2, Zap, X, Check, Clock, Loader } from 'lucide-react';

interface QuizProps {
  round: Round;
  onFinish: (result: QuizResult) => void;
}

const formatUnderlinedText = (text: string): React.ReactNode => {
  if (!text.includes('__')) {
    return text;
  }
  const parts = text.split(/(__.*?__)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('__') && part.endsWith('__')) {
          return <span key={index} className="underline decoration-pink-500 decoration-2 underline-offset-4">{part.slice(2, -2)}</span>;
        }
        return part;
      })}
    </>
  );
};


const Quiz: React.FC<QuizProps> = ({ round, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const currentQuestion = useMemo(() => round.questions[currentQuestionIndex], [round.questions, currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < round.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      // Finish quiz
      const score = round.questions.reduce((total, q) => {
          return answers[q.id] === q.correctAnswer ? total + 10 : total;
      }, 0);
      const incorrectQuestions = round.questions.filter(q => answers[q.id] !== q.correctAnswer);
      const xpEarned = score * 5;
      const coinsEarned = score === 200 ? 50 : 0;

      onFinish({
        roundId: round.id,
        score,
        xpEarned,
        coinsEarned,
        incorrectQuestions,
        answers,
      });
    }
  }, [currentQuestionIndex, round, answers, onFinish]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(handleNextQuestion, 1000);
      return () => clearTimeout(timer);
    }
    
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleNextQuestion, feedback]);

  const handleAnswer = (option: string) => {
    if (feedback) return;

    setSelectedOption(option);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));

    if (option === currentQuestion.correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const playAudio = async () => {
    if (!currentQuestion.audioText) return;
    setIsAudioLoading(true);
    try {
      const base64Audio = await generateSpeech(currentQuestion.audioText);
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
      const source = outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputAudioContext.destination);
      source.start();
    } catch (error) {
      console.error("Error playing audio:", error);
      alert("Failed to play audio. Please check your API key and network connection.");
    } finally {
      setIsAudioLoading(false);
    }
  };
  
  const getOptionClass = (option: string) => {
    if (!feedback) {
        return "bg-gray-800 hover:bg-cyan-500/20 hover:border-cyan-400";
    }
    if (option === currentQuestion.correctAnswer) {
        return "bg-green-500/30 border-green-500";
    }
    if (option === selectedOption) {
        return "bg-red-500/30 border-red-500";
    }
    return "bg-gray-800 opacity-50";
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / round.questions.length) * 100;
  const timerPercentage = (timeLeft / TIME_PER_QUESTION) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl border border-cyan-400/20 font-sans animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold font-orbitron text-pink-500">{round.title}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
                  <Zap className="w-5 h-5 text-yellow-300 mr-2" />
                  <span className="font-bold text-lg">{currentQuestionIndex + 1} / {round.questions.length}</span>
              </div>
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
                  <Clock className="w-5 h-5 text-yellow-300 mr-2"/>
                  <span className="font-bold text-lg font-orbitron w-8 text-center">{timeLeft}</span>
              </div>
            </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-2 mb-6">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-cyan-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-yellow-300 h-1.5 rounded-full transition-all duration-200" style={{ width: `${timerPercentage}%` }}></div>
            </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg min-h-[400px] flex flex-col justify-center">
            {currentQuestion.imageUrl && (
              <img src={currentQuestion.imageUrl} alt="Question visual" className="max-h-48 w-auto mx-auto rounded-lg mb-4 shadow-lg"/>
            )}
            
            <p className="text-sm text-pink-400 font-semibold mb-2">{currentQuestion.type}</p>
            <h3 className="text-xl md:text-2xl text-center font-semibold mb-6">{formatUnderlinedText(currentQuestion.questionText)}</h3>

            {currentQuestion.audioText && (
                <div className="text-center mb-6">
                    <button onClick={playAudio} disabled={isAudioLoading} className="bg-cyan-500 text-white p-4 rounded-full hover:bg-cyan-600 disabled:bg-gray-600 transition-colors shadow-lg shadow-cyan-500/20">
                        {isAudioLoading ? <Loader className="animate-spin" /> : <Volume2 />}
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map(option => (
                    <button key={option} onClick={() => handleAnswer(option)}
                        disabled={!!feedback}
                        className={`p-4 rounded-lg border-2 border-gray-700 text-left transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-between ${getOptionClass(option)}`}>
                        <span className="font-medium text-lg">{option}</span>
                        {feedback && option === selectedOption && option === currentQuestion.correctAnswer && <Check className="text-green-400"/>}
                        {feedback && option === selectedOption && option !== currentQuestion.correctAnswer && <X className="text-red-400"/>}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Quiz;