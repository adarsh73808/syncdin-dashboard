import React from 'react';
import { Users, UserPlus, Send, MailOpen } from 'lucide-react';

export default function StatsCards({ totalMatches, newMatches, pendingIntros, messagesSent }) {
  const stats = [
    {
      title: 'Total Matches',
      value: totalMatches,
      change: '+12% this week',
      icon: Users,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      title: 'New Matches Today',
      value: newMatches,
      change: 'Needs review',
      icon: UserPlus,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Pending Introductions',
      value: pendingIntros,
      change: 'Avg: 3h reply time',
      icon: MailOpen,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Messages Sent',
      value: messagesSent,
      change: '88% response rate',
      icon: Send,
      color: 'text-violet-600 bg-violet-50 border-violet-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl bg-white/70 p-6 backdrop-blur-xl border border-white/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Background interactive soft shape glow */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
            
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl border ${stat.color} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                stat.title === 'New Matches Today' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : stat.title === 'Pending Introductions'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-indigo-100 text-indigo-800'
              }`}>
                {stat.change}
              </span>
              <span className="text-xs text-slate-500 font-medium">vs last week</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
