import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SolarPanel from '../3dModels/SolarPanel';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('visualization'); // Set visualization as default tab
  const [statsData, setStatsData] = useState({});
  const [projects, setProjects] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();

  // Sample data for demonstration
  useEffect(() => {
    // Simulate API call for stats
    setStatsData({
      totalProjects: 12,
      activeProjects: 8,
      completedProjects: 3,
      totalRevenue: '₹4.2Cr',
      co2Reduced: '1250 tons',
      hydrogenProduced: '25,000 kg'
    });

    // Sample projects data
    setProjects([
      {
        id: 1,
        name: 'Delhi Hydrogen Plant',
        status: 'active',
        progress: 75,
        timeline: 'Q4 2024',
        budget: '₹1.2Cr',
        team: 8
      },
      {
        id: 2,
        name: 'Mumbai Storage Facility',
        status: 'completed',
        progress: 100,
        timeline: 'Q2 2024',
        budget: '₹85L',
        team: 5
      },
      {
        id: 3,
        name: 'Bengaluru Distribution',
        status: 'planning',
        progress: 30,
        timeline: 'Q1 2025',
        budget: '₹2.1Cr',
        team: 12
      },
      {
        id: 4,
        name: 'Chennai Refueling Station',
        status: 'active',
        progress: 60,
        timeline: 'Q3 2024',
        budget: '₹65L',
        team: 4
      }
    ]);

    // Recent activities
    setRecentActivities([
      { id: 1, action: 'Project Update', project: 'Delhi Plant', user: 'Arjun Singh', time: '2 hours ago' },
      { id: 2, action: 'Document Uploaded', project: 'Mumbai Facility', user: 'Priya Sharma', time: '5 hours ago' },
      { id: 3, action: 'New Project Created', project: 'Hyderabad Expansion', user: 'Rahul Verma', time: '1 day ago' },
      { id: 4, action: 'Budget Approved', project: 'Chennai Station', user: 'Neha Gupta', time: '2 days ago' },
      { id: 5, action: 'Team Member Added', project: 'Bengaluru Distribution', user: 'Vikram Patel', time: '3 days ago' }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#27AE60';
      case 'completed': return '#2D9CDB';
      case 'planning': return '#F2C94C';
      case 'delayed': return '#EB5757';
      default: return '#9B51E0';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'fas fa-play-circle';
      case 'completed': return 'fas fa-check-circle';
      case 'planning': return 'fas fa-clock';
      case 'delayed': return 'fas fa-exclamation-circle';
      default: return 'fas fa-question-circle';
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  // New visualization tab content
  const renderVisualization = () => (
    <div className="visualization-section">
      <div className="section-header">
        <h2>3D Infrastructure Visualization</h2>
        <p>Interactive 3D models of hydrogen and solar infrastructure</p>
      </div>
      
      <div className="visualization-content">
        <div className="visualization-info">
          <h3>Solar Panel Farm Simulation</h3>
          <p>Explore our interactive 3D model of a solar panel farm that powers hydrogen production facilities.</p>
          <div className="visualization-stats">
            <div className="stat-item">
              <i className="fas fa-solar-panel"></i>
              <span>9 Solar Panels</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-bolt"></i>
              <span>45 kW Total Output</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-leaf"></i>
              <span>54 tons CO₂ Reduction/year</span>
            </div>
          </div>
          <div className="visualization-controls">
            <h4>Controls:</h4>
            <ul>
              <li>Drag to rotate camera</li>
              <li>Scroll to zoom in/out</li>
              <li>Right-click drag to pan</li>
            </ul>
          </div>
        </div>
        
        <div className="solar-visualization" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px', minHeight: '350px' }}>
          <SolarPanel count={9} />
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(39, 174, 96, 0.1)' }}>
            <i className="fas fa-industry" style={{ color: '#27AE60' }}></i>
          </div>
          <div className="stat-content">
            <h3>{statsData.totalProjects}</h3>
            <p>Total Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(45, 156, 219, 0.1)' }}>
            <i className="fas fa-tasks" style={{ color: '#2D9CDB' }}></i>
          </div>
          <div className="stat-content">
            <h3>{statsData.activeProjects}</h3>
            <p>Active Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(242, 201, 76, 0.1)' }}>
            <i className="fas fa-rupee-sign" style={{ color: '#F2C94C' }}></i>
          </div>
          <div className="stat-content">
            <h3>{statsData.totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(235, 87, 87, 0.1)' }}>
            <i className="fas fa-leaf" style={{ color: '#EB5757' }}></i>
          </div>
          <div className="stat-content">
            <h3>{statsData.co2Reduced}</h3>
            <p>CO₂ Reduced</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Project Status Distribution</h3>
          <div className="project-chart">
            <div className="chart-bar" style={{ '--width': '60%', '--color': '#27AE60' }}>
              <span>Active (60%)</span>
            </div>
            <div className="chart-bar" style={{ '--width': '25%', '--color': '#2D9CDB' }}>
              <span>Completed (25%)</span>
            </div>
            <div className="chart-bar" style={{ '--width': '15%', '--color': '#F2C94C' }}>
              <span>Planning (15%)</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Hydrogen Production Trend</h3>
          <div className="production-chart">
            <div className="chart-line">
              <div className="data-point" style={{ '--height': '40%', '--left': '10%' }}></div>
              <div className="data-point" style={{ '--height': '60%', '--left': '30%' }}></div>
              <div className="data-point" style={{ '--height': '75%', '--left': '50%' }}></div>
              <div className="data-point" style={{ '--height': '85%', '--left': '70%' }}></div>
              <div className="data-point" style={{ '--height': '95%', '--left': '90%' }}></div>
            </div>
            <div className="chart-labels">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activities-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="activity-content">
                <p><strong>{activity.user}</strong> {activity.action} for <strong>{activity.project}</strong></p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="projects-section">
      <div className="section-header">
        <h2>Project Portfolio</h2>
        <button className="btn-primary">
          <i className="fas fa-plus"></i> New Project
        </button>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card" onClick={() => handleProjectClick(project.id)}>
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className="project-status" style={{ color: getStatusColor(project.status) }}>
                <i className={getStatusIcon(project.status)}></i>
                {project.status}
              </span>
            </div>

            <div className="project-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${project.progress}%`,
                    background: getStatusColor(project.status)
                  }}
                ></div>
              </div>
              <span>{project.progress}% Complete</span>
            </div>

            <div className="project-details">
              <div className="detail-item">
                <i className="fas fa-calendar"></i>
                <span>{project.timeline}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-rupee-sign"></i>
                <span>{project.budget}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-users"></i>
                <span>{project.team} Members</span>
              </div>
            </div>

            <button className="project-action-btn">
              View Details <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-section">
      <h2>Performance Analytics</h2>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Resource Allocation</h3>
          <div className="resource-chart">
            <div className="chart-item">
              <span>Engineering</span>
              <div className="chart-bar">
                <div className="chart-fill" style={{ width: '65%' }}></div>
              </div>
              <span>65%</span>
            </div>
            <div className="chart-item">
              <span>Operations</span>
              <div className="chart-bar">
                <div className="chart-fill" style={{ width: '45%' }}></div>
              </div>
              <span>45%</span>
            </div>
            <div className="chart-item">
              <span>R&D</span>
              <div className="chart-bar">
                <div className="chart-fill" style={{ width: '30%' }}></div>
              </div>
              <span>30%</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Budget Utilization</h3>
          <div className="budget-chart">
            <div className="budget-item">
              <span>Infrastructure</span>
              <div className="budget-amount">₹1.8Cr</div>
            </div>
            <div className="budget-item">
              <span>Equipment</span>
              <div className="budget-amount">₹1.2Cr</div>
            </div>
            <div className="budget-item">
              <span>Personnel</span>
              <div className="budget-amount">₹75L</div>
            </div>
            <div className="budget-item">
              <span>R&D</span>
              <div className="budget-amount">₹45L</div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Key Performance Indicators</h3>
          <div className="kpi-grid">
            <div className="kpi-item">
              <div className="kpi-value">92%</div>
              <div className="kpi-label">Efficiency Rate</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-value">15</div>
              <div className="kpi-label">Days Ahead</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-value">98%</div>
              <div className="kpi-label">Quality Score</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-value">4.8/5</div>
              <div className="kpi-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
        :root {
          --primary-dark: #081C15;
          --secondary-dark: #1B4332;
          --accent-teal: #2D9CDB;
          --accent-green: #27AE60;
          --accent-mint: #90EE90;
          --accent-aqua: #20B2AA;
          --text-light: #F8F9FA;
          --text-muted: #ADB5BD;
          --card-bg: rgba(27, 67, 50, 0.8);
          --card-border: rgba(39, 174, 96, 0.3);
          --gradient-primary: linear-gradient(135deg, var(--accent-green) 0%, var(--accent-teal) 100%);
        }

        .dashboard {
          min-height: 100vh;
          margin-left: 9vh;
          background: var(--primary-dark);
          color: var(--text-light);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--card-border);
        }

        .dashboard-header h1 {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .user-info h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .user-info p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .dashboard-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 15px;
          flex-wrap: wrap;
        }

        .tab-button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .tab-button.active {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
        }

        .tab-button:hover:not(.active) {
          background: rgba(39, 174, 96, 0.1);
          color: var(--accent-green);
        }

        /* Visualization Section Styles */
        .visualization-section {
          padding: 20px 0;
        }

        .visualization-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
          margin-top: 20px;
           
        }

        .visualization-info {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 15px;
          padding: 25px;
          backdrop-filter: blur(10px);
          height: fit-content;
          background: 
              linear-gradient(
                to bottom, 
                var(--primary-dark) 0%, 
                transparent 600%
              ),
              url('/images/dashboard_hero_Image.webp') no-repeat center center;
            background-size: cover;
        }

        .visualization-info h3 {
          color: var(--accent-green);
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.5rem;
        }

        .visualization-info p {
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .visualization-stats {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 25px;
        }

        .visualization-stats .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .visualization-stats .stat-item i {
          color: var(--accent-teal);
          font-size: 1.2rem;
          width: 24px;
        }

        .visualization-stats .stat-item span {
          color: var(--text-light);
          font-weight: 500;
        }

        .visualization-controls h4 {
          color: var(--accent-green);
          margin-bottom: 10px;
          font-size: 1.1rem;
        }

        .visualization-controls ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .visualization-controls li {
          color: var(--text-muted);
          padding: 5px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .visualization-controls li:before {
          content: '•';
          color: var(--accent-teal);
          font-weight: bold;
          display: inline-block;
          width: 1em;
        }

        .solar-visualization {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 15px;
          padding: 0;
          overflow: hidden;
          height: 0px;
          backdrop-filter: blur(10px);
        }

        /* Rest of the existing styles... */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 15px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .stat-content h3 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-content p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .charts-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        /* ... (keep all the existing styles from the original code) ... */

        @media (max-width: 1024px) {
          .visualization-content {
            grid-template-columns: 1fr;
          }
          
          .solar-visualization {
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            margin-left: 0;
            padding: 15px;
          }
          
          .charts-section {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .section-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .dashboard-tabs {
            overflow-x: auto;
            padding-bottom: 10px;
          }
        }
        `}
      </style>

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Hydrogen Infrastructure Dashboard</h1>
          <div className="user-profile">
            <div className="user-avatar">AS</div>
            <div className="user-info">
              <h3>Arjun Singh</h3>
              <p>Project Manager</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-button ${activeTab === 'visualization' ? 'active' : ''}`}
            onClick={() => setActiveTab('visualization')}
          >
            <i className="fas fa-globe"></i> Visualization
          </button>
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-home"></i> Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <i className="fas fa-project-diagram"></i> Projects
          </button>
          <button 
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="fas fa-chart-line"></i> Analytics
          </button>
          <button 
            className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <i className="fas fa-users"></i> Resources
          </button>
          <button 
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <i className="fas fa-file-alt"></i> Reports
          </button>
        </div>

        {activeTab === 'visualization' && renderVisualization()}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'analytics' && renderAnalytics()}
        
        {activeTab === 'resources' && (
          <div className="section-header">
            <h2>Resource Management</h2>
            <p>Content coming soon...</p>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="section-header">
            <h2>Reports & Documentation</h2>
            <p>Content coming soon...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;