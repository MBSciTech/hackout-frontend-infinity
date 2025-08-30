// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', path: '/dashboard', tooltip: 'Dashboard' },
    { id: 'map', icon: 'fas fa-map-marked-alt', path: '/map', tooltip: 'Plant Locations' },
    { id: 'analytics', icon: 'fas fa-chart-line', path: '/analytics', tooltip: 'Analytics' },
    { id: 'infrastructure', icon: 'fas fa-industry', path: '/infrastructure', tooltip: 'Infrastructure' },
    { id: 'settings', icon: 'fas fa-cog', path: '/settings', tooltip: 'Settings' },
    { id: 'profile', icon: 'fas fa-user-circle', path: '/profile', tooltip: 'Profile' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getActiveItem = () => {
    const path = location.pathname;
    const item = menuItems.find(item => item.path === path);
    return item ? item.id : 'dashboard';
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [location.pathname]);

  const handleNavigation = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <>
      <nav className={`custom-sidebar ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <i className="fas fa-atom" />
            </div>
            {!isMobile && (
              <div className="logo-pulse"></div>
            )}
          </div>
        </div>

        <div className="nav-items-container">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleNavigation(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link to={item.path} className="nav-link">
                <div className="nav-icon">
                  <i className={item.icon} />
                </div>
                {hoveredItem === item.id && !isMobile && (
                  <div className="nav-tooltip">
                    {item.tooltip}
                  </div>
                )}
                {activeItem === item.id && (
                  <div className="active-indicator"></div>
                )}
              </Link>
            </div>
          ))}
        </div>

        {!isMobile && (
          <div className="nav-footer">
            <div className="energy-pulse">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
              <i className="fas fa-bolt"></i>
            </div>
          </div>
        )}
      </nav>

      <div className={`content-spacer ${isMobile ? 'mobile' : ''}`} />
    </>
  );
};

export default Navbar;