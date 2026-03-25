import React from 'react';

const LandingPage = ({ goTo }) => (
    <div className="landing-container">
      <header>
        <div className="header">
          <div className="left-section">
            <img className="lasufixer-logo" src="homepage-pictures/logo-white-n.png"/>
          </div>

          <div className="right-section">
            <button className="login-btn" onClick={() => goTo('login')}>
              Login
            </button>
          </div>
        </div>
  
      </header>

      <div className="body-general">
        <section className="scrol-section sect-intro">
          <div className="body-one">
            <h2 className="heading-first">
              Report Campus Facility Issues. Get Them Fixed Faster!
            </h2>

            <p className="heading-paragraph">
              A smart digital platform for Lagos State University
              students and staff to report damaged facility, track
              repairs, and improve campus life - <u className="under-paragraph">transparently and efficiently.</u>
            </p>

            <div className="video-flex">
              <video controls autoPlay muted loop playsInline>
                <source src="homepage-videos/video.lasu.mp4" type="video/mp4" />
              </video>

              <div className="video-content">
                <h1>Snap</h1>
                <h1>Report</h1>
                <h1>Track</h1>
                <button onClick={() => goTo('login')}>Report a Damage</button>
              </div>
            </div>
          </div>
        </section>

        <section className="scrol-section sect-two">
          <div className="how-info">
            <div className="how-title">
              <h3>
              How LasuFixers Work
              </h3>
            </div>
                        

            <div className="how-deet">
              <div className="how-deets">
                <img
                src="homepage-pictures/student_taking_photo-preview.png"/>
                <p><strong>Snap a Photo</strong></p>
                <p>Take a picture of the damaged facility</p>
              </div>

              <span style={{ fontSize: '60px' }}>&#8594;</span>

              <div className="how-deets">
                <img
                src="homepage-pictures/map_icon-preview.png"/>
                <p><strong>Auto Detect Locations</strong></p>
                <p>Gps and addresses are captured for authenticity</p>
              </div>

              <span style={{ fontSize: '60px' }}>&#8594;</span>

              <div className="how-deets">
                <img
                src="homepage-pictures/document.png"/>  
                <p><strong>Submit Report</strong></p>
                <p>Add short description and submit</p>
              </div>

                            
              <span style={{ fontSize: '60px' }}>&#8594;</span>

              <div className="how-deets">
                <img
                src="homepage-pictures/project-status.png"/>  
                <p><strong>Track Repair Status</strong></p>
                <p>See updates</p>
              </div>

            </div>  
                        
          </div>
        </section>

        <section className="scrol-section sect-three">
          <div className="what-info">
            <div className="what-title">
              <h3 className="what-heading">
              Here's what you can report on campus
              </h3>
            </div>
                        

            <div className="what-deet-flex">              
              <div className="what-deet">
                <div className="what-deets">
                  <img className="clas-icon"
                  src="homepage-pictures/university.png"/>
                  <p className="claz"><strong>Lecture Halls</strong></p>
                  <p>Broken chairs, damaged boards, faulty projectors</p>
                </div>
                                
                                
                <div className="what-deets">
                  <img className="light-icon"
                  src="homepage-pictures/lightning_icon-preview.png"/>
                  <p className="elect"><strong>Electrical Issues</strong></p>
                  <p>Faulty lighting, exposed wiring</p>
                </div>
                                
   
                <div className="what-deets">
                  <img className="office-icon"
                  src="homepage-pictures/workspace.n.png"/>
                  <p className="offiz"><strong>Offices</strong></p>
                  <p className="door">Doors, windows, Ceilings</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        <section className="scrol-section sect-four">
          <div className="why-info">
            <div className="why-title">
              <h3>
              Why LasuFixers Matters
              </h3>
            </div>

            <div className="why-deets-flexx">
              <div className="deets-flexx">
                <img src="homepage-pictures/puzzles.png"/>
              </div>

              <div className="why-deets">
                <div className="deet">
                  <img className="fast-icon"
                  src="homepage-pictures/airplane-flying-preview.png"/>
                  <p><strong>Faster Response Time</strong></p>
                  <p>Our real-time reporting system connects students 
                  and staff directly to facility managers, ensuring 
                  immediate visibility of issues and rapid response 
                  across campus.
                  </p>
                </div>
                                
                <div className="deet">
                  <img className="transparent-icon"
                  src="homepage-pictures/trust.png"/>
                  <p><strong>Transparency and Accountability</strong></p>
                  <p>Every voice is heard, every report is seen, and 
                  every issue is followed through building trust 
                  through openness and responsibility.
                  </p>
                </div>

                <div className="deet">
                  <img className="learning-icon"
                  src="homepage-pictures/improved_learning_icon-preview.png"/>
                  <p><strong>Improved Learning Environment</strong></p>
                  <p>Better facilities support quality education</p>
                </div>
              </div>
            </div>                       
          </div>
        </section>

        <section className="scrol-section sect-five">
          <div className="community-info">
            <div className="community-title">
              <h3>
              Designed for the LASU Community
              </h3>
            </div>
                        

            <div className="community-row">
              <div className="community-card">
                <img className="stud"
                src="homepage-pictures/lasu students.jpg"/>
                <p className="community-text">Students</p>
              </div>
                            
              <div className="community-card">
                <img src="homepage-pictures/lasu staff.jpg"/>
                <p className="community-text">Staffs</p>
              </div>

              <div className="community-card">   
                <img src="homepage-pictures/lasu facility engineers.jpg"/>
                <p className="community-text">Facility Managers</p>
              </div>
            </div>
          </div>
       </section>

        <p className="foot">
        Help improve Lagos State University's infrastructure - <u className="under-color">one report at a time</u>
        </p>

      </div>
    </div>
);

export default LandingPage;