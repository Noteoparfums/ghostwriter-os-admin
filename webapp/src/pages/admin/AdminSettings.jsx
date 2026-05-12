import React, { useState } from 'react';

const AdminSettings = () => {
  const [systemPrompt, setSystemPrompt] = useState('You are GhostwriterOS, a premium AI writing assistant for elite creators...');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save logic - in a real app, this would update a 'settings' table in Supabase
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings updated successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-lg text-on-surface">System Settings</h2>
        <p className="font-body-base text-on-surface-variant">Global configuration for the GhostwriterOS environment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-highest/20 border border-white/5 rounded-2xl p-6 lg:p-8 backdrop-blur-xl">
            <h3 className="font-title-md text-lg text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">psychology</span>
              AI Core Instructions
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                  Base System Prompt
                </label>
                <textarea 
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-4 text-on-surface font-body-base text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none custom-scrollbar"
                  placeholder="Enter system prompt instructions..."
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-title-md text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span> : <span className="material-symbols-outlined text-[18px]">save</span>}
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="bg-surface-container-highest/20 border border-white/5 rounded-2xl p-6 lg:p-8 backdrop-blur-xl">
            <h3 className="font-title-md text-lg text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">emergency</span>
              Security & Maintenance
            </h3>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="space-y-1">
                <p className="font-title-md text-sm text-on-surface">Maintenance Mode</p>
                <p className="font-body-base text-xs text-on-surface-variant">Redirect all public traffic to a maintenance screen.</p>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${maintenanceMode ? 'bg-error' : 'bg-white/10'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h4 className="font-title-md text-sm text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">info</span>
              Admin Tip
            </h4>
            <p className="font-body-base text-xs text-on-surface-variant leading-relaxed">
              Updating the System Prompt affects all new generations immediately. Existing logs will preserve the previous prompt context.
            </p>
          </div>
          
          <div className="bg-surface-container-highest/20 border border-white/5 rounded-2xl p-6">
            <h4 className="font-title-md text-sm text-on-surface mb-4">API Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Supabase Auth</span>
                <span className="text-emerald-accent flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-accent"></div>
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Supabase DB</span>
                <span className="text-emerald-accent flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-accent"></div>
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Ollama Edge</span>
                <span className="text-emerald-accent flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-accent"></div>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
