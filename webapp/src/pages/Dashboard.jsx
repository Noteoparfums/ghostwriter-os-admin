import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateAIResponse } from '../lib/ai';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const navigate = useNavigate();

  // ─── Core State ───────────────────────────────────────────
  const [documentText, setDocumentText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      content: 'Welcome to GhostwriterOS. I\'m your AI co-creator — start typing in the editor, then ask me to expand, refine, or brainstorm ideas. I have full context of your document.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // ─── User Session State ───────────────────────────────────
  const [userEmail, setUserEmail] = useState('');
  const [userTier, setUserTier] = useState('free');
  const [userInitial, setUserInitial] = useState('U');

  // ─── Copied state for toolbar ─────────────────────────────
  const [copied, setCopied] = useState(false);

  // ─── Refs ─────────────────────────────────────────────────
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // ─── Fetch logged-in user ─────────────────────────────────
  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const email = session.user.email || '';
        setUserEmail(email);
        setUserInitial(email.charAt(0).toUpperCase() || 'U');

        // Fetch subscription tier from profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', session.user.id)
          .single();
        if (profile?.subscription_tier) {
          setUserTier(profile.subscription_tier);
        }
      }
    };
    loadUser();
  }, []);

  // ─── Logout ───────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // ─── Download document as .txt ────────────────────────────
  const handleDownload = () => {
    if (!documentText.trim()) return;
    const blob = new Blob([documentText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ghostwriter-document.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Copy all document text ───────────────────────────────
  const handleCopyAll = async () => {
    if (!documentText.trim()) return;
    try {
      await navigator.clipboard.writeText(documentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  // ─── AI Message Handler ───────────────────────────────────
  const handleSendMessage = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed || isTyping) return;

    // 1. Add user message to history
    const userMessage = { role: 'user', content: trimmed };
    setChatHistory((prev) => [...prev, userMessage]);

    // 2. Clear input
    setChatInput('');

    // 3. Show typing indicator
    setIsTyping(true);

    try {
      // 4. Send to AI with document context
      const response = await generateAIResponse(trimmed, documentText);

      // 5. Append AI response
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: response },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠ Error: ${error.message}. Please check your API connection and try again.`,
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ─── Insert AI Text into Document ─────────────────────────
  const handleInsertIntoDocument = (text) => {
    setDocumentText((prev) => {
      const separator = prev.trim() ? '\n\n' : '';
      return prev + separator + text;
    });
    // Flash the editor briefly to indicate insertion
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  // ─── Suggested Prompts ────────────────────────────────────
  const suggestedPrompts = [
    {
      icon: 'psychology',
      label: 'Expand this section',
      description: 'Elaborate on the current document content.',
      color: 'primary',
    },
    {
      icon: 'edit_note',
      label: 'Improve the writing',
      description: 'Refine tone, clarity, and flow.',
      color: 'tertiary',
    },
  ];

  const handleSuggestedPrompt = (label) => {
    setChatInput(label);
  };

  // ─── Word count ───────────────────────────────────────────
  const wordCount = documentText.trim() ? documentText.trim().split(/\s+/).length : 0;
  const charCount = documentText.length;

  return (
    <div className="bg-[#050505] text-on-surface font-body-base antialiased selection:bg-primary selection:text-on-primary h-screen overflow-hidden flex">
      <style dangerouslySetInnerHTML={{__html: `
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
        .editor-textarea {
          caret-color: #cfbcff;
          resize: none;
        }
        .editor-textarea::placeholder {
          color: rgba(230, 224, 233, 0.25);
        }
        .editor-textarea:focus {
          outline: none;
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        .typing-dot:nth-child(1) { animation: typingDot 1.4s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation: typingDot 1.4s ease-in-out 0.2s infinite; }
        .typing-dot:nth-child(3) { animation: typingDot 1.4s ease-in-out 0.4s infinite; }
        @keyframes messageSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .message-enter {
          animation: messageSlideIn 0.3s ease-out forwards;
        }
        .insert-btn {
          transition: all 0.2s ease;
        }
        .insert-btn:hover {
          background: rgba(207, 188, 255, 0.15);
          box-shadow: 0 0 12px rgba(207, 188, 255, 0.2);
        }
      `}} />

      <input className="peer hidden" id="sidebar-toggle" type="checkbox" />

      {/* ═══════════════════ SideNavBar ═══════════════════ */}
      <nav className="flex flex-col h-screen p-4 fixed left-0 top-0 bg-surface-container-lowest w-56 border-r border-white/5 z-50 transform -translate-x-full peer-checked:translate-x-0 lg:translate-x-0 transition-transform duration-300">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">G</div>
            <div>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter" style={{ fontSize: '1.125rem', lineHeight: '1.25rem' }}>GhostwriterOS</h1>
              <p className="font-label-sm text-[10px] text-primary/70">Elite Creator</p>
            </div>
          </div>
          <label className="lg:hidden text-on-surface-variant hover:text-on-surface cursor-pointer" htmlFor="sidebar-toggle">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </label>
        </div>

        <button className="mb-6 w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg py-2 px-3 font-title-md text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(207,188,255,0.4)]">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
          New Project
        </button>

        <ul className="flex flex-col gap-1 flex-grow">
          <li>
            <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary bg-primary/10 font-bold transition-all duration-300 hover:scale-105 font-title-md text-sm">
              <span className="material-symbols-outlined text-[20px]">home</span>
              Home
            </Link>
          </li>
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 hover:scale-105 font-title-md text-sm" href="#">
              <span className="material-symbols-outlined text-[20px]">hub</span>
              My Maps
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 hover:scale-105 font-title-md text-sm" href="#">
              <span className="material-symbols-outlined text-[20px]">database</span>
              Knowledge Base
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 hover:scale-105 font-title-md text-sm" href="#">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              Settings
            </a>
          </li>
        </ul>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-3 p-3 bg-surface-container/50 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm border border-primary/30">{userInitial}</div>
            <div className="flex-1 min-w-0">
              <p className="font-title-md text-sm text-on-surface truncate">{userEmail || 'Loading...'}</p>
              <p className="font-label-sm text-[10px] text-on-surface-variant capitalize">{userTier} Plan</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-all duration-300 font-title-md text-sm group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:rotate-180 transition-transform duration-500">logout</span>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <label className="fixed inset-0 bg-black/50 z-40 lg:hidden hidden peer-checked:block backdrop-blur-sm transition-opacity duration-300" htmlFor="sidebar-toggle"></label>

      {/* ═══════════════════ Main Content ═══════════════════ */}
      <main className="flex-1 lg:ml-56 relative flex flex-col lg:flex-row w-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-3 bg-surface-container-lowest border-b border-white/5 z-20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">G</div>
            <h1 className="font-title-md text-base text-primary">GhostwriterOS</h1>
          </div>
          <label className="cursor-pointer text-on-surface hover:text-primary transition-colors duration-300" htmlFor="sidebar-toggle">
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </label>
        </div>

        {/* ─────────── Text Editor (Right Canvas) ─────────── */}
        <div className="flex-1 relative bg-grid-pattern h-full overflow-hidden flex flex-col">
          {/* Editor Top Bar */}
          <div className="flex items-center justify-between p-3 lg:p-4 border-b border-white/5 bg-surface/60 backdrop-blur-xl z-10">
            <div className="flex items-center gap-3">
              <div className="bg-surface-container-highest/80 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">edit_document</span>
                <h2 className="font-title-md text-xs sm:text-sm text-on-surface">Untitled Document</h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-on-surface-variant">
                <span className="font-label-sm text-[10px] bg-white/5 px-2 py-1 rounded-md border border-white/5">
                  {wordCount} words
                </span>
                <span className="font-label-sm text-[10px] bg-white/5 px-2 py-1 rounded-md border border-white/5">
                  {charCount} chars
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleDownload} disabled={!documentText.trim()} className="w-8 h-8 rounded-lg bg-surface/80 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300 hover:scale-105 hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed" title="Download as .txt">
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>
              <button onClick={handleCopyAll} disabled={!documentText.trim()} className="w-8 h-8 rounded-lg bg-surface/80 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-300 hover:scale-105 hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed" title={copied ? 'Copied!' : 'Copy All'}>
                <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
              </button>
            </div>
          </div>

          {/* The Actual Text Editor */}
          <div className="flex-1 overflow-hidden p-4 lg:p-8">
            <textarea
              ref={textareaRef}
              className="editor-textarea custom-scrollbar w-full h-full bg-transparent text-on-surface font-body-base text-sm sm:text-base leading-relaxed tracking-wide"
              placeholder="Start typing your ideas here...

This is your writing canvas. Pour your thoughts, drafts, and ideas here. The AI co-creator on the right has full context of everything you write — ask it to expand sections, improve your prose, brainstorm new angles, or generate entirely new content.

Tips:
• Write freely — don't worry about perfection
• Ask the AI to refine specific paragraphs
• Use 'Insert into Document' to weave AI suggestions right in"
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              spellCheck="true"
            />
          </div>
        </div>

        {/* ─────────── AI Co-Creator (Chat Panel) ─────────── */}
        <aside className="w-full lg:w-80 xl:w-96 h-[50vh] lg:h-full bg-surface-container-lowest border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] lg:shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex-shrink-0">
          {/* Header */}
          <div className="p-3 lg:p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
              <h2 className="font-title-md text-sm sm:text-base text-on-surface">AI Co-Creator</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Online"></span>
              <span className="font-label-sm text-[10px] text-on-surface-variant">Online</span>
            </div>
          </div>

          {/* ─── Chat History ─── */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 custom-scrollbar" id="chat-container">
            {chatHistory.map((msg, index) => (
              <div key={index} className="message-enter">
                {msg.role === 'assistant' ? (
                  /* ── AI Message ── */
                  <div className="flex flex-col gap-1.5">
                    <div className={`bg-primary/5 border ${msg.isError ? 'border-red-500/30' : 'border-primary/20'} rounded-xl p-3 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_10px_rgba(207,188,255,0.1)]`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="material-symbols-outlined text-primary text-[14px]">auto_awesome</span>
                        <span className="font-label-sm text-[10px] text-primary/70">GhostwriterOS</span>
                      </div>
                      <p className="font-body-base text-xs sm:text-sm text-on-surface whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                    {/* Insert into Document button — only for non-error AI messages, skip the welcome */}
                    {!msg.isError && index > 0 && (
                      <button
                        onClick={() => handleInsertIntoDocument(msg.content)}
                        className="insert-btn self-start flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-on-surface-variant hover:text-primary font-label-sm text-[10px] ml-1"
                      >
                        <span className="material-symbols-outlined text-[12px]">add_to_photos</span>
                        Insert into Document
                      </button>
                    )}
                  </div>
                ) : (
                  /* ── User Message ── */
                  <div className="bg-surface-container-high rounded-xl p-3 self-end max-w-[85%] transition-all duration-300 hover:bg-surface-container-highest">
                    <p className="font-body-base text-xs sm:text-sm text-on-surface">{msg.content}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="message-enter bg-primary/5 border border-primary/20 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-primary text-[14px] animate-spin">progress_activity</span>
                  <span className="font-label-sm text-[10px] text-primary/70">GhostwriterOS is thinking...</span>
                </div>
                <div className="flex items-center gap-1.5 px-1">
                  <span className="typing-dot w-2 h-2 rounded-full bg-primary/60"></span>
                  <span className="typing-dot w-2 h-2 rounded-full bg-primary/60"></span>
                  <span className="typing-dot w-2 h-2 rounded-full bg-primary/60"></span>
                </div>
              </div>
            )}

            {/* Invisible scroll anchor */}
            <div ref={chatEndRef} />
          </div>

          {/* ─── Suggested Prompts ─── */}
          {chatHistory.length <= 1 && !isTyping && (
            <div className="px-3 pb-2">
              <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 px-1">Suggested Prompts</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedPrompt(prompt.label)}
                    className={`bg-surface-container border border-white/5 hover:border-${prompt.color}/50 hover:bg-${prompt.color}/5 rounded-lg p-2.5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(207,188,255,0.2)] group flex items-start gap-2.5`}
                  >
                    <span className={`material-symbols-outlined text-${prompt.color}/70 group-hover:text-${prompt.color} text-[16px] mt-0.5 transition-colors duration-300`}>{prompt.icon}</span>
                    <div>
                      <span className={`block font-title-md text-[11px] text-on-surface group-hover:text-${prompt.color} transition-colors duration-300`}>{prompt.label}</span>
                      <span className="block font-body-base text-[9px] text-on-surface-variant mt-0.5">{prompt.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Input Area ─── */}
          <div className="p-3 border-t border-white/5 bg-surface/50 backdrop-blur-md">
            <div className="relative flex items-center bg-surface-container border border-white/10 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:shadow-[0_0_15px_rgba(207,188,255,0.3)] transition-all duration-300">
              <input
                id="chat-input"
                className="w-full bg-transparent border-none text-on-surface font-body-base text-xs sm:text-sm p-2.5 sm:p-3 pr-10 focus:ring-0 placeholder:text-on-surface-variant/50 outline-none"
                placeholder="Ask AI to expand, refine, or brainstorm..."
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                disabled={isTyping}
              />
              <button
                id="send-button"
                onClick={handleSendMessage}
                disabled={isTyping || !chatInput.trim()}
                className="absolute right-1.5 w-7 h-7 flex items-center justify-center bg-primary rounded-md text-on-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(207,188,255,0.5)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isTyping
                  ? <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                  : <span className="material-symbols-outlined text-[16px]">send</span>
                }
              </button>
            </div>
            <div className="flex justify-between items-center mt-1.5 px-1">
              <span className="font-label-sm text-[9px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">model_training</span>
                Model: Llama 3
              </span>
              <span className="font-label-sm text-[9px] text-on-surface-variant">
                {chatHistory.length - 1} messages
              </span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
