import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin', icon: 'dashboard' },
    { name: 'User Management', path: '/admin/users', icon: 'group' },
    { name: 'AI Generation Logs', path: '/admin/logs', icon: 'history' },
    { name: 'System Settings', path: '/admin/settings', icon: 'settings' },
  ];

  return (
    <div className="bg-[#050505] text-on-surface font-body-base antialiased selection:bg-primary selection:text-on-primary h-screen overflow-hidden flex">
      <style dangerouslySetInnerHTML={{__html: `
        .bg-grid-pattern {
            background-image: 
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }
      `}} />
      
      <input className="peer hidden" id="sidebar-toggle" type="checkbox" />
      
      {/* Sidebar */}
      <nav className="flex flex-col h-screen p-4 fixed left-0 top-0 bg-surface-container-lowest w-64 border-r border-white/5 z-50 transform -translate-x-full peer-checked:translate-x-0 lg:translate-x-0 transition-transform duration-300">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-error/20 flex items-center justify-center text-error font-bold border border-error/30 shadow-[0_0_15px_rgba(255,180,171,0.2)]">
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="font-headline-lg-mobile text-error tracking-tighter" style={{ fontSize: '1.125rem', lineHeight: '1.25rem' }}>Command Center</h1>
              <p className="font-label-sm text-[10px] text-error/70 uppercase tracking-widest mt-0.5">Level 5 Access</p>
            </div>
          </div>
          <label className="lg:hidden text-on-surface-variant hover:text-on-surface cursor-pointer" htmlFor="sidebar-toggle">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </label>
        </div>

        <ul className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-title-md text-sm
                  ${isActive 
                    ? 'text-error bg-error/10 border border-error/20 shadow-[0_0_15px_rgba(255,180,171,0.1)]' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 border border-transparent'}`
                }
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-white/5 pt-4">
           <button 
             onClick={handleSignOut}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:text-error hover:bg-error/10 transition-all duration-300 font-title-md text-sm group"
           >
             <span className="material-symbols-outlined text-[20px] group-hover:rotate-180 transition-transform duration-500">logout</span>
             Exit Admin Panel
           </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <label className="fixed inset-0 bg-black/80 z-40 lg:hidden hidden peer-checked:block backdrop-blur-md transition-opacity duration-300" htmlFor="sidebar-toggle"></label>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 relative flex flex-col w-full h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-surface-container-lowest border-b border-white/5 z-20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error">admin_panel_settings</span>
            <h1 className="font-title-md text-base text-error">Command Center</h1>
          </div>
          <label className="cursor-pointer text-on-surface hover:text-error transition-colors duration-300" htmlFor="sidebar-toggle">
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </label>
        </div>

        {/* Canvas / Page Content */}
        <div className="flex-1 relative bg-grid-pattern overflow-y-auto custom-scrollbar p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
