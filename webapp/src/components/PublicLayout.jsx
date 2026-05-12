import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

export default function PublicLayout() {
  const location = useLocation()
  
  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-3 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-xl transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <Link to="/" className="font-headline-lg-mobile text-primary tracking-tighter">GhostwriterOS.ai</Link>
        </div>
        <div className="hidden md:flex gap-6">
          <Link 
            to="/features" 
            className={`${location.pathname === '/features' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'} font-body-base hover:bg-white/5 px-2 rounded-t transition-colors duration-300 ease-in-out`}
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            className={`${location.pathname === '/pricing' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'} transition-colors duration-300 ease-in-out font-body-base hover:bg-white/5 px-2 rounded`}
          >
            Pricing
          </Link>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-300 ease-in-out font-body-base hover:bg-white/5 px-2 rounded" href="#">Documentation</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-on-surface-variant hover:text-on-surface font-title-md transition-colors duration-300 ease-in-out hidden sm:block">
            Login
          </Link>
          <Link to="/login" className="glow-button-primary px-4 py-1.5 rounded-lg font-title-md inline-block">
            Start Creating
          </Link>
        </div>
      </nav>

      <main className="flex-grow pt-20 pb-16">
        <Outlet />
      </main>

      <footer className="w-full py-8 px-gutter flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-white/5">
        <div className="mb-4 md:mb-0">
          <span className="font-title-md text-on-surface">GhostwriterOS.ai</span>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-5 mb-4 md:mb-0">
          <a className="font-body-base text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 ease-in-out opacity-80 hover:opacity-100" href="#">Terms of Service</a>
          <a className="font-body-base text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 ease-in-out opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
          <a className="font-body-base text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 ease-in-out opacity-80 hover:opacity-100" href="#">Status</a>
          <a className="font-body-base text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 ease-in-out opacity-80 hover:opacity-100" href="#">Contact</a>
        </div>
        <div className="text-center md:text-left">
          <span className="font-body-base text-label-sm text-on-surface-variant opacity-80">© 2024 GhostwriterOS.ai. Quiet Luxury for Power Users.</span>
        </div>
      </footer>
    </>
  )
}
