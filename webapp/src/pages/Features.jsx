import React from 'react';

export default function Features() {
  return (
    <>
      <div className="flex flex-col gap-12 max-w-6xl mx-auto w-full px-container-padding">
        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display-xl text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Architect Your Intelligence.</h1>
          <p className="font-headline-lg text-lg sm:text-2xl text-on-surface-variant">
            Dive deep into the core modules that power GhostwriterOS. Built for high-end creators who demand precision and control.
          </p>
        </header>

        {/* Feature 1: Mind Mapping for LLMs */}
        <section className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 space-y-4 order-2 lg:order-1 mt-6 lg:mt-0">
            <div className="inline-flex items-center gap-1.5 bg-primary-container/20 px-2.5 py-1 rounded-full border border-primary/30 text-primary font-label-sm text-[11px]">
              <span className="material-symbols-outlined text-xs">schema</span>
              Cognitive Architecture
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface">Mind Mapping for LLMs</h2>
            <p className="font-body-base text-sm sm:text-base text-on-surface-variant">
              Visualize your AI's thought process. Construct intricate narrative webs, define character arcs, and establish logical dependencies before generating a single word. The node-based interface allows you to sculpt context dynamically.
            </p>
            <ul className="space-y-2.5 font-body-base text-sm sm:text-base text-on-surface-variant mt-6">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary mt-0.5 text-lg">check_circle</span>
                <span>Drag-and-drop context nodes to build complex prompt chains.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary mt-0.5 text-lg">check_circle</span>
                <span>Assign weights to specific narrative elements visually.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary mt-0.5 text-lg">check_circle</span>
                <span>Real-time logical consistency checking across nodes.</span>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 h-[300px] lg:h-[400px] glass-panel rounded-xl overflow-hidden relative group">
            {/* Mockup of Node Interface */}
            <div className="absolute inset-0 p-4 flex items-center justify-center">
              <img 
                alt="Mind mapping interface" 
                className="w-full h-full object-cover rounded-lg opacity-60 mix-blend-screen" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4RgIPnuXqMzuoaxcWBrfIgNiLI_DctiZ9Vdi-8_7H83AN-fA6Q3IaY-81WM8vByKNrcJ3cPeyqpXgjvGFW0gGCgJzUTKWK9ra6E7TWGvXa_cjwBY3Os7Qp-v8RRznvb3bXkMyMPIACHqTCxgANtpsC3ODt2YGv8I0EHpa6XWPqBNxECsyKL4-byazJJ0vLrx_tYSi6BMI5wjoXqOqyEtq4-tjci1RXPFU-CvwCZfxUFCamLmPU8jLZdEvxq5TyRmLX7LGAnBra1-S"
              />
              {/* Overlay UI Elements to simulate the interface */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-32 sm:w-40 h-16 sm:h-20 bg-surface-container-highest/80 backdrop-blur-md rounded-lg border border-primary/50 absolute top-1/4 left-1/4 flex flex-col p-2 shadow-lg box-shadow-[inset_0_0_20px_rgba(207,188,255,0.1)]">
                  <span className="font-title-md text-xs sm:text-sm text-primary mb-0.5">Character Arc</span>
                  <span className="font-label-sm text-[10px] sm:text-xs text-on-surface-variant">Weight: 0.85</span>
                </div>
                <div className="w-40 sm:w-56 h-20 sm:h-24 bg-surface-container-highest/80 backdrop-blur-md rounded-lg border border-tertiary/50 absolute bottom-1/4 right-1/4 flex flex-col p-2 shadow-lg">
                  <span className="font-title-md text-xs sm:text-sm text-tertiary mb-0.5">Plot Twist Trigger</span>
                  <span className="font-label-sm text-[10px] sm:text-xs text-on-surface-variant">Depends on: Node A</span>
                </div>
                {/* SVG line connecting them roughly */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  <line className="opacity-50" stroke="#cfbcff" strokeDasharray="5,5" strokeWidth="1.5" x1="35%" x2="65%" y1="35%" y2="65%"></line>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Source-Driven Generation */}
        <section className="flex flex-col lg:flex-row gap-8 items-center mt-8">
          <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px] glass-panel rounded-xl overflow-hidden relative p-4 mb-6 lg:mb-0">
            {/* Mockup of Source Library */}
            <div className="h-full w-full flex flex-col gap-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-title-md text-sm sm:text-base text-on-surface font-semibold">Source Matrix</span>
                <span className="material-symbols-outlined text-primary text-xl">filter_list</span>
              </div>
              {/* Source Items */}
              <div className="bg-surface-container-low/50 border border-white/5 rounded-lg p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(207,188,255,0.2)] transition-all duration-300 cursor-pointer">
                <div className="bg-primary/20 p-1.5 rounded text-primary">
                  <span className="material-symbols-outlined text-sm sm:text-base">picture_as_pdf</span>
                </div>
                <div className="flex-grow">
                  <div className="font-title-md text-xs sm:text-sm text-on-surface">Quantum Mechanics Primer.pdf</div>
                  <div className="font-label-sm text-[10px] sm:text-[11px] text-on-surface-variant">Analyzed • 45 pages • 98% Relevance</div>
                </div>
                <div className="hidden sm:block w-12 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-primary"></div>
                </div>
              </div>

              <div className="bg-surface-container-low/50 border border-white/5 rounded-lg p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(207,188,255,0.2)] transition-all duration-300 cursor-pointer">
                <div className="bg-tertiary/20 p-1.5 rounded text-tertiary">
                  <span className="material-symbols-outlined text-sm sm:text-base">link</span>
                </div>
                <div className="flex-grow">
                  <div className="font-title-md text-xs sm:text-sm text-on-surface">Historical Timeline DB</div>
                  <div className="font-label-sm text-[10px] sm:text-[11px] text-on-surface-variant">Live Sync • 12k entries • 75% Relevance</div>
                </div>
                <div className="hidden sm:block w-12 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-tertiary"></div>
                </div>
              </div>

              <div className="bg-surface-container-low/50 border border-white/5 rounded-lg p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(207,188,255,0.2)] transition-all duration-300 cursor-pointer opacity-60">
                <div className="bg-surface-container-highest p-1.5 rounded text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm sm:text-base">article</span>
                </div>
                <div className="flex-grow">
                  <div className="font-title-md text-xs sm:text-sm text-on-surface">Character Bios V2.txt</div>
                  <div className="font-label-sm text-[10px] sm:text-[11px] text-on-surface-variant">Processing...</div>
                </div>
                <span className="material-symbols-outlined animate-spin text-on-surface-variant text-sm sm:text-base">sync</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4 pl-0 lg:pl-8">
            <div className="inline-flex items-center gap-1.5 bg-tertiary-container/20 px-2.5 py-1 rounded-full border border-tertiary/30 text-tertiary font-label-sm text-[11px]">
              <span className="material-symbols-outlined text-xs">database</span>
              Ground Truth Control
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface">Source-Driven Generation</h2>
            <p className="font-body-base text-sm sm:text-base text-on-surface-variant">
              Anchor your AI's outputs to reality—or your custom reality. Upload PDFs, connect live databases, or link external repositories. GhostwriterOS strictly references your curated library, eliminating hallucinations and ensuring absolute tonal consistency.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className="glass-panel p-3 rounded-lg">
                <span className="material-symbols-outlined text-primary mb-1.5 block text-2xl">verified_user</span>
                <h3 className="font-title-md text-sm sm:text-base text-on-surface mb-0.5">Zero Hallucinations</h3>
                <p className="font-label-sm text-xs text-on-surface-variant">Strict bounding to provided context windows.</p>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <span className="material-symbols-outlined text-primary mb-1.5 block text-2xl">hub</span>
                <h3 className="font-title-md text-sm sm:text-base text-on-surface mb-0.5">Vector Search</h3>
                <p className="font-label-sm text-xs text-on-surface-variant">Lightning-fast semantic retrieval across gigabytes of text.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
