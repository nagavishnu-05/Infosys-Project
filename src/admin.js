import { useState } from 'react';
import { LayoutDashboard, FileText, Users, Settings, Menu, X, LogOut, Bell } from 'lucide-react';
import { ComplaintsPage } from './ComplaintsPage';

// Civic Hub Logo - replace with actual image path
// import civicHubLogo from './civic-hub-logo.png';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('complaints');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Inline styles object
  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f9fafb'
    },
    sidebar: {
      backgroundColor: 'white',
      borderRight: '1px solid #e5e7eb',
      transition: 'all 0.3s',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      width: sidebarOpen ? '288px' : '0px'
    },
    logoSection: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb',
      background: 'linear-gradient(to bottom right, #ecfeff, white)'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logo: {
      width: '56px',
      height: '56px',
      objectFit: 'contain'
    },
    logoTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111827'
    },
    logoSubtitle: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '2px'
    },
    nav: {
      flex: 1,
      padding: '16px',
      paddingTop: '24px',
      paddingBottom: '24px'
    },
    navButton: (isActive) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '12px',
      transition: 'all 0.2s',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      background: isActive 
        ? 'linear-gradient(to right, #06b6d4, #3b82f6)'
        : 'transparent',
      color: isActive ? 'white' : '#374151',
      boxShadow: isActive ? '0 10px 15px -3px rgba(6, 182, 212, 0.3)' : 'none'
    }),
    navButtonHover: (isActive) => ({
      backgroundColor: isActive ? '' : '#f3f4f6'
    }),
    userSection: {
      padding: '16px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb'
    },
    userCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom right, #22d3ee, #3b82f6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      color: 'white'
    },
    userInfo: {
      flex: 1,
      minWidth: 0
    },
    userName: {
      fontSize: '14px',
      color: '#111827',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    userEmail: {
      fontSize: '12px',
      color: '#6b7280',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    logoutButton: {
      padding: '4px',
      borderRadius: '4px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    },
    logoutButtonHover: {
      backgroundColor: '#f3f4f6'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    headerContent: {
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    menuButton: {
      padding: '8px',
      borderRadius: '8px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    },
    menuButtonHover: {
      backgroundColor: '#f3f4f6'
    },
    headerTitle: {
      fontSize: '18px',
      color: '#111827',
      textTransform: 'capitalize'
    },
    headerSubtitle: {
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '2px'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    notificationButton: {
      padding: '8px',
      borderRadius: '8px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      position: 'relative'
    },
    notificationButtonHover: {
      backgroundColor: '#f3f4f6'
    },
    notificationBadge: {
      position: 'absolute',
      top: '4px',
      right: '4px',
      width: '8px',
      height: '8px',
      backgroundColor: '#ef4444',
      borderRadius: '50%'
    },
    dateTime: {
      textAlign: 'right'
    },
    dateText: {
      fontSize: '14px',
      color: '#6b7280'
    },
    timeText: {
      fontSize: '12px',
      color: '#6b7280'
    },
    contentArea: {
      flex: 1,
      overflow: 'auto',
      backgroundColor: '#f9fafb'
    },
    contentPadding: {
      padding: '24px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '24px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      transition: 'box-shadow 0.2s'
    },
    statCardHover: {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    statCardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '4px'
    },
    statValue: {
      fontSize: '18px',
      color: '#111827'
    },
    statTrend: {
      fontSize: '12px',
      marginTop: '4px'
    },
    statIcon: (color) => ({
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: `linear-gradient(to bottom right, ${color.light}, ${color.medium})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }),
    recentActivity: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
    },
    recentActivityTitle: {
      fontSize: '16px',
      color: '#111827',
      marginBottom: '16px'
    },
    activityItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px'
    },
    activityDot: (color) => ({
      width: '8px',
      height: '8px',
      backgroundColor: color,
      borderRadius: '50%'
    }),
    activityTitle: {
      fontSize: '14px',
      color: '#111827'
    },
    activityDescription: {
      fontSize: '12px',
      color: '#6b7280'
    },
    managementCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
    },
    managementTitle: {
      fontSize: '16px',
      color: '#111827',
      marginBottom: '16px'
    },
    managementDescription: {
      fontSize: '14px',
      color: '#6b7280'
    }
  };

  // For responsive design
  const isMobile = window.innerWidth < 768;

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <div style={styles.logoContainer}>
            {/* <img
              src={civicHubLogo}
              alt="Civic Hub Logo"
              style={styles.logo}
            /> */}
            <div style={{width: '56px', height: '56px', backgroundColor: '#06b6d4', borderRadius: '8px'}}></div>
            <div>
              <h1 style={styles.logoTitle}>Civic Hub</h1>
              <p style={styles.logoSubtitle}>Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav style={styles.nav}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={styles.navButton(activeTab === 'dashboard')}
            onMouseEnter={(e) => {
              if (activeTab !== 'dashboard') {
                e.target.style.backgroundColor = styles.navButtonHover(false).backgroundColor;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'dashboard') {
                e.target.style.backgroundColor = '';
              }
            }}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            style={styles.navButton(activeTab === 'complaints')}
            onMouseEnter={(e) => {
              if (activeTab !== 'complaints') {
                e.target.style.backgroundColor = styles.navButtonHover(false).backgroundColor;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'complaints') {
                e.target.style.backgroundColor = '';
              }
            }}
          >
            <FileText size={20} />
            <span>Complaints</span>
          </button>

          <button
            onClick={() => setActiveTab('officers')}
            style={styles.navButton(activeTab === 'officers')}
            onMouseEnter={(e) => {
              if (activeTab !== 'officers') {
                e.target.style.backgroundColor = styles.navButtonHover(false).backgroundColor;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'officers') {
                e.target.style.backgroundColor = '';
              }
            }}
          >
            <Users size={20} />
            <span>Officers</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={styles.navButton(activeTab === 'settings')}
            onMouseEnter={(e) => {
              if (activeTab !== 'settings') {
                e.target.style.backgroundColor = styles.navButtonHover(false).backgroundColor;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'settings') {
                e.target.style.backgroundColor = '';
              }
            }}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <div style={styles.userSection}>
          <div style={styles.userCard}>
            <div style={styles.avatar}>AD</div>
            <div style={styles.userInfo}>
              <p style={styles.userName}>Admin User</p>
              <p style={styles.userEmail}>admin@civichub.gov</p>
            </div>
            <button 
              style={styles.logoutButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '';
              }}
            >
              <LogOut size={16} style={{color: '#6b7280'}} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={styles.menuButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.menuButtonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '';
                }}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 style={styles.headerTitle}>{activeTab}</h2>
                <p style={styles.headerSubtitle}>
                  {activeTab === 'complaints' && 'Manage and track civic complaints'}
                  {activeTab === 'dashboard' && 'Overview of system performance'}
                  {activeTab === 'officers' && 'Manage field officers and assignments'}
                  {activeTab === 'settings' && 'System configuration and preferences'}
                </p>
              </div>
            </div>
            <div style={styles.headerRight}>
              <button 
                style={styles.notificationButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.notificationButtonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '';
                }}
              >
                <Bell size={20} style={{color: '#6b7280'}} />
                <span style={styles.notificationBadge}></span>
              </button>
              <div style={styles.dateTime}>
                <p style={styles.dateText}>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p style={styles.timeText}>
                  {new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main style={styles.contentArea}>
          <div style={styles.contentPadding}>
            {activeTab === 'dashboard' && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                {/* Stats Cards */}
                <div style={{...styles.statsGrid, ...(isMobile ? {} : {gridTemplateColumns: 'repeat(4, 1fr)'})}}>
                  <div 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = styles.statCardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = styles.statCard.boxShadow;
                    }}
                  >
                    <div style={styles.statCardContent}>
                      <div>
                        <p style={styles.statLabel}>Total Complaints</p>
                        <p style={styles.statValue}>245</p>
                        <p style={{...styles.statTrend, color: '#16a34a'}}>↑ 12% from last month</p>
                      </div>
                      <div style={styles.statIcon({light: '#cffafe', medium: '#a5f3fc'})}>
                        <FileText size={24} style={{color: '#06b6d4'}} />
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = styles.statCardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = styles.statCard.boxShadow;
                    }}
                  >
                    <div style={styles.statCardContent}>
                      <div>
                        <p style={styles.statLabel}>Pending</p>
                        <p style={styles.statValue}>89</p>
                        <p style={{...styles.statTrend, color: '#ca8a04'}}>Needs attention</p>
                      </div>
                      <div style={styles.statIcon({light: '#fef9c3', medium: '#fef08a'})}>
                        <FileText size={24} style={{color: '#eab308'}} />
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = styles.statCardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = styles.statCard.boxShadow;
                    }}
                  >
                    <div style={styles.statCardContent}>
                      <div>
                        <p style={styles.statLabel}>In Progress</p>
                        <p style={styles.statValue}>67</p>
                        <p style={{...styles.statTrend, color: '#2563eb'}}>Being resolved</p>
                      </div>
                      <div style={styles.statIcon({light: '#dbeafe', medium: '#bfdbfe'})}>
                        <FileText size={24} style={{color: '#3b82f6'}} />
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = styles.statCardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = styles.statCard.boxShadow;
                    }}
                  >
                    <div style={styles.statCardContent}>
                      <div>
                        <p style={styles.statLabel}>Resolved</p>
                        <p style={styles.statValue}>156</p>
                        <p style={{...styles.statTrend, color: '#16a34a'}}>↑ 8% completion rate</p>
                      </div>
                      <div style={styles.statIcon({light: '#dcfce7', medium: '#bbf7d0'})}>
                        <FileText size={24} style={{color: '#22c55e'}} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={styles.recentActivity}>
                  <h3 style={styles.recentActivityTitle}>Recent Activity</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <div style={styles.activityItem}>
                      <div style={styles.activityDot('#16a34a')}></div>
                      <div style={{flex: 1}}>
                        <p style={styles.activityTitle}>Complaint C008 resolved</p>
                        <p style={styles.activityDescription}>Traffic Signal Malfunction - 2 hours ago</p>
                      </div>
                    </div>
                    <div style={styles.activityItem}>
                      <div style={styles.activityDot('#2563eb')}></div>
                      <div style={{flex: 1}}>
                        <p style={styles.activityTitle}>Officer assigned to C002</p>
                        <p style={styles.activityDescription}>Pothole on Highway - 5 hours ago</p>
                      </div>
                    </div>
                    <div style={styles.activityItem}>
                      <div style={styles.activityDot('#ca8a04')}></div>
                      <div style={{flex: 1}}>
                        <p style={styles.activityTitle}>New complaint submitted C007</p>
                        <p style={styles.activityDescription}>Illegal Dumping - 6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'complaints' && <ComplaintsPage />}

            {activeTab === 'officers' && (
              <div style={styles.managementCard}>
                <h3 style={styles.managementTitle}>Officers Management</h3>
                <p style={styles.managementDescription}>
                  Manage field officers, view their assignments, and track performance.
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div style={styles.managementCard}>
                <h3 style={styles.managementTitle}>System Settings</h3>
                <p style={styles.managementDescription}>
                  Configure system preferences, notifications, and user permissions.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}