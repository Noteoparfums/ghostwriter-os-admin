import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <>
      <div className="flex-grow px-gutter max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
          <h1 className="font-display-xl text-display-xl text-on-background">Quiet Luxury for Power Users</h1>
          <p className="font-title-md text-title-md text-on-surface-variant max-w-2xl mx-auto">Select the terminal environment that matches your creative ambition. Transparent pricing, elite performance.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-bento-gap mb-16 items-start">
          {/* Free Tier */}
          <div className="bg-surface-container-lowest border border-white/10 rounded-xl p-6 hover:border-primary hover:shadow-[0_0_20px_rgba(207,188,255,0.3)] transition-all duration-300 group flex flex-col h-full">
            <div className="mb-6">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-1">Basic</h2>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display-xl text-display-xl">$0</span>
                <span className="font-body-base text-body-base text-on-surface-variant">/mo</span>
              </div>
              <p className="font-body-base text-body-base text-on-surface-variant mt-3">Essential tools for individual creators starting their journey.</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">5,000 AI words/month</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Standard models</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">1 Project workspace</span>
              </li>
            </ul>
            <Link to="/login" className="block text-center w-full py-2 border border-outline text-on-surface rounded-lg font-title-md text-title-md hover:bg-white/5 hover:scale-105 hover:shadow-[0_0_15px_rgba(207,188,255,0.5)] hover:border-primary hover:text-primary transition-all duration-300">
              Start for Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-surface-container-low border border-primary relative rounded-xl p-6 shadow-[0_0_30px_rgba(207,188,255,0.15)] hover:shadow-[0_0_40px_rgba(207,188,255,0.4)] transition-all duration-300 flex flex-col h-full transform md:-translate-y-3">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-0.5 rounded-full font-label-sm text-label-sm uppercase tracking-widest shadow-[0_0_10px_rgba(207,188,255,0.5)]">Power User</div>
            <div className="mb-6">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-1">Pro</h2>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display-xl text-display-xl">$49</span>
                <span className="font-body-base text-body-base text-on-surface-variant">/mo</span>
              </div>
              <p className="font-body-base text-body-base text-on-surface-variant mt-3">Unlimited terminal access and elite AI capabilities for professionals.</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Unlimited AI generation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Access to Elite Models (GPT-4, Claude 3 Opus)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Advanced contextual memory</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Unlimited workspaces</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Priority rendering queue</span>
              </li>
            </ul>
            <Link to="/login" className="block text-center w-full py-2 bg-primary text-on-primary rounded-lg font-title-md text-title-md hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(207,188,255,0.8)] transition-all duration-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]">
              Upgrade to Pro
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-surface-container-lowest border border-white/10 rounded-xl p-6 hover:border-primary hover:shadow-[0_0_20px_rgba(207,188,255,0.3)] transition-all duration-300 group flex flex-col h-full">
            <div className="mb-6">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-1">Teams</h2>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display-xl text-display-xl">$149</span>
                <span className="font-body-base text-body-base text-on-surface-variant">/user/mo</span>
              </div>
              <p className="font-body-base text-body-base text-on-surface-variant mt-3">Scalable architecture and team collaboration for agencies.</p>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Everything in Pro</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Shared team memory vaults</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Custom brand voice tuning</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                <span className="font-body-base text-body-base text-on-surface">Admin analytics dashboard</span>
              </li>
            </ul>
            <button className="w-full py-2 border border-outline text-on-surface rounded-lg font-title-md text-title-md hover:bg-white/5 hover:scale-105 hover:shadow-[0_0_15px_rgba(207,188,255,0.5)] hover:border-primary hover:text-primary transition-all duration-300">Contact Sales</button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-surface-container-lowest border border-white/10 rounded-xl overflow-hidden p-6">
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-6 text-center">Comprehensive Capabilities</h3>
          <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[600px] md:min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 font-title-md text-title-md text-on-surface w-1/3">Feature</th>
                  <th className="py-3 font-title-md text-title-md text-on-surface-variant text-center w-2/9">Basic</th>
                  <th className="py-3 font-title-md text-title-md text-primary text-center w-2/9">Pro</th>
                  <th className="py-3 font-title-md text-title-md text-on-surface-variant text-center w-2/9">Teams</th>
                </tr>
              </thead>
              <tbody className="font-body-base text-body-base text-on-surface-variant">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-on-surface">AI Model Access</td>
                  <td className="py-3 text-center">Standard (GPT-3.5)</td>
                  <td className="py-3 text-center text-primary font-medium">Elite (GPT-4, Opus)</td>
                  <td className="py-3 text-center">Elite + Custom</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-on-surface">Context Window</td>
                  <td className="py-3 text-center">8k tokens</td>
                  <td className="py-3 text-center text-primary font-medium">128k tokens</td>
                  <td className="py-3 text-center">Unlimited via RAG</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-on-surface">Export Formats</td>
                  <td className="py-3 text-center">TXT, MD</td>
                  <td className="py-3 text-center text-primary font-medium">PDF, DOCX, HTML</td>
                  <td className="py-3 text-center">All + Custom API</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 text-on-surface">Support Level</td>
                  <td className="py-3 text-center">Community</td>
                  <td className="py-3 text-center text-primary font-medium">Priority Email</td>
                  <td className="py-3 text-center">Dedicated Slack</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
