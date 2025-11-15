
import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fadeIn">
      <div className="max-w-md w-full p-8 bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-cyan-400/30 text-center">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 font-orbitron tracking-widest">IOE CHALLENGE</h1>
          <p className="text-gray-300 mt-2">Nguyen Trung Truc Secondary School</p>
          <p className="text-xs text-gray-400">Teacher: Hua Ngoc Linh</p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-pink-400">Nhập tên của bạn để bắt đầu</h2>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors duration-300"
              required
              aria-label="Enter your name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-600 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg shadow-pink-500/30 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed"
            disabled={!name.trim()}
          >
            <LogIn className="w-5 h-5 mr-2"/>
            Bắt Đầu
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
