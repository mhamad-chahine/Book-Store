import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Assuming you are using the same styling file as for Login

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Logic to handle sign up, e.g., API request
    const newUser = { email, password }; // You would typically send this data to your server
    console.log("User signed up:", newUser);

    setErrorMessage(""); // Clear error message
    navigate("/login"); // Redirect to login page after successful signup
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Sign Up</h2>

        {/* Email Input */}
        <label className="form-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="form-input"
        />

        {/* Password Input */}
        <label className="form-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="form-input"
        />

        {/* Confirm Password Input */}
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="form-input"
        />

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

        {/* Sign Up Button */}
        <button 
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-[#4CAF50] to-[#2C5F2D] shadow-md hover:from-[#2C5F2D] hover:to-[#1E3A5F] text-white p-3 mt-5 rounded-md font-semibold transition duration-200">


          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-sm text-gray-600 mt-3 text-center">
          Already have an account? <a href="/login" className="text-green-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
