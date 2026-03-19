import React, { useState, useRef } from 'react';

const ReportPage = ({ goTo, user }) => {
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState('Address will appear here...');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!photo) {
      alert("Please capture a photo of the damage first!");
      return;
    }

    const sizeInBytes = photo.length;
    const sizeInKb = (sizeInBytes / 1024).toFixed(2);
    
    console.log("📸 Photo Size:", sizeInKb, "KB");
    
    if (sizeInKb > 100) {
      console.warn("⚠️ Warning: Photo is over 100KB. JSON Server might reject this!");
    }

    setIsSubmitting(true);

    const newReport = {
      userId: user?.id || "anonymous",
      userName: user?.fullName || "Guest",
      description: description,
      manualLocation: locationName, // From the text area
      gpsAddress: address,          // From the GPS fetch
      image: photo,                 // The captured camera image
      status: "pending",
      date: new Date().toLocaleDateString()
    };

    fetch('${import.meta.env.VITE_API_URL}/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReport)
    })
    .then(() => {
      alert("Success! LASU authorities have been notified. 😊");
      goTo('dashboard');
    })
    .catch(err => {
      console.error(err);
      alert("Error saving report. Is your server running?");
    })
    .finally(() => setIsSubmitting(false));
  };

  // UseRefs to access HTML elements directly
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 1. START CAMERA
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // First, tell React to show the video element
      setCameraActive(true);
      setPhoto(null);

      // Give React a heartbeat (100ms) to put the <video> tag in the DOM
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("Camera stream successfully attached!");
        } else {
          console.error("Video element not found even after activation.");
        }
      }, 150);

    } catch (err) {
      alert("Camera access denied or not found.");
      console.error(err);
    }
};

  // 2. CAPTURE PHOTO
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = 400; 
    canvas.height = 300; 
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 400, 300);
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.1);
    setPhoto(dataUrl);
    setCameraActive(false);
    
    // Stop the camera stream
    const stream = video.srcObject;
    stream.getTracks().forEach(track => track.stop());

    getLocation(); // Trigger GPS
  };

  // 3. RESET/RETAKE
  const resetCamera = () => {
    setPhoto(null);
    initCamera();
  };

  // 4. GPS & ADDRESS LOGIC
  const getLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setAddress("Finding your location...");
      
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchAddress(latitude, longitude);
      }, () => {
        setIsLoading(false);
        setAddress("Location access denied.");
      });
    }
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      setAddress(data.display_name || "Address not found");
    } catch (err) {
      setAddress("Error fetching address.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section id="report" className="page">
      <div className="header-logn">
        <div className="left-section">
          <img className="lasufixer-logo-logn" src="homepage-pictures/logo-blue-n.png" alt="Logo" />
        </div>
      </div>

  

      <div className="report-deet">

        <button className='back-arrow-btn' onClick={() => goTo('dashboard')}>
          <img className="fot-img" src="homepage-pictures/icons8-left-arrow-100.png" alt="Report" />
        </button>

        <h2>Report Damage</h2>

        <p>Description*</p>
        <textarea 
          className="txt" 
          placeholder="Enter a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <p>Location*</p>
        <textarea 
          className="txt" 
          placeholder="e.g science building"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />

        <div className="camera-container">
          <div className="camera-box">
            {/* If no photo is taken, keep the video tag in the DOM so the Ref can find it */}
            {!photo ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img src={photo} alt="Captured damage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>

          <div className="button-group">
            {!cameraActive && !photo && <button onClick={initCamera}>Turn On Camera</button>}
            {cameraActive && <button onClick={takePhoto}>Capture Photo</button>}
            {photo && <button onClick={resetCamera}>Retake Photo</button>}
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        <div id="location-container">
          {isLoading && <div className="spinner"></div>}
          <span>{address}</span>
        </div>

        <button className="capture-btn" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Uploading..." : "Submit Report"}
        </button>
      </div>
    </section>
  );
};

export default ReportPage;