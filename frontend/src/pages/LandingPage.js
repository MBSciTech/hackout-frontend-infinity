import React, { useState, useEffect, useRef } from 'react';

const LandingPage = () => {
  const [mapExpanded, setMapExpanded] = useState(false);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const statsRef = useRef(null);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Counter animation
  const animateCounters = () => {
    if (countersAnimated) return;
    
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
      const suffix = counter.textContent.replace(/[\d\.\,]/g, '');
      let current = 0;
      const increment = target / 100;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 20);
    });
    
    setCountersAnimated(true);
  };

  // Intersection Observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersAnimated]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
          navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating particles effect
  useEffect(() => {
    const createFloatingParticle = () => {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(0, 255, 136, 0.6)';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = window.innerHeight + 'px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '-1';
      
      document.body.appendChild(particle);
      
      const duration = Math.random() * 3000 + 2000;
      particle.animate([
        { transform: 'translateY(0px)', opacity: 0 },
        { transform: 'translateY(-20px)', opacity: 1, offset: 0.1 },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
      ], {
        duration: duration,
        easing: 'linear'
      }).onfinish = () => particle.remove();
    };

    const interval = setInterval(createFloatingParticle, 800);
    return () => clearInterval(interval);
  }, []);

  const toggleMapView = () => {
    setMapExpanded(!mapExpanded);
  };

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.height, rect.width);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) ripple.remove();
    }, 600);
  };

  return (
    <>
      <style>{`
        :root {
          --primary-dark: #0a0a0a;
          --secondary-dark: #1a1a1a;
          --accent-green: #00ff88;
          --muted-green: #2d5a3d;
          --text-light: #e0e0e0;
          --text-muted: #a0a0a0;
          --gradient-green: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          --glow-green: 0 0 20px rgba(0, 255, 136, 0.3);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: var(--primary-dark);
          color: var(--text-light);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.1;
          background: 
            radial-gradient(circle at 20% 50%, var(--accent-green) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--accent-green) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, var(--accent-green) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .navbar {
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 255, 136, 0.2);
          transition: all 0.3s ease;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          padding: 1rem 0;
        }

        .navbar-brand {
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--accent-green) !important;
          text-shadow: var(--glow-green);
          text-decoration: none;
        }

        .nav-link {
          color: var(--text-light) !important;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
          text-decoration: none;
          margin: 0 1rem;
        }

        .nav-link:hover {
          color: var(--accent-green) !important;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 50%;
          background: var(--gradient-green);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(26, 26, 26, 0.9) 100%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%2300ff88" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          z-index: -1;
        }

        .hero-content h1 {
          font-size: 4rem;
          font-weight: 800;
          background: var(--gradient-green);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          animation: fadeInUp 1s ease;
        }

        .hero-content p {
          font-size: 1.3rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease 0.3s both;
        }

        .btn-primary-custom {
          background: var(--gradient-green);
          border: none;
          padding: 15px 40px;
          font-weight: 600;
          font-size: 1.1rem;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          box-shadow: var(--glow-green);
          animation: fadeInUp 1s ease 0.6s both;
          position: relative;
          overflow: hidden;
          color: var(--primary-dark);
        }

        .btn-primary-custom:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.4);
          color: var(--primary-dark);
        }

        .btn-outline-success-custom {
          border: 2px solid var(--accent-green);
          color: var(--accent-green);
          background: transparent;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-outline-success-custom:hover {
          background: var(--accent-green);
          color: var(--primary-dark);
          box-shadow: var(--glow-green);
        }

        .hero-visual {
          position: relative;
          animation: fadeInRight 1s ease 0.9s both;
        }

        .map-preview {
          width: 100%;
          height: 400px;
          background: var(--secondary-dark);
          border-radius: 20px;
          border: 2px solid rgba(0, 255, 136, 0.3);
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .map-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .pulse-dot {
          width: 20px;
          height: 20px;
          background: var(--accent-green);
          border-radius: 50%;
          position: absolute;
          animation: pulse 2s infinite;
        }

        .pulse-dot:nth-child(1) { top: 30%; left: 20%; animation-delay: 0s; }
        .pulse-dot:nth-child(2) { top: 60%; left: 70%; animation-delay: 0.7s; }
        .pulse-dot:nth-child(3) { top: 80%; left: 40%; animation-delay: 1.4s; }

        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 255, 136, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .features {
          padding: 100px 0;
          background: var(--secondary-dark);
          position: relative;
        }

        .section-title {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title h2 {
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent-green);
          margin-bottom: 1rem;
        }

        .feature-card {
          background: rgba(26, 26, 26, 0.8);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 15px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
          height: 100%;
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-green);
          box-shadow: 0 20px 40px rgba(0, 255, 136, 0.1);
        }

        .feature-icon {
          font-size: 3rem;
          color: var(--accent-green);
          margin-bottom: 1.5rem;
          display: block;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-light);
        }

        .feature-desc {
          color: var(--text-muted);
          line-height: 1.7;
        }

        .stats {
          padding: 80px 0;
          background: var(--primary-dark);
        }

        .stat-item {
          text-align: center;
          margin-bottom: 2rem;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 800;
          background: var(--gradient-green);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .use-cases {
          padding: 100px 0;
          background: var(--secondary-dark);
        }

        .use-case-item {
          background: rgba(10, 10, 10, 0.6);
          border-left: 4px solid var(--accent-green);
          padding: 30px;
          margin-bottom: 30px;
          border-radius: 0 15px 15px 0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .use-case-item:hover {
          background: rgba(10, 10, 10, 0.8);
          transform: translateX(10px);
        }

        .use-case-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .use-case-item:hover::before {
          left: 100%;
        }

        .use-case-icon {
          color: var(--accent-green);
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .use-case-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-light);
        }

        .use-case-desc {
          color: var(--text-muted);
        }

        .cta {
          padding: 100px 0;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 204, 106, 0.1) 100%);
          text-align: center;
        }

        .cta h2 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-light);
        }

        .cta p {
          font-size: 1.2rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }

        .footer {
          background: var(--primary-dark);
          border-top: 1px solid rgba(0, 255, 136, 0.2);
          padding: 40px 0;
        }

        .interactive-map {
          background: var(--secondary-dark);
          border-radius: 15px;
          padding: 20px;
          margin: 50px 0;
          border: 2px solid rgba(0, 255, 136, 0.3);
          position: relative;
          height: ${mapExpanded ? '500px' : '300px'};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .interactive-map:hover {
          border-color: var(--accent-green);
          box-shadow: var(--glow-green);
        }

        .floating-icons {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-icon {
          position: absolute;
          color: var(--accent-green);
          animation: floatIcon 4s ease-in-out infinite;
        }

        .floating-icon:nth-child(1) { top: 20%; left: 15%; animation-delay: 0s; }
        .floating-icon:nth-child(2) { top: 70%; left: 80%; animation-delay: 1s; }
        .floating-icon:nth-child(3) { top: 50%; left: 60%; animation-delay: 2s; }
        .floating-icon:nth-child(4) { top: 30%; left: 70%; animation-delay: 3s; }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-10px) scale(1.1); opacity: 1; }
        }

        .glow-text {
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        .card-dark {
          background: rgba(26, 26, 26, 0.9);
          border: 1px solid rgba(0, 255, 136, 0.2);
          backdrop-filter: blur(10px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -15px;
        }

        .col-lg-6, .col-md-4, .col-md-6, .col-md-3 {
          padding: 0 15px;
          margin-bottom: 30px;
        }

        .col-lg-6 { flex: 0 0 50%; }
        .col-md-4 { flex: 0 0 33.333333%; }
        .col-md-6 { flex: 0 0 50%; }
        .col-md-3 { flex: 0 0 25%; }

        .d-flex {
          display: flex;
        }

        .align-items-center {
          align-items: center;
        }

        .justify-content-center {
          justify-content: center;
        }

        .justify-content-between {
          justify-content: space-between;
        }

        .gap-3 {
          gap: 1rem;
        }

        .flex-wrap {
          flex-wrap: wrap;
        }

        .text-center {
          text-align: center;
        }

        .text-md-end {
          text-align: right;
        }

        .mb-3 { margin-bottom: 1rem; }
        .mb-5 { margin-bottom: 3rem; }
        .me-2 { margin-right: 0.5rem; }
        .me-3 { margin-right: 1rem; }
        .mt-3 { margin-top: 1rem; }

        .text-success { color: var(--accent-green) !important; }
        .text-muted { color: var(--text-muted) !important; }
        .text-light { color: var(--text-light) !important; }

        .badge {
          display: inline-block;
          padding: 0.25em 0.6em;
          font-size: 0.75em;
          font-weight: 700;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 0.25rem;
        }

        .bg-success {
          background-color: var(--accent-green) !important;
          color: var(--primary-dark) !important;
        }

        .bg-dark {
          background-color: var(--secondary-dark) !important;
        }

        .border-success {
          border-color: var(--accent-green) !important;
        }

        .card {
          border-radius: 0.375rem;
          border: 1px solid rgba(255, 255, 255, 0.125);
        }

        .progress {
          display: flex;
          height: 1rem;
          overflow: hidden;
          font-size: 0.75rem;
          background-color: var(--secondary-dark);
          border-radius: 0.25rem;
        }

        .progress-bar {
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          transition: width 0.6s ease;
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 { font-size: 2.5rem; }
          .hero-content p { font-size: 1.1rem; }
          .section-title h2 { font-size: 2.2rem; }
          .stat-number { font-size: 2.5rem; }
          .col-lg-6, .col-md-4, .col-md-6, .col-md-3 { 
            flex: 0 0 100%; 
          }
          .interactive-map {
            height: 250px !important;
          }
          .row {
            flex-direction: column;
          }
        }

        @media (max-width: 576px) {
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .btn-primary-custom, .btn-outline-success-custom {
            padding: 12px 25px;
            font-size: 0.9rem;
          }
          
          .feature-icon {
            font-size: 2.5rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="bg-animation"></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="#home">
            <i className="fas fa-atom me-2"></i>HydroMap Pro
          </a>
          <div className="d-flex">
            <a className="nav-link" href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
              Features
            </a>
            <a className="nav-link" href="#users" onClick={(e) => { e.preventDefault(); scrollToSection('users'); }}>
              Users
            </a>
            <a className="nav-link" href="#impact" onClick={(e) => { e.preventDefault(); scrollToSection('impact'); }}>
              Impact
            </a>
            <a className="nav-link" href="#demo" onClick={(e) => { e.preventDefault(); scrollToSection('demo'); }}>
              Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="glow-text">Green Hydrogen Infrastructure Mapping & Optimization</h1>
                <p>Visualize, analyze, and optimize hydrogen ecosystem development with our cutting-edge map-based platform. Drive strategic investments with data-driven insights for a sustainable energy future.</p>
                <div className="d-flex gap-3 flex-wrap">
                  <button 
                    className="btn btn-primary-custom"
                    onClick={handleButtonClick}
                  >
                    <i className="fas fa-map-marked-alt me-2"></i>Explore Platform
                  </button>
                  <button 
                    className="btn btn-outline-success-custom"
                    onClick={handleButtonClick}
                  >
                    <i className="fas fa-play me-2"></i>Watch Demo
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-visual">
                <div className="map-preview">
                  <div className="floating-icons">
                    <i className="fas fa-industry floating-icon"></i>
                    <i className="fas fa-wind floating-icon"></i>
                    <i className="fas fa-warehouse floating-icon"></i>
                    <i className="fas fa-truck floating-icon"></i>
                  </div>
                  <div className="pulse-dot"></div>
                  <div className="pulse-dot"></div>
                  <div className="pulse-dot"></div>
                  <div className="map-overlay">
                    <i className="fas fa-globe-americas fa-3x text-success mb-3"></i>
                    <h4 className="text-light">Interactive Infrastructure Map</h4>
                    <p className="text-muted">Real-time visualization of hydrogen assets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-title">
            <h2>Powerful Features</h2>
            <p className="text-muted" style={{fontSize: '1.25rem'}}>Advanced tools for hydrogen infrastructure planning and optimization</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-network-wired feature-icon"></i>
                <h3 className="feature-title">Network Planning</h3>
                <p className="feature-desc">Plan and optimize hydrogen distribution networks to minimize costs while maximizing coverage and efficiency.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-shield-alt feature-icon"></i>
                <h3 className="feature-title">Regulatory Intelligence</h3>
                <p className="feature-desc">Navigate complex regulatory landscapes with integrated policy data and compliance tracking across different jurisdictions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" ref={statsRef}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <div className="stat-label">Mapped Assets</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <span className="stat-number">$2.5B</span>
                <div className="stat-label">Investment Optimized</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <span className="stat-number">15</span>
                <div className="stat-label">Countries Covered</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <div className="stat-label">Cost Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="users" className="use-cases">
        <div className="container">
          <div className="section-title">
            <h2>Who Uses HydroMap Pro</h2>
            <p className="text-muted" style={{fontSize: '1.25rem'}}>Empowering key stakeholders in the hydrogen economy</p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="use-case-item">
                <i className="fas fa-city use-case-icon"></i>
                <h4 className="use-case-title">Urban & Regional Planners</h4>
                <p className="use-case-desc">Plan sustainable hydrogen infrastructure integration into existing urban frameworks and regional development strategies.</p>
              </div>
              <div className="use-case-item">
                <i className="fas fa-bolt use-case-icon"></i>
                <h4 className="use-case-title">Energy Companies</h4>
                <p className="use-case-desc">Identify optimal locations for hydrogen production, storage, and distribution to maximize operational efficiency and market reach.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="use-case-item">
                <i className="fas fa-hammer use-case-icon"></i>
                <h4 className="use-case-title">Project Developers</h4>
                <p className="use-case-desc">Accelerate project development with comprehensive site analysis, risk assessment, and stakeholder mapping tools.</p>
              </div>
              <div className="use-case-item">
                <i className="fas fa-balance-scale use-case-icon"></i>
                <h4 className="use-case-title">Policy Analysts</h4>
                <p className="use-case-desc">Support evidence-based policy development with detailed infrastructure analysis and economic impact modeling.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="features">
        <div className="container">
          <div className="section-title">
            <h2>Experience the Platform</h2>
            <p className="text-muted" style={{fontSize: '1.25rem'}}>Interactive preview of our hydrogen infrastructure mapping capabilities</p>
          </div>
          <div className="interactive-map" onClick={toggleMapView}>
            <div className="floating-icons">
              <i className="fas fa-solar-panel floating-icon" style={{top: '25%', left: '20%'}}></i>
              <i className="fas fa-industry floating-icon" style={{top: '45%', left: '75%'}}></i>
              <i className="fas fa-warehouse floating-icon" style={{top: '70%', left: '30%'}}></i>
              <i className="fas fa-shipping-fast floating-icon" style={{top: '35%', left: '55%'}}></i>
            </div>
            <div className="map-placeholder">
              {!mapExpanded ? (
                <>
                  <i className="fas fa-play-circle fa-4x text-success mb-3"></i>
                  <h4>Interactive Map Demo</h4>
                  <p>Click to explore hydrogen infrastructure mapping</p>
                </>
              ) : (
                <div className="row w-100">
                  <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="text-light mb-0">Hydrogen Infrastructure Overview</h5>
                      <span className="badge bg-success">Live Data</span>
                    </div>
                    <div className="row gap-3 mb-3" style={{flexWrap: 'nowrap'}}>
                      <div className="col-3">
                        <div className="card bg-dark border-success text-center" style={{padding: '0.5rem'}}>
                          <i className="fas fa-industry text-success"></i>
                          <small className="text-muted">Plants: 24</small>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="card bg-dark border-success text-center" style={{padding: '0.5rem'}}>
                          <i className="fas fa-warehouse text-success"></i>
                          <small className="text-muted">Storage: 18</small>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="card bg-dark border-success text-center" style={{padding: '0.5rem'}}>
                          <i className="fas fa-route text-success"></i>
                          <small className="text-muted">Pipelines: 12</small>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="card bg-dark border-success text-center" style={{padding: '0.5rem'}}>
                          <i className="fas fa-truck text-success"></i>
                          <small className="text-muted">Hubs: 8</small>
                        </div>
                      </div>
                    </div>
                    <div className="progress mb-3" style={{height: '8px'}}>
                      <div className="progress-bar bg-success" style={{width: '75%'}}></div>
                    </div>
                    <small className="text-muted">Network Optimization: 75% Complete</small>
                  </div>
                  <div className="col-md-4">
                    <div className="bg-dark" style={{borderRadius: '0.375rem', padding: '1rem', height: '100%'}}>
                      <h6 className="text-success mb-3">Recommended Sites</h6>
                      <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-map-marker-alt text-success me-2"></i>
                        <small className="text-light">Northern Industrial Zone</small>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-map-marker-alt text-success me-2"></i>
                        <small className="text-light">Port Authority District</small>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-map-marker-alt text-success me-2"></i>
                        <small className="text-light">Renewable Energy Corridor</small>
                      </div>
                      <button 
                        className="btn btn-success btn-sm mt-3 w-100"
                        onClick={handleButtonClick}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="stats">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2 className="text-light">Transformative Impact</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card card-dark text-center h-100" style={{padding: '2rem'}}>
                <i className="fas fa-bullseye fa-3x text-success mb-3"></i>
                <h4 className="text-light">Strategic Investment</h4>
                <p className="text-muted">Direct capital to high-impact, high-yield infrastructure projects with precision targeting and risk assessment.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-dark text-center h-100" style={{padding: '2rem'}}>
                <i className="fas fa-recycle fa-3x text-success mb-3"></i>
                <h4 className="text-light">Efficient Resource Use</h4>
                <p className="text-muted">Avoid redundant investments and minimize costs and land use through intelligent infrastructure coordination.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-dark text-center h-100" style={{padding: '2rem'}}>
                <i className="fas fa-leaf fa-3x text-success mb-3"></i>
                <h4 className="text-light">Net Zero Goals</h4>
                <p className="text-muted">Facilitate coordinated growth of hydrogen networks supporting ambitious net zero climate targets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="glow-text">Ready to Transform Hydrogen Infrastructure Planning?</h2>
          <p>Join leading organizations already using HydroMap Pro to build the hydrogen economy of tomorrow.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button 
              className="btn btn-primary-custom"
              style={{fontSize: '1.125rem', padding: '15px 40px'}}
              onClick={handleButtonClick}
            >
              <i className="fas fa-rocket me-2"></i>Start Free Trial
            </button>
            <button 
              className="btn btn-outline-success-custom"
              style={{fontSize: '1.125rem', padding: '15px 40px'}}
              onClick={handleButtonClick}
            >
              <i className="fas fa-calendar me-2"></i>Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="text-success">HydroMap Pro</h5>
              <p className="text-muted">Leading the future of green hydrogen infrastructure development through intelligent mapping and optimization.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex justify-content-end gap-3">
                <a href="#" className="text-muted">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <a href="#" className="text-muted">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
                <a href="#" className="text-muted">
                  <i className="fas fa-envelope fa-2x"></i>
                </a>
              </div>
              <p className="text-muted mt-3">© 2025 HydroMap Pro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;