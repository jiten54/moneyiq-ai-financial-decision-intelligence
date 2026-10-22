/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Top Navigation Bar
 */

import React from 'react';
import { 
  Sparkles, 
  Tv, 
  ShieldAlert, 
  Flame, 
  HelpCircle, 
  Play, 
  Search,
  Bell,
  Cpu
} from 'lucide-react';

interface NavbarProps {
  activeEpisode: number | 'ALL';
  onSelectEpisode: (ep: number | 'ALL') => void;
  onOpenSimulator: () => void;
  onOpenDocs: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeEpisode,
  onSelectEpisode,
  onOpenSimulator,
  onOpenDocs,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Brand & Reality Show Context */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
          <div className="w-full h-full bg-[#0c1322] rounded-[11px] flex items-center justify-center">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>MoneyIQ</span>
              <span className="text-xs px-1.5 py-0.5 rounded font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                AI v2.4
              </span>
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Pipeline
            </span>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <Tv className="w-3 h-3 text-indigo-400 inline" />
            <span className="font-medium text-slate-300">India&apos;s Future Investors (IFI)</span>
            <span className="text-slate-600">•</span>
            <span className="hidden md:inline text-slate-400">Financial Reality Show Intelligence</span>
          </p>
        </div>
      </div>

      {/* Middle: Search & Episode Filter */}
      <div className="hidden lg:flex items-center gap-3 flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search contestants, cities, clusters..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg p-1 text-xs">
          <span className="text-[10px] uppercase font-mono text-slate-400 px-1.5">Ep:</span>
          <select
            value={activeEpisode}
            onChange={(e) => onSelectEpisode(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="ALL" className="bg-slate-900">All (1-10)</option>
            {Array.from({ length: 10 }).map((_, i) => (
              <option key={i + 1} value={i + 1} className="bg-slate-900">
                Episode {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center gap-2">
        {/* Synthetic Data Disclaimer Pill */}
        <div 
          title="Ethical Data Science: 100% synthetic simulated dataset for candidate evaluation. No proprietary broadcast data."
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Synthetic Data (Seed: 42)</span>
        </div>

        <button
          onClick={onOpenSimulator}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Simulate Challenge</span>
          <span className="sm:hidden">Simulate</span>
        </button>

        <button
          onClick={onOpenDocs}
          title="Methodology, Architecture & Role Alignment"
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-750 transition-all cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
