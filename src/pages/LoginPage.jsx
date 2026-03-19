import React, { useState } from 'react';

const LoginPage = ({ goTo, setIsLoggedIn, setCurrentUser }) => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState(''); 
  const [otp, setOtp] = useState('');     
  const [generatedOtp, setGeneratedOtp] = useState(null); // New state to hold the random code
  const [isLoading, setIsLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);

  // Step 1: Check if the email exists and "send" a random OTP
  const handleEmailCheck = () => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}users?email=${email.trim()}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          // 1. Generate a random 4-digit OTP
          const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
          setGeneratedOtp(newOtp);
          
          // 2. Simulate sending the email with an alert
          alert(`LASU Security: Your one-time code is ${newOtp}`);
          
          setFoundUser(data[0]); 
          setStep('otp');        
        } else {
          alert("This email is not registered in LASUFixer.");
        }
      })
      .catch(err => alert("Server error. Is your JSON server running?"))
      .finally(() => setIsLoading(false));
  };

  // Step 2: Verify the random OTP
  const handleLoginFinal = () => {
    if (otp === generatedOtp) { 
      // 1. Persistent Login
      //localStorage.setItem('lasuUser', JSON.stringify(foundUser));
      
      // 2. Update App.jsx memory
      setCurrentUser(foundUser);
      setIsLoggedIn(true);

      // 3. Role-based Routing
      if (foundUser.role === 'admin') {
        goTo('admin');
      } else {
        goTo('dashboard');
      }
    } else {
      alert("Invalid OTP. Please check the code sent to your 'email'.");
    }
  };

  return (
    <section>
      <div className="login-page">

        <div>
          <img className="login-bg"
          src="homepage-pictures/lasu-library.jpg"/>
        </div>

        <div className="login-deet">
          <img className="login-logo" src="homepage-pictures/logo-blue-n.png" alt="Logo" />
          <p className="head-title">Login</p>
          
          {step === 'email' ? (
            <div className="login-step">
              <h5 className="enter-deet">Enter Email</h5>
              <input type="email" placeholder="Institutional Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
              <button className="log-button" 
              onClick={handleEmailCheck} disabled={isLoading}>{isLoading ? "Verifying..." : "Next"}</button>
            </div>
          ) : (
            <div className="login-step">
              <h5 className="enter-deet">Enter OTP</h5>
              <p className="otp-instruction">We sent a 4-digit code to {email}</p>
              <input type="text" placeholder="0000"
              maxLength="4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} />
              <button className="log-button" onClick={handleLoginFinal}>Login</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;