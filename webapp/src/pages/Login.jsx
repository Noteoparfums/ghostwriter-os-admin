import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // --- SIGN UP MODE ---
    if (isSignUp) {
      // Client-side validation
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        // Map common Supabase errors to user-friendly messages
        if (signUpError.message.includes('already registered') || signUpError.message.includes('already been registered')) {
          setError('This email is already in use. Try signing in instead.');
        } else if (signUpError.message.includes('password')) {
          setError('Password is too weak. Please use at least 6 characters.');
        } else {
          setError(signUpError.message);
        }
        setLoading(false);
        return;
      }

      // Check if email confirmation is required
      // If user is returned but no session, email confirmation is ON
      if (data?.user && !data?.session) {
        setSuccessMessage('Account created! Please check your email to verify your account before signing in.');
        setLoading(false);
        return;
      }

      // If we have a session, email confirmation is OFF — redirect immediately
      if (data?.session) {
        navigate('/dashboard');
        return;
      }

    // --- SIGN IN MODE ---
    } else {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      navigate('/dashboard');
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setSuccessMessage(null);
    setConfirmPassword('');
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center relative overflow-hidden font-body-base">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px]"></div>
      </div>
      {/* Main Authentication Container */}
      <main className="relative z-10 w-full max-w-md px-4 sm:px-gutter">
        <div className="glass-panel rounded-xl p-6 sm:p-8 shadow-[0_0_40px_-10px_rgba(207,188,255,0.15)] flex flex-col items-center w-full transition-all duration-300 bg-surface-container-lowest/40 backdrop-blur-xl border border-white/10">
          {/* Logo & Brand */}
          <div className="mb-8 text-center">
            <Link to="/" className="font-headline-lg-mobile text-[28px] leading-tight text-primary tracking-tighter mb-1.5 block hover:scale-105 transition-transform">GhostwriterOS.ai</Link>
            <p className="font-body-base text-sm text-on-surface-variant">
              {isSignUp ? 'Create your account to get started.' : 'Quiet Luxury for Power Users.'}
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="w-full mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm text-center animate-pulse">
              <span className="material-symbols-outlined text-[20px] align-middle mr-1.5">check_circle</span>
              {successMessage}
            </div>
          )}

          {/* Email/Password Authentication */}
          <form className="w-full mb-7" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="relative w-full mb-4 input-glow rounded-lg transition-all duration-300 group focus-within:shadow-[0_0_0_1px_#cfbcff,0_0_20px_-5px_#cfbcff]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px] transition-colors duration-300 group-focus-within:text-primary">mail</span>
              </div>
              <input 
                className="w-full bg-surface-container/50 border border-white/5 rounded-lg py-3 pl-10 pr-3 text-on-surface font-body-base text-sm focus:outline-none focus:border-transparent placeholder:text-on-surface-variant/50 transition-all duration-300" 
                id="email" 
                name="email" 
                placeholder="Enter your email address" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative w-full mb-4 input-glow rounded-lg transition-all duration-300 group focus-within:shadow-[0_0_0_1px_#cfbcff,0_0_20px_-5px_#cfbcff]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px] transition-colors duration-300 group-focus-within:text-primary">lock</span>
              </div>
              <input 
                className="w-full bg-surface-container/50 border border-white/5 rounded-lg py-3 pl-10 pr-3 text-on-surface font-body-base text-sm focus:outline-none focus:border-transparent placeholder:text-on-surface-variant/50 transition-all duration-300" 
                id="password" 
                name="password" 
                placeholder={isSignUp ? 'Create a password (min. 6 characters)' : 'Enter your password'}
                required 
                type="password"
                minLength={isSignUp ? 6 : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password Field (Sign Up only) */}
            {isSignUp && (
              <div className="relative w-full mb-4 input-glow rounded-lg transition-all duration-300 group focus-within:shadow-[0_0_0_1px_#cfbcff,0_0_20px_-5px_#cfbcff] animate-[fadeSlideIn_0.3s_ease-out]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px] transition-colors duration-300 group-focus-within:text-primary">lock_reset</span>
                </div>
                <input 
                  className="w-full bg-surface-container/50 border border-white/5 rounded-lg py-3 pl-10 pr-3 text-on-surface font-body-base text-sm focus:outline-none focus:border-transparent placeholder:text-on-surface-variant/50 transition-all duration-300" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="Confirm your password" 
                  required 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="material-symbols-outlined text-red-400 text-[18px]">error</span>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              className="w-full bg-primary text-on-primary font-body-base text-base font-semibold py-3 rounded-lg hover:bg-primary-fixed transition-all duration-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_25px_#cfbcff,inset_0_2px_4px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2" 
              type="submit"
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading
                ? (isSignUp ? 'Creating Account...' : 'Signing In...')
                : (isSignUp ? 'Create Account' : 'Sign In')
              }
            </button>
          </form>

          {/* Mode Toggle */}
          <div className="w-full text-center mb-7">
            <p className="font-body-base text-sm text-on-surface-variant">
              {isSignUp ? (
                <>Already have an account?{' '}
                  <button onClick={toggleMode} className="text-primary hover:underline transition-all font-semibold cursor-pointer bg-transparent border-none p-0">
                    Sign in here
                  </button>
                </>
              ) : (
                <>Don't have an account?{' '}
                  <button onClick={toggleMode} className="text-primary hover:underline transition-all font-semibold cursor-pointer bg-transparent border-none p-0">
                    Sign up here
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 mb-7">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Or continue with</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          {/* Social Logins */}
          <div className="w-full flex flex-col gap-3">
            <button className="w-full bg-transparent border border-white/10 hover:border-primary/50 text-on-surface font-body-base text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/5 hover:scale-[1.02]">
              <svg className="w-4 h-4 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                <path d="M1 1h22v22H1z" fill="none"></path>
              </svg>
              Google
            </button>
            <button className="w-full bg-transparent border border-white/10 hover:border-primary/50 text-on-surface font-body-base text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/5 hover:scale-[1.02]">
              <svg className="w-4 h-4 text-on-surface fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              GitHub
            </button>
          </div>
          {/* Footer Links */}
          <div className="mt-8 w-full text-center">
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              By continuing, you agree to our <a className="text-primary hover:underline transition-all" href="#">Terms of Service</a> and <a className="text-primary hover:underline transition-all" href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
