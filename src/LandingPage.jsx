import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Cpu, ArrowRight, MousePointer2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const LandingPage = ({ onEnter }) => {
  const handleLaunch = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2ff', '#0066ff', '#ffffff']
    });
    setTimeout(onEnter, 800);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#ffffff', 
      color: '#0f172a',
      fontFamily: '"Inter", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{ 
        position: 'absolute', 
        top: '-10%', 
        left: '-10%', 
        width: '40%', 
        height: '40%', 
        background: 'radial-gradient(circle, rgba(0,242,255,0.05) 0%, transparent 70%)',
        zIndex: 0
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '-10%', 
        right: '-10%', 
        width: '50%', 
        height: '50%', 
        background: 'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Nav */}
      <nav style={{ 
        padding: '30px 60px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', background: '#0066ff', borderRadius: '12px' }}>
            <Shield size={24} color="white" />
          </div>
          <span style={{ fontWeight: 900, fontSize: '20px', letterSpacing: '-1px' }}>
            AI-WAF<span style={{ color: '#0066ff' }}>ADAPTIVE</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '40px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
          <span>TECHNOLOGY</span>
          <span>SECURITY</span>
          <span>ENTERPRISE</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ 
        padding: '100px 60px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '10px', 
            background: 'rgba(0,102,255,0.05)', 
            padding: '8px 20px', 
            borderRadius: '100px',
            color: '#0066ff',
            fontSize: '12px',
            fontWeight: 800,
            marginBottom: '30px',
            border: '1px solid rgba(0,102,255,0.1)'
          }}>
            <Zap size={14} /> NEXT-GENERATION NEURAL PROTECTION
          </div>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            marginBottom: '20px',
            letterSpacing: '-3px',
            color: '#0f172a'
          }}>
            Secure Your Digital Asset <br /> With Behavioral AI.
          </h1>
          
          <div style={{ marginBottom: '40px' }}>
            <img 
              src="file:///C:/Users/Sakthi/.gemini/antigravity/brain/b31e7563-4542-4040-8002-d50653e50885/ai_waf_hero_mesh_1773376839142.png" 
              alt="AI WAF Shield"
              style={{ width: '100%', maxWidth: '800px', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,102,255,0.1)' }}
            />
          </div>

          <p style={{ 
            fontSize: '18px', 
            color: '#64748b', 
            maxWidth: '600px', 
            margin: '0 auto 50px auto',
            lineHeight: 1.6
          }}>
            Our adaptive firewall uses neural engine heuristics to detect coordinated threats, geospatial anomalies, and zero-day vulnerabilities in real-time.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLaunch}
              style={{ 
                padding: '20px 40px', 
                background: '#0f172a', 
                color: 'white', 
                border: 'none', 
                borderRadius: '16px', 
                fontSize: '16px', 
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              LAUNCH SUITE <ArrowRight size={20} />
            </motion.button>
            <button style={{ 
              padding: '20px 40px', 
              background: 'transparent', 
              color: '#0f172a', 
              border: '2px solid #e2e8f0', 
              borderRadius: '16px', 
              fontSize: '16px', 
              fontWeight: 700,
              cursor: 'pointer'
            }}>
              VIEW DOCUMENTATION
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '30px', 
          marginTop: '120px' 
        }}>
          {[
            { icon: Cpu, title: 'Neural Engine', desc: 'Real-time threat scoring using advanced neural networks.' },
            { icon: Globe, title: 'Geo-Intelligence', desc: 'Identify attack origins and visualize global risk patterns.' },
            { icon: MousePointer2, title: 'Behavioral AI', desc: 'Detect coordinated DDoS and session anomalies instantly.' }
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              whileHover={{ y: -10 }}
              style={{ 
                padding: '40px', 
                background: '#f8fafc', 
                borderRadius: '30px', 
                textAlign: 'left',
                border: '1px solid #f1f5f9'
              }}
            >
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'white', 
                borderRadius: '15px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
                color: '#0066ff'
              }}>
                <f.icon size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* High-End Stats Ribbon */}
      <div style={{ 
        background: '#0f172a', 
        color: 'white', 
        padding: '60px 0', 
        marginTop: '100px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around' }}>
          {[
            { v: '1ms', l: 'LATENCY' },
            { v: '99.9%', l: 'EFFICIENCY' },
            { v: '24/7', l: 'PROTECTION' },
            { v: '0-DAY', l: 'DETECTION' }
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>{s.v}</div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
