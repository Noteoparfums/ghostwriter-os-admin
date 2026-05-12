import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative px-gutter py-16 md:py-24 flex flex-col items-center justify-center text-center max-w-5xl mx-auto overflow-hidden">
        
        <h1 className="font-display-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-6 leading-tight animate-fade-in-up">
          <span className="text-white">The Operating System for</span> <br className="hidden md:block" />
          AI Thinking.
        </h1>
        <p className="font-headline-lg-mobile text-on-surface-variant mb-10 max-w-3xl animate-fade-in-up-delay">
          Structure your ideas, refine them with AI, and export polished presentations in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 animate-fade-in-up-delay-2">
          <Link to="/login" className="glow-button-primary px-6 py-3 rounded-xl font-title-md flex items-center justify-center gap-2 w-full sm:w-auto">
            Get Started
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <button className="glow-button-secondary px-6 py-3 rounded-xl font-title-md flex items-center justify-center gap-2 w-full sm:w-auto">
            <span className="material-symbols-outlined">play_circle</span>
            Watch Demo
          </button>
        </div>

        {/* Abstract Interface Preview */}
        <div className="mt-16 w-full max-w-4xl glass-panel rounded-2xl p-2 md:p-3 aspect-video relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-10 pointer-events-none"></div>
          <img 
            alt="Abstract interface mockup" 
            className="w-full h-full object-cover rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Gwk4TmxfxeWFfaHFRlRguwGNWHIh6ImrSNkGwVdLNW2TGxTewq6sWaUdUtqrL46uD82-r8EfxjnN5ubwtL0g2xLrY3pY3PzHij_Oqqw8ZSD4E6jp3L9pern0SKHDhmBZd7Gl-fk_sMcolnLggCjVNwYzFMYsTxfYcGNFYGp4Yy8Pz8rFs12jU0u1xARFgi5Q11tw6yuSxPUWPeS7FxAq_OLk48D2XLcc3-Xckoe3R2F1BLql9KO3cO6Z97L_Jf09ZibaydYraKK"
          />
          {/* Overlay Elements */}
          <div className="absolute top-6 left-6 glass-panel p-3 rounded-lg z-20 flex items-center gap-3 w-40 hidden md:flex">
            <div className="w-6 h-6 rounded bg-emerald-accent/20 flex items-center justify-center text-emerald-accent">
              <span className="material-symbols-outlined text-sm">neurology</span>
            </div>
            <div>
              <div className="h-1.5 w-16 bg-surface-bright rounded mb-1.5"></div>
              <div className="h-1.5 w-10 bg-surface-bright rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="px-gutter py-16 max-w-6xl mx-auto">
        <h2 className="font-headline-lg text-center mb-12">The Intelligent Workflow</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          {/* Connectors (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-accent/50 to-transparent -z-10"></div>
          {/* Step 1 */}
          <div className="glass-panel p-6 rounded-2xl w-full md:w-1/3 flex flex-col items-center text-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4 border border-white/10">
              <span className="material-symbols-outlined text-2xl text-emerald-accent">input</span>
            </div>
            <h3 className="font-title-md mb-2">1. Input Sources</h3>
            <p className="font-body-base text-on-surface-variant">Ingest research, notes, and raw data seamlessly into your workspace.</p>
          </div>
          {/* Step 2 */}
          <div className="glass-panel p-6 rounded-2xl w-full md:w-1/3 flex flex-col items-center text-center relative z-10 border-emerald-accent/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="w-12 h-12 rounded-full bg-emerald-accent/10 flex items-center justify-center mb-4 border border-emerald-accent/30">
              <span className="material-symbols-outlined text-2xl text-emerald-accent">hub</span>
            </div>
            <h3 className="font-title-md mb-2 text-primary">2. Map Thinking</h3>
            <p className="font-body-base text-on-surface-variant">Let the AI structure and connect your concepts intelligently.</p>
          </div>
          {/* Step 3 */}
          <div className="glass-panel p-6 rounded-2xl w-full md:w-1/3 flex flex-col items-center text-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4 border border-white/10">
              <span className="material-symbols-outlined text-2xl text-purple-accent">present_to_all</span>
            </div>
            <h3 className="font-title-md mb-2">3. Refine &amp; Export</h3>
            <p className="font-body-base text-on-surface-variant">Generate polished presentations and documents instantly.</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-gutter py-16 max-w-6xl mx-auto">
        <h2 className="font-headline-lg mb-10 text-center md:text-left">Elite Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap auto-rows-auto md:auto-rows-[200px]">
          {/* Contextual AI Memory (Large Span) */}
          <div className="bento-card rounded-2xl p-6 md:col-span-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-accent/10 transition-colors duration-300 ease-in-out"></div>
            <div className="z-10">
              <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-accent/10 text-emerald-accent font-label-sm mb-3">Core Engine</span>
              <h3 className="font-headline-lg-mobile mb-2">Contextual AI Memory</h3>
              <p className="font-body-base text-on-surface-variant max-w-md">Never repeat yourself. The system remembers your stylistic preferences, past projects, and specific terminology across all sessions.</p>
            </div>
            <div className="z-10 mt-4 md:mt-auto flex justify-end">
              <span className="material-symbols-outlined text-3xl text-surface-bright group-hover:text-emerald-accent transition-colors duration-300 ease-in-out">memory</span>
            </div>
          </div>
          {/* Source Mapping (Square) */}
          <div className="bento-card rounded-2xl p-6 md:col-span-4 flex flex-col justify-between group">
            <div>
              <h3 className="font-title-md mb-2">Source Mapping</h3>
              <p className="font-body-base text-on-surface-variant">Visually trace every AI-generated claim back to your original uploaded documents.</p>
            </div>
            <div className="mt-4 md:mt-auto">
              <span className="material-symbols-outlined text-3xl text-surface-bright group-hover:text-primary transition-colors duration-300 ease-in-out">schema</span>
            </div>
          </div>
          {/* Real-time Collaboration (Square) */}
          <div className="bento-card rounded-2xl p-6 md:col-span-4 flex flex-col justify-between group">
            <div>
              <h3 className="font-title-md mb-2">Real-time Collaboration</h3>
              <p className="font-body-base text-on-surface-variant">Work alongside your team and your AI co-pilot simultaneously in a multiplayer canvas.</p>
            </div>
            <div className="mt-4 md:mt-auto flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-surface-variant border border-surface flex items-center justify-center text-[10px]">U1</div>
              <div className="w-6 h-6 rounded-full bg-emerald-accent/20 border border-surface flex items-center justify-center text-[10px] text-emerald-accent">AI</div>
            </div>
          </div>
          {/* Knowledge Base (Large Span) */}
          <div className="bento-card rounded-2xl p-6 md:col-span-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-purple-accent/5 to-transparent z-0"></div>
            <div className="z-10">
              <h3 className="font-headline-lg-mobile mb-2">Knowledge Base</h3>
              <p className="font-body-base text-on-surface-variant max-w-md">A centralized, secure vault for all your structural thinking, accessible instantly via semantic search.</p>
            </div>
            <div className="z-10 mt-4 md:mt-auto flex items-center gap-3">
              <div className="h-8 flex-grow bg-surface-container-highest rounded-lg flex items-center px-3 border border-white/5">
                <span className="material-symbols-outlined text-on-surface-variant mr-1.5 text-sm">search</span>
                <span className="font-label-sm text-on-surface-variant">Search your vault...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-gutter py-16 border-t border-white/5 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-label-sm text-on-surface-variant mb-6 uppercase tracking-widest">Trusted by Elite Creators</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out">
            <span className="font-headline-lg-mobile tracking-tighter">ACME Corp</span>
            <span className="font-title-md font-bold italic">GlobalTech</span>
            <span className="font-headline-lg-mobile tracking-widest font-light">NEXUS</span>
            <span className="font-title-md uppercase font-bold">Stark Ind.</span>
          </div>
        </div>
      </section>
    </>
  );
}
