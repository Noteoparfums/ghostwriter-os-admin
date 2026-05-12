import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    const { error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', userId);
    
    if (!error) fetchUsers();
  };

  const handleUpgrade = async (userId) => {
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_tier: 'pro' })
      .eq('id', userId);
    
    if (!error) fetchUsers();
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action is irreversible.')) return;
    
    // Note: Deleting from profiles might cascade to auth.users if set up, 
    // but usually you need a service role or edge function for auth deletion.
    // For now we'll just delete the profile.
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    
    if (!error) fetchUsers();
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-lg text-on-surface">User Management</h2>
        <p className="font-body-base text-on-surface-variant">Control user access and subscription tiers.</p>
      </div>

      <div className="bg-surface-container-highest/20 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider">User</th>
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider">Registration</th>
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider">Tier</th>
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant">Loading user data...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-title-md text-sm text-on-surface">{user.email}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono">{user.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-base text-sm text-on-surface-variant">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full font-label-sm text-[10px] uppercase tracking-wide
                        ${user.subscription_tier === 'pro' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/10 text-on-surface-variant'}
                      `}>
                        {user.subscription_tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 font-label-sm text-xs
                        ${user.status === 'active' ? 'text-emerald-accent' : 'text-error'}
                      `}>
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-accent shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.5)]'}`}></div>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.subscription_tier !== 'pro' && (
                          <button 
                            onClick={() => handleUpgrade(user.id)}
                            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20"
                            title="Upgrade to Pro"
                          >
                            <span className="material-symbols-outlined text-[18px]">upgrade</span>
                          </button>
                        )}
                        <button 
                          onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')}
                          className={`p-2 rounded-lg transition-all border ${user.status === 'active' ? 'bg-error/10 text-error border-error/20 hover:bg-error/20' : 'bg-emerald-accent/10 text-emerald-accent border-emerald-accent/20 hover:bg-emerald-accent/20'}`}
                          title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                        >
                          <span className="material-symbols-outlined text-[18px]">{user.status === 'active' ? 'block' : 'check_circle'}</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 rounded-lg bg-white/5 text-on-surface-variant hover:text-error hover:bg-error/10 transition-all border border-white/10 hover:border-error/20"
                          title="Delete Account"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
