import React from 'react';
import { Calendar, CalendarCheck, Clock, CheckCircle, ExternalLink } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const typeClasses = (type) => {
    switch (type?.toLowerCase()) {
      case 'hackathon':
        return 'bg-pink-100 text-pink-700 border-pink-300';
      case 'competition':
        return 'bg-rose-100 text-rose-700 border-rose-300';
      case 'workshop':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-pink-100 text-pink-700 border-pink-300';
    }
  };

  return (
    <div className="group relative flex flex-col h-full rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-pink-200/50 shadow-[0_8px_32px_rgba(199,78,111,0.12)] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(199,78,111,0.25)] hover:border-pink-300">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative flex justify-between items-start px-7 pt-7 mb-6 gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-pink-300/60 bg-white backdrop-blur-xl shadow-[0_4px_16px_rgba(199,78,111,0.15)]">
          <span className="text-xs font-black tracking-wider text-pink-700 uppercase">
            {event.hostedBy || event.hosted_by}
          </span>
        </div>

        {event.verified && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-emerald-700 border-2 border-emerald-300 bg-emerald-50 text-xs font-bold shadow-[0_4px_16px_rgba(16,185,129,0.15)]">
            <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative px-7 flex-1 flex flex-col">
        <h3 className="text-2xl font-black text-slate-800 leading-tight mb-4 group-hover:text-pink-700 transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-base text-slate-600 leading-relaxed mb-6 line-clamp-3">
          {event.description?.substring(0, 150)}
          {event.description?.length > 150 ? '...' : ''}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {event.type && (
            <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 ${typeClasses(event.type)} shadow-sm`}>
              {event.type}
            </span>
          )}
          {event.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-xs font-bold border-2 border-slate-300 bg-slate-100 text-slate-700 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-auto mb-7">
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200/50 shadow-sm">
            <Calendar className="w-6 h-6 text-pink-600" strokeWidth={2.5} />
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-xs font-black text-pink-600 uppercase tracking-wider">Start Date</span>
              <span className="text-sm font-bold text-slate-800">{formatDate(event.startDate)}</span>
            </div>
          </div>

          {event.endDate && (
            <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/50 shadow-sm">
              <CalendarCheck className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider">End Date</span>
                <span className="text-sm font-bold text-slate-800">{formatDate(event.endDate)}</span>
              </div>
            </div>
          )}

          {event.deadline && (
            <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-300/50 shadow-sm">
              <Clock className="w-6 h-6 text-rose-600" strokeWidth={2.5} />
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs font-black text-rose-600 uppercase tracking-wider">Deadline</span>
                <span className="text-sm font-bold text-rose-700">{formatDate(event.deadline)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative px-7 pb-7">
        <a
          href={event.redirectURL}
          target="_blank"
          rel="noreferrer"
          className="group/btn relative w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-pink-600 to-rose-600 shadow-[0_12px_40px_rgba(199,78,111,0.4)] hover:shadow-[0_16px_48px_rgba(199,78,111,0.5)] transition-all duration-300 hover:scale-105 overflow-hidden no-underline"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
          <span className="relative">Join Event</span>
          <ExternalLink className="relative w-5 h-5 transition-transform group-hover/btn:translate-x-1" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
};

export default EventCard;