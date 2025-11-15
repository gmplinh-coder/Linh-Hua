
import React from 'react';
import { UserProfile, Round } from '../types';
import SkillRadarChart from './SkillRadarChart';
import { Zap, BookOpen, Star, Repeat, BarChart2, Award } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
  rounds: Round[];
  onStartQuiz: (roundId: number) => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
  <div className={`bg-gray-800 p-4 rounded-lg flex items-center shadow-lg border-l-4 ${color}`}>
    {icon}
    <div className="ml-4">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-xl font-bold font-orbitron">{value}</div>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ userProfile, rounds, onStartQuiz }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-2xl border border-cyan-400/20">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-cyan-400 font-orbitron tracking-widest">IOE CHALLENGE</h1>
        <p className="text-center text-gray-300 mt-1">Nguyen Trung Truc Secondary School</p>
        <p className="text-center text-xs text-gray-400">Teacher: Hua Ngoc Linh</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold font-orbitron mb-4">{userProfile.name}</h2>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-400">Level</p>
                <p className="font-bold text-lg text-cyan-400">{userProfile.level}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">XP</p>
                <p className="font-bold text-lg text-yellow-300">{userProfile.xp}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Coins</p>
                <p className="font-bold text-lg text-pink-500">{userProfile.coins}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
             <h3 className="text-lg font-bold mb-4 font-orbitron text-pink-500 flex items-center"><BarChart2 className="mr-2" size={20}/>Skill Analysis</h3>
            <div className="h-64">
              <SkillRadarChart data={userProfile.skillPerformance} />
            </div>
          </div>
          
           <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
             <h3 className="text-lg font-bold mb-4 font-orbitron text-yellow-300 flex items-center"><Award className="mr-2" size={20}/>Badges</h3>
             <div className="flex flex-wrap gap-2">
                {userProfile.badges.map(badge => (
                    <span key={badge} className="bg-yellow-300/10 text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-yellow-300/30">{badge}</span>
                ))}
             </div>
           </div>

        </aside>

        <section className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 font-orbitron text-cyan-400">Vòng Luyện</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rounds.map(round => (
              <div key={round.id} className="bg-gray-900/70 p-4 rounded-lg flex justify-between items-center border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                <div>
                  <h4 className="font-bold text-lg font-orbitron">{round.title}</h4>
                  <div className="text-sm text-gray-400 flex items-center mt-1">
                    <Star className="w-4 h-4 mr-1 text-yellow-400"/>
                    High Score: {round.highScore} / 200
                  </div>
                </div>
                <button
                  onClick={() => onStartQuiz(round.id)}
                  className="bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-all duration-300 flex items-center transform hover:scale-105 shadow-lg shadow-pink-500/20"
                >
                  {round.status === 'completed' ? <Repeat className="w-4 h-4 mr-2"/> : <Zap className="w-4 h-4 mr-2"/>}
                  {round.status === 'completed' ? 'RETRY' : 'START'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
