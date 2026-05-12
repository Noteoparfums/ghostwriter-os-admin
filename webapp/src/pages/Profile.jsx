import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[#050505] text-[#cfbcff]">Loading Profile...</div>;

  return (
    <div className="bg-[#050505] text-on-surface min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-container-lowest border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary/30 flex items-center justify-center text-primary text-4xl font-bold mb-4 shadow-[0_0_40px_rgba(207,188,255,0.2)]">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <h1 className="font-headline-lg text-2xl text-on-surface">{profile?.full_name || 'Elite Creator'}</h1>
          <p className="font-body-base text-on-surface-variant">{user?.email}</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span className="font-title-md text-sm">Subscription</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-label-sm text-[10px] uppercase tracking-widest border border-primary/30">
              {profile?.subscription_tier || 'Free'} Plan
            </span>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">calendar_today</span>
              <span className="font-title-md text-sm">Joined</span>
            </div>
            <span className="text-on-surface-variant font-body-base text-xs">
              {new Date(profile?.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <Link 
            to="/dashboard" 
            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-on-surface font-title-md text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            Back to Dashboard
          </Link>
          <Link 
            to="/" 
            className="w-full py-3 bg-primary text-on-primary rounded-xl font-title-md text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(207,188,255,0.3)]"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
