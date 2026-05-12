import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = ({ title, icon }) => {
  return (
    <div className="bg-[#050505] text-on-surface h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(207,188,255,0.15)] animate-pulse">
        <span className="material-symbols-outlined text-[40px]">{icon}</span>
      </div>
      <h1 className="font-headline-lg text-primary tracking-tighter mb-2">{title}</h1>
      <p className="font-body-base text-on-surface-variant max-w-md mb-8">
        We're building the future of AI-powered creation. This module is currently under development for the elite GhostwriterOS experience.
      </p>
      <Link 
        to="/dashboard" 
        className="glow-button-primary px-8 py-3 rounded-xl font-title-md flex items-center gap-2 transition-all hover:scale-105"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Dashboard
      </Link>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
          <span className="material-symbols-outlined text-primary text-sm mb-2">auto_awesome</span>
          <p className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">Status</p>
          <p className="text-xs text-on-surface">Alpha Testing</p>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
          <span className="material-symbols-outlined text-secondary text-sm mb-2">rocket_launch</span>
          <p className="text-[10px] uppercase tracking-widest text-secondary/70 font-bold mb-1">Release</p>
          <p className="text-xs text-on-surface">Q3 2024</p>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
          <span className="material-symbols-outlined text-tertiary text-sm mb-2">verified_user</span>
          <p className="text-[10px] uppercase tracking-widest text-tertiary/70 font-bold mb-1">Access</p>
          <p className="text-xs text-on-surface">Early Adopters Only</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
