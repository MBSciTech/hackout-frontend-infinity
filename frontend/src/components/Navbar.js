import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isHovering, setIsHovering] = useState(false);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (item) => {
    setActiveItem(item);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt', path: '/dashboard' },
    { id: 'map', label: 'Hydrogen Map', icon: 'fas fa-map-marked-alt', path: '/map' },
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line', path: '/analytics' },
    { id: 'infrastructure', label: 'Infrastructure', icon: 'fas fa-industry', path: '/infrastructure' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog', path: '/settings' },
  ];

  return (
    <>
      <style>{`
        /* Custom Variables */
        :root {
          --sidebar-width-expanded: 280px;
          --sidebar-width-collapsed: 80px;
          --primary-dark: #1a202c;
          --secondary-dark: #2d3748;
          --accent-emerald: #10b981;
          --accent-teal: #14b8a6;
          --accent-blue: #3b82f6;
          --text-light: #f7fafc;
          --text-muted: #a0aec0;
          --border-color: rgba(16, 185, 129, 0.2);
          --shadow-glow: 0 0 20px rgba(16, 185, 129, 0.3);
          --transition-fast: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --transition-smooth: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Main Sidebar Container */
        .custom-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: ${isOpen ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width-collapsed)'};
          background: linear-gradient(180deg, var(--primary-dark) 0%, var(--secondary-dark) 50%, var(--primary-dark) 100%);
          border-right: 2px solid var(--border-color);
          box-shadow: 5px 0 25px rgba(0, 0, 0, 0.3);
          transition: var(--transition-smooth);
          z-index: 1050;
          overflow: hidden;
        }

        .custom-sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, var(--accent-emerald) 50%, transparent 100%);
          opacity: 0.6;
        }

        /* Mobile Styles */
        @media (max-width: 767px) {
          .custom-sidebar {
            width: ${isOpen ? 'var(--sidebar-width-expanded)' : '0px'};
            transform: ${isOpen ? 'translateX(0)' : 'translateX(-100%)'};
          }
        }

        /* Mobile Toggle Button */
        .mobile-toggle-btn {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1055;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-teal) 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
          transition: var(--transition-fast);
          display: ${isMobile && !isOpen ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
        }

        .mobile-toggle-btn:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
        }

        /* Mobile Backdrop */
        .mobile-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1040;
          opacity: ${isMobile && isOpen ? 1 : 0};
          visibility: ${isMobile && isOpen ? 'visible' : 'hidden'};
          transition: var(--transition-fast);
        }

        /* Header Section */
        .sidebar-header {
          padding: 1.5rem 1rem;
          border-bottom: 1px solid var(--border-color);
          background: rgba(16, 185, 129, 0.05);
          position: relative;
          overflow: hidden;
        }

        .sidebar-header::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-emerald) 0%, var(--accent-teal) 100%);
        }

        .logo-container {
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .logo-icon {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-teal) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          transition: var(--transition-fast);
          flex-shrink: 0;
        }

        .logo-icon:hover {
          transform: rotate(360deg) scale(1.1);
          box-shadow: var(--shadow-glow);
        }

        .logo-text {
          margin-left: 1rem;
          opacity: ${isOpen ? 1 : 0};
          transform: ${isOpen ? 'translateX(0)' : 'translateX(-20px)'};
          transition: var(--transition-smooth);
        }

        .logo-title {
          color: var(--text-light);
          font-size: 1.4rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-teal) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0;
        }

        .logo-subtitle {
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 500;
          margin-bottom: 0;
        }

        /* Toggle Button */
        .toggle-btn {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 35px;
          height: 35px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          color: var(--accent-emerald);
          font-size: 0.9rem;
          transition: var(--transition-fast);
          display: ${isOpen || !isMobile ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
        }

        .toggle-btn:hover {
          background: rgba(16, 185, 129, 0.3);
          transform: translateY(-50%) rotate(180deg) scale(1.1);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
        }

        /* Navigation Items */
        .nav-items-container {
          padding: 2rem 0.75rem;
          height: calc(100vh - 140px);
          overflow-y: auto;
        }

        .nav-items-container::-webkit-scrollbar {
          width: 4px;
        }

        .nav-items-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .nav-items-container::-webkit-scrollbar-thumb {
          background: var(--accent-emerald);
          border-radius: 2px;
        }

        .nav-item {
          margin-bottom: 0.5rem;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-20px);
          animation: slideInNav 0.6s ease forwards;
        }

        .nav-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-item:nth-child(2) { animation-delay: 0.2s; }
        .nav-item:nth-child(3) { animation-delay: 0.3s; }
        .nav-item:nth-child(4) { animation-delay: 0.4s; }
        .nav-item:nth-child(5) { animation-delay: 0.5s; }

        @keyframes slideInNav {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 1rem;
          text-decoration: none;
          color: var(--text-muted);
          border-radius: 12px;
          border: 1px solid transparent;
          transition: var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%);
          transition: var(--transition-fast);
        }

        .nav-link:hover::before {
          left: 100%;
        }

        .nav-link:hover {
          color: var(--text-light);
          background: rgba(16, 185, 129, 0.1);
          border-color: var(--border-color);
          transform: translateX(5px);
        }

        .nav-item.active .nav-link {
          color: var(--accent-emerald);
          background: rgba(16, 185, 129, 0.15);
          border-color: var(--accent-emerald);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 70%;
          background: linear-gradient(180deg, var(--accent-emerald) 0%, var(--accent-teal) 100%);
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }

        .nav-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: var(--transition-fast);
          flex-shrink: 0;
        }

        .nav-link:hover .nav-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .nav-item.active .nav-icon {
          transform: scale(1.1);
          filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.5));
        }

        .nav-text {
          margin-left: 1rem;
          font-weight: 500;
          font-size: 0.95rem;
          opacity: ${isOpen ? 1 : 0};
          transform: ${isOpen ? 'translateX(0)' : 'translateX(-10px)'};
          transition: var(--transition-smooth);
          white-space: nowrap;
        }

        /* Tooltip for Collapsed State */
        .nav-tooltip {
          position: absolute;
          left: 90px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--primary-dark);
          color: var(--text-light);
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-fast);
          z-index: 1060;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
        }

        .nav-tooltip::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 6px solid var(--primary-dark);
        }

        .nav-item:hover .nav-tooltip {
          opacity: ${!isOpen && !isMobile ? 1 : 0};
          visibility: ${!isOpen && !isMobile ? 'visible' : 'hidden'};
          transform: translateY(-50%) translateX(10px);
        }

        /* Bottom Toggle for Desktop */
        .bottom-toggle {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 45px;
          height: 45px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          color: var(--accent-emerald);
          font-size: 1.1rem;
          transition: var(--transition-fast);
          display: ${isMobile ? 'none' : 'flex'};
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .bottom-toggle:hover {
          background: rgba(16, 185, 129, 0.3);
          transform: translateX(-50%) scale(1.1);
          box-shadow: var(--shadow-glow);
        }

        /* Floating Particles Animation */
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--accent-emerald);
          border-radius: 50%;
          opacity: 0.3;
          animation: float 6s infinite ease-in-out;
        }

        .particle:nth-child(1) { left: 20%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 50%; animation-delay: 2s; }
        .particle:nth-child(3) { left: 80%; animation-delay: 4s; }

        @keyframes float {
          0%, 100% { transform: translateY(100vh) scale(0); opacity: 0; }
          50% { transform: translateY(50vh) scale(1); opacity: 0.3; }
        }

        /* Content Spacer */
        .content-spacer {
          width: ${isMobile ? '0px' : (isOpen ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width-collapsed)')};
          transition: var(--transition-smooth);
          flex-shrink: 0;
        }

        /* Responsive Adjustments */
        @media (max-width: 991px) {
          .custom-sidebar {
            --sidebar-width-expanded: 260px;
          }
        }

        @media (max-width: 575px) {
          .custom-sidebar {
            --sidebar-width-expanded: 100vw;
          }
        }
      `}</style>

      {/* Mobile Backdrop */}
      <div className="mobile-backdrop" onClick={() => setIsOpen(false)} />

      {/* Mobile Toggle Button */}
      <button className="mobile-toggle-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars" />
      </button>

      {/* Main Sidebar */}
      <nav 
        className="custom-sidebar"
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
      >
        {/* Floating Particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <i className="fas fa-atom" />
            </div>
            <div className="logo-text">
              <h4 className="logo-title">HydroMap</h4>
              <p className="logo-subtitle">Pro Dashboard</p>
            </div>
          </div>
          
          <button className="toggle-btn" onClick={toggleSidebar}>
            <i className={`fas ${isMobile ? 'fa-times' : (isOpen ? 'fa-chevron-left' : 'fa-chevron-right')}`} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="nav-items-container">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleNavigation(item.id)}
            >
              <a href="#" className="nav-link">
                <div className="nav-icon">
                  <i className={item.icon} />
                </div>
                <span className="nav-text">{item.label}</span>
                <div className="nav-tooltip">{item.label}</div>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Toggle Button (Desktop Only) */}
        <button className="bottom-toggle" onClick={toggleSidebar}>
          <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`} />
        </button>
      </nav>

      {/* Content Spacer */}
      <div className="content-spacer" />
    </>
  );
};

export default Navbar;