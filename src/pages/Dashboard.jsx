import React, { useState, useEffect } from 'react';

const Dashboard = ({ goTo, user, handleLogout }) => {
  
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const displayName = user?.fullName 
  ? user.fullName.split(' ')[0] 
  : "Friend 😊";

  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/reports')
      .then(res => res.json())
      .then(data => {
        // Filter reports to only show the ones belonging to this user
        const sortedReports = data.reverse(); 

        // 2. Slice the first 3 items
        const recentThree = sortedReports.slice(0, 3);

        setReports(recentThree);
        setIsLoading(false);
      })
      .catch(err => console.error("Error fetching reports:", err));
  }, [user]);

  // 3. Calculate the stats based on the data we just fetched
  const total = reports.length;
  const pending = reports.filter(r => r.status === 'pending').length;
  const inProgress = reports.filter(r => r.status === 'in-progress').length;
  const resolved = reports.filter(r => r.status === 'resolved').length;

  {/* ---const deleteReport = (id) => {
  // 1. Ask for confirmation so they don't click it by accident
    if (window.confirm("Are you sure you want to delete this report?")) {
      
      // 2. Tell the server to delete the specific report by its ID
      fetch(`http://localhost:5000/reports/${id}`, {
        method: 'DELETE',
      })
      .then(res => {
        if (res.ok) {
          // 3. Update the UI state so the report disappears instantly
          setReports(prev => prev.filter(report => report.id !== id));
          alert("Report deleted successfully.");
        }
      })
      .catch(err => console.error("Could not delete:", err));
    }
  };---*/}

  return (
    
    <section>
      
      <div className="header-logn-dash">
        <div className="left-section">
          <img className="lasufixer-logo-logn" src="homepage-pictures/logo-blue-n.png" alt="Logo" />
        </div>
        <div className="left-section">
          <img className="notify-btn" src="homepage-pictures/bell.png" alt="Notifications" />
          <button className="logout-btn"  onClick={handleLogout}>Logout</button>
        </div>

      </div>



      <div className="dashboard-deet">
        <div>
          <p className="head-d">Hello, {displayName}!</p>
          <p className="head-dn">What brings you here today?</p>

          <div className="dashboard-btn">
            
            <div className="stat-card">
              <div className="stat-t">
                <h4 className="stat-tn">Total Reports</h4>
                <p className="stat-tnx">{isLoading ? "..." : total}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-t">
                <h4 className="stat-tn">Pending</h4>
                <p className="stat-tnx">{isLoading ? "..." : pending}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-t">
                <h4 className="stat-tn">InProgress</h4>
                <p className="stat-tnx">{isLoading ? "..." : inProgress}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-t">
                <h4 className="stat-tn">Resolved</h4>
                <p className="stat-tnx">{isLoading ? "..." : resolved}</p>
              </div>
            </div>
          </div>

          <div className="reports">
            <p className="report-head">Recent Reports</p>
            {reports.length === 0 ? (
              <div className="empty-state">
                <p>No recent activity. Everything looks good! ✅</p>
              </div>
            ) : (
              reports.map(report => (
                <div className="report-card" key={report.id}>

                  <img 
                  src={report.image || "homepage-pictures/default-damage.jpg"} 
                  alt={report.description} 
                  />

                  <div className="report-info">
                    <h3>{report.description}</h3>
                    <p><strong>Location:</strong> {report.location}</p>
                    <p><strong>Date:</strong> {report.date}</p>
                  </div>
                  <div className={`status-${report.status}`}>
                    <p>{report.status}</p>
                  </div>

                  {/* ---<button onClick={() => deleteReport(report.id)} className="delete-btn">
                    🗑️ Delete
                  </button>---*/}
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* --- DASHBOARD FOOTER NAVIGATION --- */}
      <div className="footer-logn-dash">
        <div className="card" onClick={() => goTo('landing')}>
          <img className="foot-img" src="homepage-pictures/home.png" alt="Home" />
          <p>Home</p>
        </div>

        <div className="card" onClick={() => goTo('report')}>
          <img className="foot-img" src="homepage-pictures/report.png" alt="Report" />
          <p>Report</p>
        </div>

        <div className="card" onClick={() => goTo('track')}>
          <img className="foot-img" src="homepage-pictures/research.png" alt="Track" />
          <p>Track</p>
        </div>

        <div className="card" onClick={() => goTo('profile')}>
          <img className="foot-img-profile" src="homepage-pictures/lasu-profile.png" alt="Profile" />
          <p>You</p>
        </div>

      </div>
    </section> 
  );

};

export default Dashboard;