import React, { useState, useEffect } from 'react';

const TrackPage = ({ user, goTo }) => {

  const [allReports, setAllReports] = useState([]); // The full list from server
  const [displayReports, setDisplayReports] = useState([]); // The list the user sees
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("all"); // 'all', 'pending', 'in-progress', 'resolved'

  // 1. Fetch data on load
  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/reports')
      .then(res => res.json())
      .then(data => {
        // Filter by current user and show newest first
        const myData = data.filter(r => r.userId === user?.id).reverse();
        setAllReports(myData);
        setDisplayReports(myData);
      });
  }, [user]);

  // 2. The Search & Filter Engine
  useEffect(() => {
    let results = allReports;

    // Filter by Search Text (Description or Address)
    if (searchTerm) {
      results = results.filter(r => 
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.gpsAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Status Tab
    if (statusTab !== "all") {
      results = results.filter(r => r.status === statusTab);
    }

    setDisplayReports(results);
  }, [searchTerm, statusTab, allReports]);


  return (
    <section id="track" className="page">
      <div className="header-logn">
        <div className="left-section">
          <img className="lasufixer-logo-logn" src="homepage-pictures/logo-blue-n.png" alt="LASU Fixer Logo" />
        </div>
      </div>

      <div className="tracking-deet">

        <button className='back-arrow-track-btn' onClick={() => goTo('dashboard')}>
          <img className="fotrack-img" src="homepage-pictures/icons8-left-arrow-100.png" alt="dashboard" />
        </button>

        <h2>Track</h2>

        {allReports.length > 0 && (
          <div className="search-bar-container">
            <input 
              type="text" 
              className="search-input"
              placeholder="Search by description or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <div id="tracking-screen" className="page-container">
          
          {/* --- EMPTY STATE --- */}
          {allReports.length === 0 &&  (
            <div id="empty-state" className="empty-container">
              <div className="empty-icon">📂</div>
              <h3>No Reports Yet</h3>
              <p>Your campus looks great! If you see something broken, let us know.</p>
              <button className="primary-btn" onClick={() => goTo('report')}>
                Report Damage
              </button>
            </div>
          )}


          {/* Professional Status Tabs */}
          <div className="status-tabs">
            {['all', 'pending', 'in-progress', 'resolved'].map(tab => (
              <button 
                key={tab}
                className={statusTab === tab ? "tab-active" : "tab-btn"}
                onClick={() => setStatusTab(tab)}
              >
              {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* The List */}
          <div className="track-list">
            {displayReports.length > 0 ? (
             
              displayReports.map(report => (
                <div key={report.id} className="professional-card">
                  <div className="card-top">
                    <span className={`status-pill ${report.status}`}>{report.status}</span>
                    <span className="date-label">{report.date}</span>
                  </div>
                  <h3>{report.description}</h3>
                  <p className="loc-text">📍 {report.gpsAddress || "Location not provided"}</p>
                </div>
              ))
            ) : (
            <div className="empty-state">No matching reports found.</div>
            )}
          </div>

          {/* --- FILTER BAR (Only show if there are reports) --- */}
          {/* ---{reports.length > 0 && (
            <>
              <div className="filter-bar">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
                  onClick={() => setFilter('all')}
                >All</button>
                <button 
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} 
                  onClick={() => setFilter('pending')}
                >Pending</button>
                <button 
                  className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`} 
                  onClick={() => setFilter('in-progress')}
                >In Progress</button>
                <button 
                  className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`} 
                  onClick={() => setFilter('resolved')}
                >Fixed</button>
              </div>

              {/* --- REPORT LIST --- 
              <div id="report-list" className="report-container">
                {reports.map((report) => (
                  <div className="repor-card" key={report.id}>
                    <div className="card-header">
                      <div>
                        <span className="report-id">#{report.id}</span>
                        <h3>{report.title}</h3>
                      </div>
                      <div className={`status-pill ${report.status}`}>
                        {report.status.replace('-', ' ')}
                      </div>
                    </div>

                    <hr />

                    <div className="timeline">
                      <div className="timeline-item completed">
                        <div className="dot"></div>
                        <div className="content">
                          <strong>Report Submitted</strong>
                          <p>{report.date}</p>
                        </div>
                      </div>
                      <div className="timeline-item active">
                        <div className="dot"></div>
                        <div className="content">
                          <strong>Maintenance Assigned</strong>
                          <p>Technician: John Doe is on the way.</p>
                        </div>
                      </div>
                      <div className="timeline-item pending">
                        <div className="dot"></div>
                        <div className="content">
                          <strong>Repairs Completed</strong>
                          <p>Waiting for fix...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}--- */}
        </div>
      </div>
    </section>
  );
};

export default TrackPage;