import React from 'react';
import { ShieldCheck, UserSearch, Send, HeartHandshake, MessageSquareCheck } from 'lucide-react';

export default function Timeline({ activities }) {
  const getIcon = (type) => {
    switch (type) {
      case 'analysis':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'match':
        return <UserSearch className="w-4 h-4 text-indigo-500" />;
      case 'intro':
        return <Send className="w-4 h-4 text-violet-500" />;
      case 'followup':
        return <HeartHandshake className="w-4 h-4 text-amber-500" />;
      default:
        return <MessageSquareCheck className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white/70 p-6 backdrop-blur-xl border border-white/20 shadow-md">
      <div className="mb-6">
        <h3 className="text-md font-extrabold text-slate-900 uppercase tracking-wider">
          Activity Timeline
        </h3>
        <p className="text-xs text-slate-500">Chronological history of AI actions</p>
      </div>

      <div className="relative border-l border-slate-100 pl-4 ml-2 space-y-6">
        {activities.map((act) => (
          <div key={act.id} className="relative group">
            {/* Dot bullets with icon inside */}
            <div className="absolute -left-[25px] top-0.5 p-1 rounded-full border border-white bg-white shadow-sm transition-transform duration-300 group-hover:scale-115">
              <div className="p-1 rounded-lg">
                {getIcon(act.type)}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 block">
                {act.timestamp}
              </span>
              <p className="text-xs font-semibold text-slate-700 leading-relaxed mt-1">
                {act.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
