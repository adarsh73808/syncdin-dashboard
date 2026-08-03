import React from 'react';
import { Lightbulb, Sparkles, CheckCircle2, Building, UserCheck } from 'lucide-react';

export default function Insights({ insights }) {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'info':
        return <Building className="w-5 h-5 text-indigo-500 shrink-0" />;
      case 'alert':
        return <UserCheck className="w-5 h-5 text-violet-500 shrink-0" />;
      default:
        return <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/20 bg-emerald-50/10';
      case 'info':
        return 'border-indigo-500/20 bg-indigo-50/10';
      case 'alert':
        return 'border-violet-500/20 bg-violet-50/10';
      default:
        return 'border-amber-500/20 bg-amber-50/10';
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white/70 p-6 backdrop-blur-xl border border-white/20 shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-500/10 rounded-xl">
          <Sparkles className="w-5 h-5 text-indigo-600 fill-indigo-500/10" />
        </div>
        <div>
          <h3 className="text-md font-extrabold text-slate-900 uppercase tracking-wider">
            AI Insights Panel
          </h3>
          <p className="text-xs text-slate-500">Smart analysis of your current network</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${getBorderColor(
              insight.type
            )}`}
          >
            {getIcon(insight.type)}
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/5 to-violet-500/5 border border-indigo-500/10">
        <h4 className="text-xs font-bold text-indigo-600 flex items-center gap-1.5 uppercase tracking-wide">
          <Lightbulb className="w-3.5 h-3.5 fill-current" />
          Twin Tip of the Day
        </h4>
        <p className="text-xs font-medium text-slate-600 leading-relaxed mt-2">
          Keep your skills profile updated! Your AI Twin maps connections based on exact matched tags.
        </p>
      </div>
    </div>
  );
}
