import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminSettings = () => {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState(null);

  // ─── API Health Status ─────────────────────────────────────
  const [apiStatus, setApiStatus] = useState({
    supabaseAuth: { online: false, checking: true },
    supabaseDB: { online: false, checking: true },
    aiEndpoint: { online: false, checking: true },
  });

  // ─── Load settings from Supabase ───────────────────────────
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('app_settings')
          .select('*')
          .eq('id', 'global')
          .single();

        if (!error && data) {
          setSystemPrompt(data.system_prompt || '');
          setMaintenanceMode(data.maintenance_mode || false);
        } else {
          // Settings row doesn't exist yet — use defaults
          setSystemPrompt('You are GhostwriterOS, a premium AI writing assistant for elite creators. Provide polished, well-structured content that sounds natural and professional.');
          setMaintenanceMode(false);
        }
      } catch (err) {
        console.warn('Failed to load settings:', err);
        setSystemPrompt('You are GhostwriterOS, a premium AI writing assistant for elite creators...');
      }
      setIsLoading(false);
    };

    loadSettings();
    checkApiHealth();
  }, []);

  // ─── Save settings to Supabase ─────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({
          id: 'global',
          system_prompt: systemPrompt,
          maintenance_mode: maintenanceMode,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      if (error) {
        // If the table doesn't exist, show a helpful message
        if (error.message.includes('does not exist') || error.code === '42P01') {
          setSaveMessage({ type: 'warning', text: 'The app_settings table doesn\'t exist yet. Create it in Supabase with columns: id (text PK), system_prompt (text), maintenance_mode (bool), updated_at (timestamptz).' });
        } else {
          setSaveMessage({ type: 'error', text: `Save failed: ${error.message}` });
        }
      } else {
        setSaveMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (err) {
      setSaveMessage({ type: 'error', text: `Error: ${err.message}` });
    }
    setIsSaving(false);
  };

  // ─── Toggle maintenance mode ───────────────────────────────
  const handleMaintenanceToggle = async () => {
    const newValue = !maintenanceMode;
    setMaintenanceMode(newValue);

    // Persist immediately
    try {
      await supabase
        .from('app_settings')
        .upsert({
          id: 'global',
          maintenance_mode: newValue,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
    } catch (err) {
      console.warn('Failed to save maintenance mode:', err);
    }
  };

  // ─── Real API Health Check ─────────────────────────────────
  const checkApiHealth = async () => {
    // Check Supabase Auth
    try {
      const { data } = await supabase.auth.getSession();
      setApiStatus((prev) => ({
        ...prev,
        supabaseAuth: { online: true, checking: false },
      }));
    } catch {
      setApiStatus((prev) => ({
        ...prev,
        supabaseAuth: { online: false, checking: false },
      }));
    }

    // Check Supabase DB
    try {
      const { error } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
      setApiStatus((prev) => ({
        ...prev,
        supabaseDB: { online: !error, checking: false },
      }));
    } catch {
      setApiStatus((prev) => ({
        ...prev,
        supabaseDB: { online: false, checking: false },
      }));
    }

    // Check AI Endpoint
    const aiUrl = import.meta.env.VITE_OLLAMA_API_URL || '';
    try {
      // Simple connectivity check — just see if the host responds
      if (aiUrl) {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 5000);
        const resp = await fetch(aiUrl, {
          method: 'OPTIONS',
          signal: controller.signal,
        }).catch(() => null);
        setApiStatus((prev) => ({
          ...prev,
          aiEndpoint: { online: resp !== null, checking: false },
        }));
      } else {
        setApiStatus((prev) => ({
          ...prev,
          aiEndpoint: { online: false, checking: false },
        }));
      }
    } catch {
      setApiStatus((prev) => ({
        ...prev,
        aiEndpoint: { online: false, checking: false },
      }));
    }
  };

  const StatusDot = ({ status }) => {
    if (status.checking) {
      return (
        <span className="text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined animate-spin text-[12px]">progress_activity</span>
          Checking
        </span>
      );
    }
    return (
      <span className={`flex items-center gap-1 ${status.online ? 'text-emerald-accent' : 'text-error'}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${status.online ? 'bg-emerald-accent shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.5)]'}`}></div>
        {status.online ? 'Online' : 'Offline'}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-lg text-on-surface">System Settings</h2>
        <p className="font-body-base text-on-surface-variant">Global configuration for the GhostwriterOS environment.</p>
      </div>

      {/* Save Feedback */}
      {saveMessage && (
        <div className={`p-4 rounded-xl border ${
          saveMessage.type === 'success' ? 'bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent' :
          saveMessage.type === 'warning' ? 'bg-tertiary/10 border-tertiary/30 text-tertiary' :
          'bg-error/10 border-error/30 text-error'
        } font-body-base text-sm flex items-start gap-2`}>
          <span className="material-symbols-outlined text-[18px] mt-0.5">
            {saveMessage.type === 'success' ? 'check_circle' : saveMessage.type === 'warning' ? 'warning' : 'error'}
          </span>
          {saveMessage.text}
        </div>
      )}

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
                  value={isLoading ? 'Loading...' : systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-4 text-on-surface font-body-base text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none custom-scrollbar disabled:opacity-50"
                  placeholder="Enter system prompt instructions..."
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving || isLoading}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-title-md text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> : <span className="material-symbols-outlined text-[18px]">save</span>}
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
                onClick={handleMaintenanceToggle}
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
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-title-md text-sm text-on-surface">API Status</h4>
              <button
                onClick={checkApiHealth}
                className="text-on-surface-variant hover:text-primary transition-colors"
                title="Refresh status"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Supabase Auth</span>
                <StatusDot status={apiStatus.supabaseAuth} />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Supabase DB</span>
                <StatusDot status={apiStatus.supabaseDB} />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">AI Endpoint</span>
                <StatusDot status={apiStatus.aiEndpoint} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
