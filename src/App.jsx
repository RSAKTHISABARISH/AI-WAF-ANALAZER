import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield,
  Terminal,
  Cpu,
  Zap,
  Lock,
  AlertTriangle,
  Globe,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Trash2,
  ChevronRight,
  Database,
  Search,
  Scan,
  Radio,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const generateIP = () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
const paths = ['/api/v1/user', '/login', '/admin/panel', '/config/.env', '/auth/v2', '/wp-admin', '/etc/passwd', '/v3/data'];

const INITIAL_RULES = [
  { id: 1, type: 'STATIC', name: 'SQL_INJECT_V1', severity: 'CRITICAL' },
  { id: 2, type: 'STATIC', name: 'XSS_FILTER_G1', severity: 'HIGH' },
  { id: 3, type: 'ADAPTIVE', name: 'RATE_LIMIT_AUTO', severity: 'MEDIUM' },
];

import LandingPage from './LandingPage';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [rules, setRules] = useState(INITIAL_RULES);
  const [stats, setStats] = useState({ total: 1, blocked: 0, status: 'STABLE', efficiency: '100%' });
  const [chartData, setChartData] = useState([]);
  const [isLearning, setIsLearning] = useState(true);
  const [insights, setInsights] = useState([]);

  // Python Backend Integration
  useEffect(() => {
    // Explicitly use localhost for local development
    const wsUrl = 'ws://localhost:8000/ws';
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'TRAFFIC_UPDATE') {
        setRequests(p => [data.request, ...p].slice(0, 15));
        setStats(data.stats);
        setRules(data.rules);
        setInsights(data.insights);
        setChartData(p => [...p.slice(-14), { 
          time: data.request.time, 
          r: 1, 
          b: data.request.status === 'BLOCKED' ? 1 : 0 
        }]);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => socket.close();
  }, []);

  const handleFlush = useCallback(async () => {
    try {
      await fetch('http://localhost:8000/flush', { method: 'POST' });
    } catch (e) {
      console.error('Flush failed', e);
      setRules(INITIAL_RULES);
    }
  }, []);

  const handlePurge = useCallback(async () => {
    try {
      await fetch('http://localhost:8000/purge', { method: 'POST' });
    } catch (e) {
      console.error('Purge failed', e);
      setRequests([]);
      setStats({ total: 1, blocked: 0, status: 'STABLE', efficiency: '100%' });
      setChartData([]);
    }
  }, []);

  return (
    <div className="app-viewport" style={{ padding: '40px', maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1, minHeight: '100vh', color: '#fff' }}>
      <div className="mesh-gradient" />
      <div className="cyber-grid" />
      {/* Existing Dashboard Content... */}

      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '12px', border: '1px solid var(--accent-cyan)' }}>
            <Shield size={32} style={{ color: 'var(--accent-cyan)' }} className="animate-pulse-slow" />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', color: '#fff', margin: 0 }}>{import.meta.env.VITE_APP_TITLE || 'PROTECT'}<span style={{ color: 'var(--accent-cyan)' }}>OS</span></h1>
            <p style={{ fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', margin: '4px 0 0 0' }}>
              <Radio size={12} style={{ color: '#10b981' }} className="animate-pulse-slow" />
              NEURAL ADAPTIVE FIREWALL • ACTIVE PROTECTION
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => setIsLearning(!isLearning)}
            className={isLearning ? 'btn-cyan' : 'btn-ghost'}
            style={{ borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            <Cpu size={16} />
            {isLearning ? 'LEARNING ACTIVE' : 'SYSTEM PAUSED'}
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
        {[
          { label: 'Total Scanned', value: stats.total, icon: Search, color: 'cyan' },
          { label: 'Threats Blocked', value: stats.blocked, icon: Lock, color: 'rose' },
          { label: 'WAF Efficiency', value: stats.efficiency, icon: ShieldCheck, color: 'emerald' },
          { label: 'System Status', value: stats.status, icon: AlertTriangle, color: stats.status === 'STABLE' ? 'emerald' : 'rose' }
        ].map((s, i) => (
          <motion.div key={i} className="glass-panel" style={{ padding: '24px', position: 'relative' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: `rgba(var(--accent-${s.color}-rgb), 0.1)` }}>
                <s.icon size={20} style={{ color: `var(--accent-${s.color})` }} />
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>LIVE</span>
            </div>
            <p style={{ fontSize: '10px', fontWeight: 800, marginBottom: '4px', color: '#64748b', letterSpacing: '1px' }}>{s.label.toUpperCase()}</p>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', margin: 0 }}>{s.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* Unique Feature: Threat Origin Map & Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px', height: '300px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '12px', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={14} style={{ color: 'var(--accent-cyan)' }} /> GEOSPATIAL THREAT INTELLIGENCE
            </h3>
          </div>
          <div style={{ flex: 1, position: 'relative', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
             {requests.filter(r => r.status === 'BLOCKED').map((r, i) => (
                <motion.div 
                  key={r.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ 
                    position: 'absolute', 
                    // Mapping lat/lon simulation to % coordinates
                    left: `${50 + (r.geo.lon / 1.8)}%`, 
                    top: `${50 - (r.geo.lat / 0.9)}%`,
                    width: '8px', height: '8px', 
                    background: 'var(--accent-rose)', 
                    borderRadius: '50%',
                    boxShadow: '0 0 10px var(--accent-rose)'
                  }}
                >
                  <motion.div 
                    animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ width: '100%', height: '100%', background: 'var(--accent-rose)', borderRadius: '50%' }} 
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '8px', whiteSpace: 'nowrap', color: 'var(--accent-rose)', fontWeight: 800 }}>
                    {r.geo.country.toUpperCase()}
                  </div>
                </motion.div>
             ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', height: '300px' }}>
          <h3 style={{ fontSize: '12px', color: '#fff', margin: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={14} style={{ color: 'var(--accent-amber)' }} /> NEURAL BEHAVIORAL INSIGHTS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <AnimatePresence>
              {insights.map((insight, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  style={{ 
                    padding: '12px', 
                    borderRadius: '10px', 
                    background: 'rgba(255,170,0,0.05)', 
                    border: '1px solid rgba(255,170,0,0.1)',
                    fontSize: '11px',
                    color: 'var(--accent-amber)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <TrendingUp size={12} />
                  {insight.toUpperCase()}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column */}
        <div className="col-8" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Chart */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '14px', color: '#fff', margin: 0 }}>TRAFFIC INTELLIGENCE</h3>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '2px' }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b' }}>REQUESTS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--accent-rose)', borderRadius: '2px' }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b' }}>THREATS</span>
                </div>
              </div>
            </div>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="c" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-rose)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--accent-rose)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '10px' }} />
                  <Area animationDuration={400} type="monotone" dataKey="r" stroke="var(--accent-cyan)" fill="url(#c)" strokeWidth={2} />
                  <Area animationDuration={400} type="monotone" dataKey="b" stroke="var(--accent-rose)" fill="url(#r)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '12px', color: '#fff', margin: 0 }}>SECURITY OPERATION LOGS</h3>
            </div>
            <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', fontSize: '10px', color: '#64748b', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <th style={{ padding: '16px 24px' }}>TIMESTAMP</th>
                    <th style={{ padding: '16px 24px' }}>TARGET / SOURCE</th>
                    <th style={{ padding: '16px 24px' }}>REPUTATION</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center' }}>RISK</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '12px' }}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {requests.map((r) => (
                      <motion.tr key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '16px 24px' }}><span style={{ fontWeight: 700 }}>{r.time}</span></td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <code style={{ fontSize: '11px', color: '#94a3b8' }}>{r.path}</code>
                            <span style={{ color: 'var(--accent-cyan)', fontSize: '10px', fontWeight: 600 }}>{r.ip} • {r.geo.city}, {r.geo.code}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            fontSize: '9px', 
                            fontWeight: 800, 
                            color: r.reputation === 'CLEAN' ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                            padding: '2px 8px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '4px'
                          }}>
                            {r.reputation}
                          </span>
                        </td>
                        <td align="center" style={{ padding: '16px 24px' }}>
                          <span style={{ fontWeight: 800, color: r.score > 50 ? 'var(--accent-rose)' : '#64748b' }}>{r.score}</span>
                        </td>
                        <td align="right" style={{ padding: '16px 24px' }}>
                          <span className="status-badge" style={{
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontSize: '10px',
                            fontWeight: 800,
                            background: r.status === 'BLOCKED' ? 'rgba(255,0,85,0.1)' : 'rgba(0,255,163,0.1)',
                            color: r.status === 'BLOCKED' ? 'var(--accent-rose)' : 'var(--accent-emerald)',
                            border: `1px solid ${r.status === 'BLOCKED' ? 'rgba(255,0,85,0.2)' : 'rgba(0,255,163,0.2)'}`
                          }}>
                            {r.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Rules */}
          <div className="glass-panel" style={{ padding: '24px', borderTop: '4px solid var(--accent-amber)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '12px', margin: 0 }}>ADAPTIVE RULES</h3>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b' }}>{rules.length} ACTIVE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '430px', overflowY: 'auto' }}>
              <AnimatePresence initial={false}>
                {rules.map(rule => (
                  <motion.div key={rule.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '16px', borderRadius: '16px', background: 'rgba(255,170,0,0.05)', border: '1px solid rgba(255,170,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 900, color: 'var(--accent-amber)' }}>{rule.type}</span>
                      <span style={{ fontSize: '9px', color: 'var(--accent-rose)', fontWeight: 800 }}>{rule.severity}</span>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 700, margin: '4px 0 12px 0' }}>{rule.name}</p>
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} style={{ height: '100%', background: 'var(--accent-amber)', borderRadius: '10px' }} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* AI Engine Status */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '12px', marginBottom: '20px', margin: 0 }}>NEURAL ENGINE</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>PROCESSOR</span>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981' }}>ACTIVE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>LATENCY</span>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-cyan)' }}>1ms</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
                <button
                  onClick={handleFlush}
                  className="btn-ghost"
                  style={{ padding: '12px', fontSize: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: '#fff', cursor: 'pointer' }}
                >
                  FLUSH DB
                </button>
                <button
                  onClick={handlePurge}
                  className="btn-ghost"
                  style={{ padding: '12px', fontSize: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: '#fff', cursor: 'pointer' }}
                >
                  PURGE LOGS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '9px', color: '#64748b', letterSpacing: '2px', border: 0 }}>© 2026 PROTECTOS • CYBER DEFENSE SYSTEMS</p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span style={{ fontSize: '9px', color: '#64748b' }}>ENGINEERING EXCELLENCE</span>
          <Shield size={14} style={{ color: '#64748b' }} />
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('landing');

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onEnter={() => setView('dashboard')} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
