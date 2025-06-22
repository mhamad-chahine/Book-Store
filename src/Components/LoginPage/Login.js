import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomePopup, setWelcomePopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "mohamad.abouchahine@outlook.com" && password === "admin") {
      const userData = { name: "Mohamad Abou Chahine" };
      localStorage.setItem("user", JSON.stringify(userData));

      setWelcomePopup(true); // Show welcome popup
      setErrorMessage(""); // Clear any previous error
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  const handleContinue = () => {
    setWelcomePopup(false);
    navigate("/books");

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Login</h2>

        {/* Email Input */}
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <label className="block text-gray-700 mt-4 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Remember Me + Forgot Password */}
        <div className="flex justify-between items-center mt-3 text-sm">
          <label className="flex items-center text-gray-600">
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={() => setRememberMe(!rememberMe)} 
              className="mr-2"
            />
            Remember me
          </label>
          <a href="#" className="text-green-500 hover:underline">Forgot Password?</a>
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

        {/* Login Button */}
        <button 
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-[#4CAF50] to-[#2C5F2D] shadow-md hover:from-[#2C5F2D] hover:to-[#1E3A5F] text-white p-3 mt-5 rounded-md font-semibold transition duration-200">
          Sign In
        </button>

        {/* Sign-up Link */}
        <p className="text-sm text-gray-600 mt-3 text-center">
          Don't have an account? <a href="/signup" className="text-green-500 hover:underline">Sign up</a>
        </p>
      </div>

      {/* Welcome Popup */}
      {welcomePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome!</h2>
            <p className="text-gray-600 mt-2">Hello, Mohamad Abou Chahine!</p>
            <button 
              onClick={handleContinue}
              className="bg-green-500 text-white px-5 py-2 mt-4 rounded-md hover:bg-green-700 transition">
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
