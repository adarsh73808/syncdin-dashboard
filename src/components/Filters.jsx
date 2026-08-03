import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Search } from 'lucide-react';

export default function Filters({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  activeSort,
  setActiveSort,
}) {
  const filters = [
    { label: 'All Matches', value: 'All' },
    { label: 'Jobs', value: 'Job' },
    { label: 'Mentors', value: 'Mentor' },
    { label: 'Co-Founders', value: 'Co-Founder' },
    { label: 'Collaboration', value: 'Collaboration' },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-sm">
      {/* Left section: Search bar input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or skill (e.g. React, CSS)..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
        />
      </div>

      {/* Center section: Category Filters list */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
        <div className="flex items-center gap-1.5 text-slate-500 mr-1 text-sm font-semibold shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
          Filter:
        </div>
        <div className="flex items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                activeFilter === f.value
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-[1.01]'
                  : 'bg-white/50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right section: Sort triggers */}
      <div className="flex items-center gap-3 shrink-0 border-t border-slate-100 lg:border-t-0 pt-3 lg:pt-0">
        <span className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
          <ArrowUpDown className="w-4 h-4" />
          Sort by:
        </span>
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/50">
          {['Highest Match', 'Newest'].map((sortOption) => (
            <button
              key={sortOption}
              onClick={() => setActiveSort(sortOption)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSort === sortOption
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {sortOption}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
