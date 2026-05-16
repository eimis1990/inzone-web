/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { Github, Sun, Moon, Terminal, Columns, Workflow, BrainCircuit, Mic, ChevronRight, Zap, Download, Users, GitBranch, GitPullRequest, Boxes, Play } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ElasticDotGrid } from './components/ElasticDotGrid';

gsap.registerPlugin(ScrollTrigger);

const ALL_FEATURES = [
  {
    topic: "ORCHESTRATION",
    title: "One Window. Fleet of Agents.",
    description: "Run several agents side-by-side. Zero context switching. Let a Lead Agent distribute tasks and oversee operations across sub-agents.",
    icon: <Users />
  },
  {
    topic: "PIPELINES",
    title: "Sequential Flow Tasks",
    description: "Chain your agents into pipelines. Sequential tasks pass context smoothly from one autonomous execution directly to the next.",
    icon: <Workflow />
  },
  {
    topic: "WORKSPACE",
    title: "Worktrees & Branches",
    description: "Isolate feature development in parallel branches without stepping on yourself. Save and restore customized pane layouts.",
    icon: <GitBranch />
  },
  {
    topic: "INTEGRATION",
    title: "Integrated Terminal & Preview",
    description: "A real shell inside every pane perfectly synchronized with processes. Plus, a built-in localhost preview window—no tab switching.",
    icon: <Terminal />
  },
  {
    topic: "COLLABORATION",
    title: "In-App PR & Visual Diff",
    description: "Review code changes intuitively. Review, approve, and ship code using the built-in diff review without leaving the workspace.",
    icon: <GitPullRequest />
  },
  {
    topic: "KNOWLEDGE",
    title: "Project Wiki & Voice",
    description: "Living documentation your agents can read and write. Feed complex instructions quickly using natural Voice Agent integrations.",
    icon: <BrainCircuit />
  },
  {
    topic: "EXTENSIBILITY",
    title: "Workers & MCP Native",
    description: "External tools integrated natively. Agents and CLI tools share one unified shelf for seamless environment interactions.",
    icon: <Boxes />
  }
];

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-neutral-800 selection:text-neutral-50 dark:selection:bg-neutral-500 dark:selection:text-neutral-50 bg-[#fafafa] dark:bg-[#0d0d0d] text-[#111] dark:text-[#e0e0e0] transition-colors overflow-x-hidden relative">
      <ElasticDotGrid theme={isDark ? 'dark' : 'light'} />
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-300 dark:border-[#222] bg-white/80 dark:bg-[#0d0d0d]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-900 dark:bg-[#fff] flex items-center justify-center rounded-sm">
              <span className="text-neutral-50 dark:text-[#0d0d0d] font-mono font-bold text-xs uppercase">IN</span>
            </div>
            <span className="font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase text-xl">Zone</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#features" className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors hidden sm:block">Features</a>
            <a href="#philosophy" className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors hidden sm:block">Philosophy</a>
            
            <div className="h-4 w-px bg-neutral-300 dark:bg-[#222] hidden sm:block"></div>
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors rounded-md"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href="https://github.com/eimis1990/inzone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-mono tracking-[0.4em] uppercase font-bold text-neutral-600 dark:text-[#666] mb-6 border border-transparent dark:border-[#333]">
                <Zap className="w-3 h-3" />
                <span>vLatest Alpha</span>
              </span>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-neutral-900 dark:text-[#e0e0e0] mb-6">
                THE MULTI-AGENT
                <br />
                <span className="text-[#777] italic font-mono lowercase tracking-tight block mt-2 font-normal">workspace</span>
              </h1>
              <p className="max-w-md mx-auto text-sm leading-relaxed text-neutral-600 dark:text-[#999] mb-10">
                Delegate, don't micromanage. INZONE is a sequential agent pipeline environment with worktrees, layout panes, and built-in visual diff reviews.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://github.com/eimis1990/inzone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-900 dark:bg-[#fff] text-neutral-50 dark:text-[#0d0d0d] px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-[#ccc] transition-all transform hover:-translate-y-1"
                >
                  <Download className="w-4 h-4" />
                  Install & Contribute
                </a>
                <a 
                  href="#features"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border border-neutral-300 dark:border-[#444] text-neutral-900 dark:text-[#fff] px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-[#222] transition-all transform hover:-translate-y-1"
                >
                  Explore Capabilities
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Abstract Visualization */}
        <section className="py-12 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto relative flex items-center justify-center">
            {/* Background Orbs */}
            <div className="absolute w-[450px] h-[450px] border border-neutral-200 dark:border-[#222] rounded-full opacity-50 pointer-events-none"></div>
            <div className="absolute w-[350px] h-[350px] border border-neutral-300 dark:border-[#333] rounded-full pointer-events-none"></div>
            <div className="absolute w-[250px] h-[250px] border border-neutral-400 dark:border-[#444] rounded-full orb-glow pointer-events-none hidden sm:block"></div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full aspect-video glass-panel rounded-xl p-2 sm:p-4 shadow-2xl relative z-10"
            >
              {/* Fake UI Header */}
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-3 h-3 rounded-full border border-neutral-300 dark:border-[#444] opacity-50"></div>
                <div className="w-3 h-3 rounded-full border border-neutral-300 dark:border-[#444] bg-neutral-300 dark:bg-[#444] opacity-50"></div>
                <div className="w-3 h-3 rounded-full border border-neutral-300 dark:border-[#444] opacity-50"></div>
                <div className="ml-auto flex gap-2">
                  <div className="h-6 w-24 bg-neutral-200/50 dark:bg-[#222]/50 rounded text-[10px] font-mono flex items-center px-2 text-neutral-500 dark:text-[#666]">~/projects/inzone</div>
                </div>
              </div>
              
              {/* Fake UI Panes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-2rem)]">
                {/* File Tree / Info Pane */}
                <div className="hidden md:flex flex-col gap-4 border border-neutral-200/50 dark:border-[#333] rounded bg-white/50 dark:bg-[#111]/50 p-4">
                  <div className="h-4 w-1/2 bg-neutral-200 dark:bg-[#333] rounded mb-4"></div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div 
                      key={i}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      className={`h-2 rounded ${i%2===0 ? 'bg-neutral-100 dark:bg-[#222]' : 'bg-neutral-300 dark:bg-[#444]'}`}
                    />
                  ))}
                </div>
                
                {/* Main Process Pane */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-4 border border-neutral-200/50 dark:border-[#333] rounded bg-white/50 dark:bg-[#111]/50 p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-neutral-100/50 dark:bg-[#222]/50 text-[10px] uppercase tracking-[0.2em] font-mono px-2 py-1 rounded-bl text-neutral-500 dark:text-[#666]">Target</div>
                  
                  {/* Task Flow Animation */}
                  <div className="flex-1 flex flex-col justify-center space-y-4 max-w-sm mx-auto w-full pt-4">
                    <TaskNode title="Initialize Lead Agent" icon={<BrainCircuit className="w-4 h-4" />} />
                    <ConnectionLine />
                    <TaskNode title="Flow: Build Sequential Pipeline" icon={<Workflow className="w-4 h-4" />} />
                    <ConnectionLine />
                    <TaskNode title="Execute Diff Review" icon={<Columns className="w-4 h-4" />} active />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Interactive Features Section */}
        <InteractiveFeaturesSection isDark={isDark} />

        {/* Demo Video Section */}
        <DemoVideoSection />

        {/* CTO Philosophy Block */}
        <section id="philosophy" className="py-32 px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-500 dark:text-[#666] mb-8">Design Philosophy</h2>
            <blockquote className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-[#e0e0e0] leading-[1.1] mb-8 tracking-tighter uppercase">
              "We don't need simply more chatbots. We need environments that orchestrate them.<br/><span className="text-neutral-500 dark:text-[#666]">Process, structure, and parallel paths over raw inference.</span>"
            </blockquote>
            <div className="stat-line mb-4"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-800 dark:text-[#e0e0e0]">INZONE Architecture</p>
          </div>
        </section>

        {/* Quick Start / Terminal Block */}
        <section className="py-24 px-6 relative z-10 bg-neutral-100 dark:bg-[#111] border-t border-neutral-200 dark:border-[#222]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-mono text-neutral-500 dark:text-[#666] tracking-[0.4em] uppercase mb-4 block">Get Started</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase leading-[1.1] mb-4">
                Initialize Your Flow
              </h2>
              <p className="text-neutral-600 dark:text-[#999] text-sm leading-relaxed font-mono max-w-sm mx-auto md:mx-0">
                Deploy INZONE globally and start orchestrating sequential agent environments right from your CLI in minutes.
              </p>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <div className="rounded-lg overflow-hidden border border-neutral-300 dark:border-[#333] shadow-2xl glass-panel relative">
                {/* Terminal Header */}
                <div className="bg-neutral-200 dark:bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-neutral-300 dark:border-[#333]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="ml-auto text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-widest">终端 bash</div>
                </div>
                {/* Terminal Body */}
                <div className="bg-neutral-50 dark:bg-black p-6 font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 space-y-3">
                  <div className="flex">
                    <span className="text-blue-500 mr-2">❯</span>
                    <span>npm install -g inzone-core</span>
                  </div>
                  <div className="flex text-neutral-500 dark:text-[#666] opacity-70">
                    <span>added 42 packages in 1.2s</span>
                  </div>
                  <div className="flex">
                    <span className="text-blue-500 mr-2">❯</span>
                    <span>inzone init --workspace="./project"</span>
                  </div>
                  <div className="flex text-green-500">
                    <span>✔ Environment orchestrated successfully.</span>
                  </div>
                   <div className="flex animate-pulse">
                    <span className="text-blue-500 mr-2">❯</span>
                    <span className="w-2 h-4 bg-neutral-400 dark:bg-[#fff] inline-block"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 relative z-10 bg-neutral-900 dark:bg-black text-white text-center border-t border-neutral-800 dark:border-[#222]">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
           <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] mb-6">
                 Ready to orchestrate?
              </h2>
              <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto mb-10">
                 Join the alpha. Start running multi-agent workflows out of the box and stop babysitting your processes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <a 
                   href="https://github.com/eimis1990/inzone"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all transform hover:-translate-y-1"
                 >
                   <Github className="w-4 h-4" />
                   View on GitHub
                 </a>
              </div>
           </div>
        </section>

      </main>

      {/* Minimal Footer */}
      <footer className="w-full flex flex-col md:flex-row items-center px-12 py-8 border-t border-neutral-200 dark:border-[#222] z-20 gap-8 lg:gap-12 bg-white dark:bg-[#0d0d0d] relative">
        <div className="absolute top-0 left-0 w-full h-1 shimmer pointer-events-none"></div>

        <div className="flex items-center gap-2 lg:mr-auto">
          <div className="w-8 h-8 bg-neutral-900 dark:bg-[#fff] flex items-center justify-center rounded-sm">
            <div className="w-4 h-4 bg-white dark:bg-[#0d0d0d] rounded-full"></div>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase dark:text-[#e0e0e0]">Inzone</span>
        </div>

        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-[#555] tracking-widest">Links</span>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
            <a href="https://github.com/eimis1990/inzone" className="text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-[#777] hover:text-neutral-900 dark:hover:text-white transition-colors">Repo</a>
            <a href="https://github.com/eimis1990/inzone/releases" className="text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-[#777] hover:text-neutral-900 dark:hover:text-white transition-colors">Releases</a>
            <a href="https://github.com/eimis1990/inzone/graphs/contributors" className="text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-[#777] hover:text-neutral-900 dark:hover:text-white transition-colors">Contributors</a>
          </div>
        </div>
        
        <div className="w-px h-10 bg-neutral-200 dark:bg-[#222] hidden md:block"></div>
        
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-[#555] tracking-widest">License</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black uppercase text-neutral-900 dark:text-white">MIT</span>
            <span className="text-[10px] text-neutral-500 dark:text-[#444] font-mono">Open Source</span>
          </div>
        </div>

        <div className="w-px h-10 bg-neutral-200 dark:bg-[#222] hidden lg:block"></div>
        
        <div className="flex flex-col items-center md:items-end">
          <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-[#555] tracking-widest">System Status</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-neutral-400 dark:bg-[#fff] rounded-full animate-pulse"></div>
            <span className="text-[11px] text-neutral-600 dark:text-[#aaa] font-mono uppercase">All Nodes Operational</span>
          </div>
        </div>

      </footer>
    </div>
  );
}

// Subcomponents

function InteractiveFeaturesSection({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.feature-card');
    const dots = gsap.utils.toArray('.progress-dot');
    
    if (cards.length === 0) return;

    // Set initial states
    cards.forEach((card: any, i) => {
      const img = card.querySelector('.feature-image');
      const text = card.querySelector('.feature-text');
      const sign = i % 2 === 0 ? 1 : -1;
      
      if (i === 0) {
        gsap.set(card, { autoAlpha: 1, zIndex: 10 });
        gsap.set(img, { x: 0, autoAlpha: 1 });
        gsap.set(text, { x: 0, autoAlpha: 1 });
      } else {
        gsap.set(card, { autoAlpha: 0, zIndex: 0 });
        gsap.set(img, { x: -100 * sign, autoAlpha: 0 });
        gsap.set(text, { x: 100 * sign, autoAlpha: 0 });
      }
    });

    gsap.set(dots, { opacity: 0.2 });
    gsap.set(dots[0], { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
      }
    });

    cards.forEach((card: any, i) => {
      if (i === 0) return; // skip first

      const prevCard = cards[i - 1] as HTMLElement;
      const prevImg = prevCard.querySelector('.feature-image');
      const prevText = prevCard.querySelector('.feature-text');
      const currImg = card.querySelector('.feature-image');
      const currText = card.querySelector('.feature-text');
      
      const prevSign = (i - 1) % 2 === 0 ? 1 : -1;

      // Animate out previous card children
      tl.to(prevImg, {
        x: -100 * prevSign,
        autoAlpha: 0,
        duration: 0.8,
      }, "+=0.4"); // pause before transition

      tl.to(prevText, {
        x: 100 * prevSign,
        autoAlpha: 0,
        duration: 0.8,
      }, "<");

      tl.to(prevCard, { autoAlpha: 0, duration: 0.8, zIndex: 0 }, "<"); 
      tl.to(dots[i - 1], { opacity: 0.2, duration: 0.5 }, "<");

      // Animate in current card
      tl.to(card, { autoAlpha: 1, duration: 0.8, zIndex: 10 }, "<0.2");
      
      tl.to(currImg, {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
      }, "<");
      
      tl.to(currText, {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
      }, "<");

      tl.to(dots[i], { opacity: 1, duration: 0.5 }, "<");
    });
    
    // Add a pause at the very end so the last card is visible for a bit
    tl.to({}, { duration: 1 });
    
  }, { scope: containerRef });

  return (
    <section id="features" ref={containerRef} className="relative w-full z-10 bg-neutral-100 dark:bg-[#111] border-y border-neutral-300 dark:border-[#222] h-screen overflow-hidden flex flex-col items-center justify-between py-12 md:py-20">
      
      <div className="text-center z-50 w-full px-6 pointer-events-none flex-shrink-0">
          <h2 className="text-[10px] font-mono tracking-[0.5em] text-neutral-500 dark:text-[#888] uppercase font-bold">Inzone Fleet Capabilities</h2>
      </div>

      <div className="relative w-full max-w-7xl flex-1 max-h-[700px] min-h-[400px] flex items-center justify-center pointer-events-none my-8 xl:px-12">
        <div className="absolute inset-x-4 md:inset-x-8 xl:inset-x-12 inset-y-0 bg-neutral-900 dark:bg-black rounded-3xl border border-neutral-800 dark:border-[#222] pointer-events-auto overflow-hidden shadow-2xl">
          {ALL_FEATURES.map((feature, i) => (
            <div key={i} className="feature-card absolute inset-0 w-full h-full flex pointer-events-none">
              <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 p-6 md:p-12 lg:p-16 items-center pointer-events-auto relative">
                
                <div className={`feature-image overflow-hidden md:col-span-7 lg:col-span-8 flex items-center justify-center z-10 w-full h-full border border-neutral-800 dark:border-[#222] bg-neutral-800 dark:bg-[#080808] rounded-2xl relative inner-shimmer shadow-lg ${i % 2 !== 0 ? 'md:order-last' : ''}`}>
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-400 to-transparent dark:from-white dark:to-transparent"></div>
                    
                    {/* Placeholder for future images */}
                    <img 
                      src="" 
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
                    />

                    <div className="text-neutral-500 dark:text-[#fff]">
                        {React.cloneElement(feature.icon as React.ReactElement, { className: 'w-12 h-12 md:w-24 md:h-24 opacity-30' })}
                    </div>
                </div>
                
                <div className={`feature-text md:col-span-5 lg:col-span-4 flex flex-col z-10 text-center md:text-left ${i % 2 !== 0 ? 'md:items-end md:text-right' : ''}`}>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-[#666] tracking-[0.4em] uppercase mb-4">{feature.topic}</span>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white dark:text-[#e0e0e0] uppercase leading-[1.1] mb-6">
                        {feature.title}
                    </h3>
                    <p className="text-neutral-400 dark:text-[#999] leading-relaxed max-w-lg font-mono text-[10px] md:text-xs uppercase tracking-tight mx-auto md:mx-0">
                      {feature.description}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="flex gap-3 z-50 p-4 rounded-full bg-white/10 dark:bg-black/90 shadow-lg border border-neutral-700 dark:border-[#333] flex-shrink-0 backdrop-blur-md">
          {ALL_FEATURES.map((_, i) => (
            <div key={i} className="progress-dot w-1.5 h-1.5 rounded-full bg-white/50 dark:bg-white" />
          ))}
      </div>

    </section>
  )
}

function DemoVideoSection() {
  return (
    <section id="demo" className="py-32 px-6 relative z-10 bg-white dark:bg-[#0a0a0a] border-b border-neutral-200 dark:border-[#222] min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-neutral-500 dark:text-[#666] tracking-[0.4em] uppercase mb-4 block">Quick Demo</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase leading-[1.1]">
            See Inzone in Action
          </h2>
        </div>
        
        <div className="relative w-full aspect-[16/10] md:aspect-video rounded-3xl border border-neutral-200 dark:border-[#333] shadow-2xl glass-panel flex items-center justify-center overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-3xl hover:border-neutral-300 dark:hover:border-[#444]">
          {/* Subtle background gradient / shimmer */}
          <div className="absolute inset-0 bg-neutral-100 dark:bg-[#111] inner-shimmer"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-300 via-transparent to-transparent dark:from-white dark:via-transparent dark:to-transparent"></div>
          
          {/* Faux UI Header */}
          <div className="absolute top-0 left-0 right-0 h-10 border-b border-neutral-200 dark:border-[#222] bg-white/50 dark:bg-black/50 backdrop-blur-md flex items-center px-4 gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-[#444]"></div>
              <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-[#444]"></div>
              <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-[#444]"></div>
          </div>

          {/* Interactive Play Button */}
          <div className="relative z-20 w-20 h-20 md:w-28 md:h-28 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-2xl transform transition-transform duration-500 group-hover:scale-110">
            <Play className="w-8 h-8 md:w-12 md:h-12 ml-1 md:ml-2" fill="currentColor" />
          </div>

          {/* Optional: floating elements or data points placeholder around the video could go here if we want to simulate complex UI */}
        </div>
      </div>
    </section>
  )
}

function TaskNode({ title, icon, active = false }: { title: string, icon: React.ReactNode, active?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`border rounded-md p-3 flex items-center gap-4 border-neutral-300 dark:border-[#444] ${
        active 
          ? 'bg-neutral-900 dark:bg-[#333] text-neutral-50 dark:text-[#fff]' 
          : 'bg-white/50 dark:bg-transparent text-neutral-700 dark:text-[#999]'
      }`}
    >
      <div className={`flex-shrink-0 opacity-80 ${active ? 'dark:text-[#fff]' : 'dark:text-[#666]'}`}>
        {icon}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wider">{title}</span>
      {active && (
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="ml-auto w-2 h-2 rounded-full bg-neutral-400 dark:bg-[#fff]"
        />
      )}
    </motion.div>
  );
}

function ConnectionLine() {
  return (
    <div className="flex justify-center my-[-8px] relative z-0">
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: '32px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-px bg-neutral-400 dark:bg-[#444]"
      />
    </div>
  );
}
