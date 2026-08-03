import React from 'react';
import { Sparkles, Bell, Search, Settings } from 'lucide-react';

export default function Header({ userName, userImage }) {
  return (
    <header className="relative z-10 w-full rounded-2xl bg-white/70 p-6 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-300">
      {/* Background soft glowing blur elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-4 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section: User welcome & status message */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            {/* Glowing ring border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300" />
            <img 
              src={userImage} 
              alt={userName} 
              className="relative w-16 h-16 rounded-full border-2 border-white object-cover shadow-md"
            />
            {/* Green active pulse indicator */}
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back, {userName}!
              </h1>
              <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-500/20 animate-bounce" />
            </div>
            <p className="text-slate-600 mt-1 flex items-center gap-1.5 text-sm font-medium">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500/20 border border-indigo-500 animate-ping" />
              Your AI Twin found new opportunities today.
            </p>
          </div>
        </div>

        {/* Right Section: Action Controls */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Simple search box */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Quick search..." 
              disabled
              className="pl-10 pr-4 py-2 text-sm bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-48 text-slate-900"
            />
          </div>
          
          <button className="relative p-2.5 text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
          </button>
          
          <button className="p-2.5 text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
