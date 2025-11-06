import React from 'react';
import { User } from 'lucide-react';

export default function Header({ isAdmin, setIsAdmin }) {
  return (
    <header className="bg-white shadow-sm border-b-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700 tracking-wide">SHIV NADAR</h1>
          <div className="text-sm tracking-widest text-blue-600 mt-1">UNIVERSITY</div>
          <div className="text-xs tracking-wider text-gray-600 mt-1">CHENNAI</div>
        </div>

        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          <User size={18} />
          <span>{isAdmin ? 'Admin Mode' : 'Student Mode'}</span>
        </button>
      </div>
    </header>
  );
}
