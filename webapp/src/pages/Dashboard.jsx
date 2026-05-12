import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateAIResponse } from '../lib/ai';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNode, setGeneratedNode] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedNode({ title: 'AI is thinking...', content: 'Please wait while AI processes your request...' });
    
    try {
      const result = await generateAIResponse(prompt);
      setGeneratedNode({ title: 'Generated Content', content: result });
      setPrompt('');
    } catch (error) {
      setGeneratedNode({ title: 'Error', content: 'Failed to generate response: ' + error.message });
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="bg-[#050505] text-on-surface font-body-base antialiased selection:bg-primary selection:text-on-primary h-screen overflow-hidden flex">
      {/* Background pattern style could be added to index.css or kept inline */}
      <style dangerouslySetInnerHTML={{__html: `
        .bg-grid-pattern {
            background-image: 
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }
      `}} />
      
      <input className="peer hidden" id="sidebar-toggle" type="checkbox" />
      
      {/* SideNavBar */}
      <nav className="flex flex-col h-screen p-4 fixed left-0 top-0 bg-surface-container-lowest w-56 border-r border-white/5 z-50 transform -translate-x-full peer-checked:translate-x-0 lg:translate-x-0 transition-transform duration-300">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">G</div>
            <div>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter" style={{ fontSize: '1.125rem', lineHeight: '1.25rem' }}>GhostwriterOS</h1>
              <p className="font-label-sm text-[10px] text-primary/70">Elite Creator</p>
            </div>
          </div>
          <label className="lg:hidden text-on-surface-variant hover:text-on-surface cursor-pointer" htmlFor="sidebar-toggle">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </label>
        </div>

        <button className="mb-6 w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg py-2 px-3 font-title-md text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(207,188,255,0.4)]">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
          New Project
        </button>

        <ul className="flex flex-col gap-1 flex-grow">
          <li>
            <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary bg-primary/10 font-bold transition-all duration-300 hover:scale-105 font-title-md text-sm">
              <span className="material-symbols-outlined text-[20px]">home</span>
              Home
            </Link>
          </li>
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 hover:scale-105 font-title-md text-sm" href="#">
              <span className="material-symbols-outlined text-[20px]">hub</span>
              My Maps
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 hover:scale-105 font-title-md text-sm" href="#">
              <span className="material-symbols-outlined text-[20px]">database</span>
              Knowledge Base
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 hover:scale-105 font-title-md text-sm" href="#">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              Settings
            </a>
          </li>
        </ul>

        <div className="mt-auto flex items-center gap-3 p-3 bg-surface-container/50 rounded-xl border border-white/5 hover:bg-white/5 transition-all duration-300 cursor-pointer">
          <img alt="User Avatar" className="w-8 h-8 rounded-full border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMiCtzyaUdV4OWL8g1V34IFuksBCwTK67AtITzoXAccC-YIzco6hk8yzr0BW0boOyp24r67evOx_ioYfotiXmjcnzPJcgAY7JIKS2viY2CQwNx3Ubi0SmwtVQ_DymrEyGXad7ELnQtqYGO5a2lVzxESAs1z3rCLhouPwPNKrh0keaidouMf2Vgr45rvOBlBSVUT2tb-4ZqEQlnfgnfjmvkUfV6X_XOqFdBRuGJ2DLnLA4Y3Zmp4eJgQOE3yiP5PjLxboaHJsQM30g7" />
          <div>
            <p className="font-title-md text-sm text-on-surface">Alex Mercer</p>
            <p className="font-label-sm text-[10px] text-on-surface-variant">Pro Plan</p>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <label className="fixed inset-0 bg-black/50 z-40 lg:hidden hidden peer-checked:block backdrop-blur-sm transition-opacity duration-300" htmlFor="sidebar-toggle"></label>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-56 relative flex flex-col w-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-3 bg-surface-container-lowest border-b border-white/5 z-20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">G</div>
            <h1 className="font-title-md text-base text-primary">GhostwriterOS</h1>
          </div>
          <label className="cursor-pointer text-on-surface hover:text-primary transition-colors duration-300" htmlFor="sidebar-toggle">
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </label>
        </div>

        {/* Canvas Workspace */}
        <div className="flex-1 relative bg-grid-pattern h-full overflow-hidden flex flex-col touch-pan-x touch-pan-y">
          {/* Top Controls */}
          <div className="absolute top-0 left-0 w-full p-3 lg:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 z-10 pointer-events-none">
            <div className="bg-surface/80 backdrop-blur-xl border border-white/10 rounded-xl p-2.5 flex gap-3 pointer-events-auto shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
              <h2 className="font-title-md text-xs sm:text-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg sm:text-xl">account_tree</span>
                Project: Q4 Launch Strategy
              </h2>
            </div>
            <div className="flex gap-2 pointer-events-auto self-end sm:self-auto">
              <button className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-on-surface hover:text-primary transition-all duration-300 hover:scale-105 hover:border-primary/50 shadow-xl hover:shadow-[0_0_15px_rgba(207,188,255,0.3)]">
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-on-surface hover:text-primary transition-all duration-300 hover:scale-105 hover:border-primary/50 shadow-xl hover:shadow-[0_0_15px_rgba(207,188,255,0.3)]">
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
            </div>
          </div>

          {/* Nodes Canvas */}
          <div className="flex-1 relative overflow-auto pt-20 px-4 lg:px-6 pb-6 flex items-center justify-center min-h-[500px] min-w-[600px] sm:min-w-full">
            {/* SVG Connecting Lines (Simulated) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path className="animate-pulse" d="M 50% 50% Q 40% 30% 30% 30%" fill="none" stroke="rgba(207, 188, 255, 0.3)" strokeWidth="1.5"></path>
              <path d="M 50% 50% Q 60% 40% 70% 30%" fill="none" stroke="rgba(207, 188, 255, 0.3)" strokeWidth="1.5"></path>
              <path d="M 50% 50% Q 55% 70% 65% 75%" fill="none" stroke="rgba(207, 188, 255, 0.3)" strokeWidth="1.5"></path>
            </svg>

            {/* Generated Content Overlay */}
            {generatedNode && (
              <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 z-30 w-[90%] max-w-2xl bg-surface-container-highest/95 border border-primary/50 rounded-xl p-5 shadow-[0_0_50px_rgba(207,188,255,0.25)] backdrop-blur-xl transition-all animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
                  <div className={`w-8 h-8 rounded-full ${isGenerating ? 'bg-primary/20 animate-pulse' : 'bg-primary/20'} flex items-center justify-center text-primary`}>
                    <span className="material-symbols-outlined text-[18px]">{isGenerating ? 'hourglass_empty' : 'auto_awesome'}</span>
                  </div>
                  <h3 className="font-title-md text-base sm:text-lg text-primary">{generatedNode.title}</h3>
                  <button className="ml-auto w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" onClick={() => setGeneratedNode(null)}>
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                <div className="font-body-base text-sm sm:text-base text-on-surface max-h-[400px] overflow-y-auto whitespace-pre-wrap leading-relaxed custom-scrollbar">
                  {generatedNode.content}
                </div>
              </div>
            )}

            {/* Core Node */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-48 sm:w-56 bg-surface-container-low border border-primary/50 rounded-xl p-3 sm:p-4 shadow-[0_0_30px_rgba(207,188,255,0.15)] backdrop-blur-md hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_10px_rgba(207,188,255,0.5)] transition-all duration-300">
                  <span className="material-symbols-outlined text-[14px]">stars</span>
                </div>
                <h3 className="font-title-md text-sm sm:text-base text-on-surface">Core Concept</h3>
              </div>
              <p className="font-body-base text-[10px] sm:text-[11px] text-on-surface-variant">The fundamental thesis for the new AI-driven marketing campaign.</p>
            </div>

            {/* Node 1 */}
            <div className="absolute top-[20%] sm:top-[25%] left-[10%] sm:left-[20%] z-10 w-40 sm:w-48 bg-surface-container-highest border border-white/10 rounded-xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-secondary text-[14px]">target</span>
                <h4 className="font-title-md text-[11px] sm:text-sm text-on-surface">Audience</h4>
              </div>
              <p className="font-body-base text-[9px] sm:text-[10px] text-on-surface-variant">High-net-worth technical founders.</p>
            </div>

            {/* Node 2 */}
            <div className="absolute top-[20%] sm:top-[25%] right-[10%] sm:right-[20%] z-10 w-40 sm:w-48 bg-surface-container-highest border border-white/10 rounded-xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-tertiary text-[14px]">campaign</span>
                <h4 className="font-title-md text-[11px] sm:text-sm text-on-surface">Distribution Channels</h4>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-label-sm text-[8px] sm:text-[9px] text-on-surface-variant">LinkedIn</span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-label-sm text-[8px] sm:text-[9px] text-on-surface-variant">Newsletters</span>
              </div>
            </div>

            {/* Node 3 */}
            <div className="absolute bottom-[15%] sm:bottom-[20%] right-[15%] sm:right-[25%] z-10 w-40 sm:w-48 bg-surface-container-highest border border-white/10 rounded-xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_rgba(255,180,171,0.1)]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-error text-[14px]">warning</span>
                <h4 className="font-title-md text-[11px] sm:text-sm text-on-surface">Risks</h4>
              </div>
              <p className="font-body-base text-[9px] sm:text-[10px] text-on-surface-variant">Market saturation in AI tooling messaging.</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar (AI Co-Creator) */}
        <aside className="w-full lg:w-72 h-[50vh] lg:h-full bg-surface-container-lowest border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] lg:shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex-shrink-0">
          {/* Header */}
          <div className="p-3 lg:p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
              <h2 className="font-title-md text-sm sm:text-base text-on-surface">AI Co-Creator</h2>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-300 hover:scale-110">
              <span className="material-symbols-outlined text-sm">more_horiz</span>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
            {/* System Message */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_10px_rgba(207,188,255,0.1)]">
              <p className="font-body-base text-[10px] text-on-surface-variant mb-1.5">Analyzing 'Core Concept' node...</p>
              <p className="font-body-base text-xs sm:text-sm text-on-surface">I've identified 3 potential expansion paths based on your previous marketing materials. Would you like me to generate specific copy for these?</p>
            </div>

            {/* User Message */}
            <div className="bg-surface-container-high rounded-xl p-3 self-end max-w-[85%] transition-all duration-300 hover:bg-surface-container-highest">
              <p className="font-body-base text-xs sm:text-sm text-on-surface">Focus on the technical founder persona first.</p>
            </div>

            {/* Suggested Actions (Bento style) */}
            <div className="mt-3">
              <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 px-1">Suggested Prompts</p>
              <div className="grid grid-cols-1 gap-2">
                <button className="bg-surface-container border border-white/5 hover:border-primary/50 hover:bg-primary/5 rounded-lg p-2.5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(207,188,255,0.2)] group flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary/70 group-hover:text-primary text-[16px] mt-0.5 transition-colors duration-300">psychology</span>
                  <div>
                    <span className="block font-title-md text-[11px] text-on-surface group-hover:text-primary transition-colors duration-300">Synthesize this node</span>
                    <span className="block font-body-base text-[9px] text-on-surface-variant mt-0.5">Summarize into a 2-line elevator pitch.</span>
                  </div>
                </button>
                <button className="bg-surface-container border border-white/5 hover:border-tertiary/50 hover:bg-tertiary/5 rounded-lg p-2.5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(231,195,101,0.2)] group flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-tertiary/70 group-hover:text-tertiary text-[16px] mt-0.5 transition-colors duration-300">present_to_all</span>
                  <div>
                    <span className="block font-title-md text-[11px] text-on-surface group-hover:text-tertiary transition-colors duration-300">Expand into a slide</span>
                    <span className="block font-body-base text-[9px] text-on-surface-variant mt-0.5">Generate a presentation slide structure.</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/5 bg-surface/50 backdrop-blur-md">
            <div className="relative flex items-center bg-surface-container border border-white/10 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:shadow-[0_0_15px_rgba(207,188,255,0.3)] transition-all duration-300">
              <input 
                className="w-full bg-transparent border-none text-on-surface font-body-base text-xs sm:text-sm p-2.5 sm:p-3 pr-10 focus:ring-0 placeholder:text-on-surface-variant/50 outline-none" 
                placeholder="Ask AI to expand or refine..." 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleGenerate(); }}
                disabled={isGenerating}
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-1.5 w-7 h-7 flex items-center justify-center bg-primary rounded-md text-on-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(207,188,255,0.5)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isGenerating ? <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span> : <span className="material-symbols-outlined text-[16px]">send</span>}
              </button>
            </div>
            <div className="flex justify-between items-center mt-1.5 px-1">
              <span className="font-label-sm text-[9px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">model_training</span>
                Model: GPT-4o
              </span>
              <span className="font-label-sm text-[9px] text-on-surface-variant">Tokens: ~420</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
