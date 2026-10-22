/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Collapsible Navigation Sidebar
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Sliders, 
  Binary, 
  LineChart, 
  Trophy, 
  Radio, 
  Lightbulb, 
  Database, 
  FileSpreadsheet, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';

export type NavTab = 
  | 'DASHBOARD'
  | 'SIMULATOR'
  | 'SCORING_XAI'
  | 'CLUSTERING'
  | 'EVALUATION'
  | 'LEADERBOARD'
  | 'AUDIENCE'
  | 'RECOMMENDATIONS'
  | 'DATASET'
  | 'REPORTS'
  | 'DOCUMENTATION';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    { id: 'DASHBOARD' as NavTab, label: 'Executive Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { id: 'SIMULATOR' as NavTab, label: 'Challenge Simulator', icon: Gamepad2, badge: 'Interactive' },
    { id: 'SCORING_XAI' as NavTab, label: 'AI Scoring & SHAP', icon: Sliders, badge: 'XAI' },
    { id: 'CLUSTERING' as NavTab, label: 'Behavioral Clusters', icon: Binary, badge: 'K-Means' },
    { id: 'EVALUATION' as NavTab, label: 'Model Evaluation', icon: LineChart, badge: 'AUC 0.94' },
    { id: 'LEADERBOARD' as NavTab, label: 'Contestant Rankings', icon: Trophy },
    { id: 'AUDIENCE' as NavTab, label: 'Audience & TRP', icon: Radio },
    { id: 'RECOMMENDATIONS' as NavTab, label: 'Smart Recommendations', icon: Lightbulb },
    { id: 'DATASET' as NavTab, label: 'Dataset & Quality', icon: Database },
    { id: 'REPORTS' as NavTab, label: 'Automated Reports', icon: FileSpreadsheet },
    { id: 'DOCUMENTATION' as NavTab, label: 'Methodology & Setup', icon: BookOpen },
  ];

  return (
    <aside
      className={`relative z-20 flex flex-col bg-[#070b14] border-r border-slate-800/80 transition-all duration-300 ease-in-out shrink-0 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top section: toggle collapse button */}
      <div className="flex items-center justify-between p-3 border-b border-slate-800/60">
        {!collapsed && (
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2">
            Intelligence Modules
          </span>
        )}
        <button
          onClick={onToggleCollapse}
          className={`p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ${
            collapsed ? 'mx-auto' : ''
          }`}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer group text-left ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white border border-blue-500/30 shadow-sm shadow-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 group-hover:text-blue-400 group-hover:bg-slate-850'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className={`truncate ${isActive ? 'font-semibold text-blue-200' : ''}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold ${
                        isActive
                          ? 'bg-blue-500/30 text-blue-300'
                          : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Candidate / Job Alignment Footer Card */}
      {!collapsed && (
        <div className="p-3 m-2 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-900/90 border border-blue-900/40 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[11px] font-bold text-slate-200">IFI AI Intern Role</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed mb-2">
            Tailored candidate portfolio demonstrating ML classification, K-Means clustering, SHAP XAI, and full-stack decision intelligence.
          </p>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Production Ready • 100% Functional
          </div>
        </div>
      )}
    </aside>
  );
};
