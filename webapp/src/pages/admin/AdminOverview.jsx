import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGenerations: 0,
    activeSubscriptions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      
      // Fetch total users from profiles
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch total generations from logs
      const { count: genCount, error: genError } = await supabase
        .from('generation_logs')
        .select('*', { count: 'exact', head: true });

      // Fetch active subscriptions (mocking logic or checking subscription_tier !== 'free')
      const { count: subCount, error: subError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .neq('subscription_tier', 'free');

      setStats({
        totalUsers: userCount || 0,
        totalGenerations: genCount || 0,
        activeSubscriptions: subCount || 0
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Registered Users', value: stats.totalUsers, icon: 'group', color: 'text-primary', bg: 'bg-primary/10' },
    { name: 'Total AI Generations', value: stats.totalGenerations, icon: 'auto_awesome', color: 'text-secondary', bg: 'bg-secondary/10' },
    { name: 'Active Subscriptions', value: stats.activeSubscriptions, icon: 'subscriptions', color: 'text-tertiary', bg: 'bg-tertiary/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-lg text-on-surface">Platform Overview</h2>
        <p className="font-body-base text-on-surface-variant">Real-time metrics for GhostwriterOS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={card.name} 
            className="bg-surface-container-highest/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/10 shadow-2xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                <span className="material-symbols-outlined text-[24px]">{card.icon}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">trending_up</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-title-md text-sm text-on-surface-variant uppercase tracking-wider">{card.name}</h3>
              <p className="font-display-xl text-4xl text-on-surface font-bold">
                {loading ? '...' : card.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts or more detailed stats */}
      <div className="bg-surface-container-highest/20 border border-white/5 rounded-2xl p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary">analytics</span>
          <h3 className="font-title-md text-lg text-on-surface">Usage Activity</h3>
        </div>
        <div className="h-64 flex items-center justify-center border border-white/5 rounded-xl border-dashed">
          <p className="text-on-surface-variant font-body-base">Activity chart integration pending...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
