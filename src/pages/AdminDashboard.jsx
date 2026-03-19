import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ goTo }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH DATA FROM JSON SERVER
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('${import.meta.env.VITE_API_URL}/reports');
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const stats = [
    { title: "Total Reports", value: reports.length, icon: "homepage-pictures/icons8-report-100.png" },
    { title: "Avg Resolution Time", value: "0 hrs", icon: "homepage-pictures/icons8-time-100.png" },
    { title: "Urgent Tickets", value: reports.filter(r => r.priority?.toLowerCase() === 'urgent').length, icon: "homepage-pictures/icons8-warning-100.png" },
    { title: "Active Teams", value: "11", icon: "homepage-pictures/icons8-team-100.png" }
  ];

  return (
    <section id="admin-dash" className="page active">
      {/* --- ADMIN HEADER --- */}
      <div className="header-admin">
        <div className="left-section">
          <img className="lasufixer-logo-admin" src="homepage-pictures/logo-blue-n.png" alt="Logo" />
        </div>
        <div className="mid-section">
          <h3>Dashboard Overview</h3>
        </div>
        <div className="right-section">
          <button className="log-out-btn" onClick={() => goTo('landing')}>Logout</button>
        </div>
        
      </div>

      {/* --- SIDEBAR --- */}
      <div className="sidebar">
        <div className="sidebar-link active" onClick={() => goTo('admin')}>
          <img src="homepage-pictures/icons8-menu-100.png" alt="menu" />
          <div>Dashboard</div>
        </div>
        <div className="sidebar-link" onClick={() => document.getElementById('report-table-section').scrollIntoView({behavior: 'smooth'})}>
          <img src="homepage-pictures/icons8-report-100.png" alt="reports" />
          <div>Reports</div>
        </div>
        <div className="sidebar-link">
          <img src="homepage-pictures/icons8-team-100.png" alt="teams" />
          <div>Teams</div>
        </div>
        <div className="sidebar-link">
          <img src="homepage-pictures/icons8-warning-100.png" alt="incidents" />
          <div>Incidents</div>
        </div>
        <div className="sidebar-link">
          <img src="homepage-pictures/icons8-settings-100.png" alt="settings" />
          <div>Settings</div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="admin-card">
        
        {/* STATS GRID */}
        <div className="card-stat">
          {stats.map((stat, index) => (
            <div className="admin-stat" key={index}>
              <div className="stat-tt">
                <div className="stat-header">
                  <h4 className="stat-tn">{stat.title}</h4>
                  <img className="stat-icon" src={stat.icon} alt="icon" />
                </div>
                <p className="stat-tnx-admin">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* DATA TABLE */}
        <div className="table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Category</th>
                <th>Location</th>
                <th>Assigned Personnel</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>#{report.id}</td>
                  <td>{report.category}</td>
                  <td>{report.location}</td>
                  <td>{report.personnel}</td>
                  <td>{report.priority}</td>
                  <td>
                    <span className={`status-pill ${report.status}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => alert(`Reviewing: ${report.description}`)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;