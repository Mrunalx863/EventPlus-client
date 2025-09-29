import React from 'react';
import { ArrowRight, Info, Target, Users, Handshake } from 'lucide-react';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-center py-15 px-6 md:py-20 lg:py-25">
        {/* Animated Background Gradients */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-400/30 to-rose-400/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-rose-400/25 to-pink-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300/20 to-rose-300/15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">

          {/* Main Heading */}
          <h1 className="text-slate-900 font-black leading-tight mb-8 text-5xl md:text-6xl lg:text-7xl">
            Explore{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 blur-2xl opacity-40"></span>
              <span className="relative bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 bg-clip-text text-transparent">
                Hackathons
              </span>
            </span>
            <br />& Tech Events
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12 font-medium">
            Discover cutting-edge hackathons, coding competitions, and tech events from top platforms. 
            <span className="text-pink-600 font-semibold"> Join the innovation community</span> and build the future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/event" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-pink-600 to-rose-600 shadow-[0_12px_40px_rgba(199,78,111,0.4)] hover:shadow-[0_16px_48px_rgba(199,78,111,0.5)] transition-all duration-300 hover:scale-105 no-underline"
            >
              <span>Browse Events</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </a>
            
            <a 
              href="/contact" 
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-pink-600 font-bold text-lg border-2 border-pink-300 shadow-[0_8px_32px_rgba(199,78,111,0.15)] hover:shadow-[0_12px_40px_rgba(199,78,111,0.25)] hover:bg-pink-50 transition-all duration-300 hover:scale-105 no-underline"
            >
              <span>Learn More</span>
              <Info className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </a>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Active Events', Icon: Target },
              { number: '50K+', label: 'Participants', Icon: Users },
              { number: '100+', label: 'Partners', Icon: Handshake }
            ].map((stat, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-pink-200/50 shadow-[0_8px_32px_rgba(199,78,111,0.1)] hover:shadow-[0_12px_40px_rgba(199,78,111,0.2)] transition-all duration-300 hover:scale-105"
              >
                <stat.Icon className="w-12 h-12 mb-3 text-pink-600 mx-auto" />
                <div className="text-4xl font-black text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
     <Footer />
    </>
  );
};

export default Home;