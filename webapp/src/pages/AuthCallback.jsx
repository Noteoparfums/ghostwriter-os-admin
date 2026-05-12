import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase auto-detects the tokens/code from the URL hash or query params
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          setStatus('error');
          setErrorMsg(error.message);
          return;
        }

        if (session) {
          setStatus('success');
          // Redirect to dashboard after a brief success message
          setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
          return;
        }

        // If no session yet, listen for auth state change (token exchange in progress)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            setStatus('success');
            setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
            subscription.unsubscribe();
          } else if (event === 'TOKEN_REFRESHED' && session) {
            setStatus('success');
            setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
            subscription.unsubscribe();
          }
        });

        // Timeout fallback — if nothing happens in 8 seconds, show manual login link
        setTimeout(() => {
          setStatus((prev) => {
            if (prev === 'verifying') {
              return 'error';
            }
            return prev;
          });
          setErrorMsg('Verification timed out. Please try signing in manually.');
        }, 8000);

      } catch (err) {
        setStatus('error');
        setErrorMsg(err.message || 'An unexpected error occurred.');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center relative overflow-hidden font-body-base">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-md px-4">
        <div className="glass-panel rounded-xl p-8 sm:p-10 shadow-[0_0_40px_-10px_rgba(207,188,255,0.15)] flex flex-col items-center w-full bg-surface-container-lowest/40 backdrop-blur-xl border border-white/10">
          
          {/* Logo */}
          <Link to="/" className="font-headline-lg-mobile text-[28px] leading-tight text-primary tracking-tighter mb-6 block hover:scale-105 transition-transform">
            GhostwriterOS.ai
          </Link>

          {/* VERIFYING STATE */}
          {status === 'verifying' && (
            <div className="flex flex-col items-center gap-5 animate-pulse">
              {/* Spinning Loader */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-tertiary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-on-surface mb-2">Verifying your email...</h2>
                <p className="text-sm text-on-surface-variant">Please wait while we confirm your account.</p>
              </div>
            </div>
          )}

          {/* SUCCESS STATE */}
          {status === 'success' && (
            <div className="flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-400 text-[32px]">check_circle</span>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-emerald-400 mb-2">Email Verified!</h2>
                <p className="text-sm text-on-surface-variant">Your account has been confirmed. Redirecting to dashboard...</p>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full animate-[progressBar_1.5s_ease-in-out_forwards]"></div>
              </div>
            </div>
          )}

          {/* ERROR STATE */}
          {status === 'error' && (
            <div className="flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-400 text-[32px]">error</span>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-red-400 mb-2">Verification Issue</h2>
                <p className="text-sm text-on-surface-variant mb-4">{errorMsg || 'Something went wrong during verification.'}</p>
              </div>
              <Link
                to="/login"
                className="w-full bg-primary text-on-primary font-body-base text-base font-semibold py-3 rounded-lg hover:bg-primary-fixed transition-all duration-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_25px_#cfbcff,inset_0_2px_4px_rgba(255,255,255,0.3)] text-center block"
              >
                Go to Sign In
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
