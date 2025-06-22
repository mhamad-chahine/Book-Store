import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ManageAccount() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account details updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Account</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-[#4CAF50] text-white py-2 rounded-lg font-semibold transition duration-300 hover:bg-[#2C5F2D] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
        >
          Save Changes
        </button>
      </form>
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="w-full bg-red-500 text-white mt-4 py-2 rounded-lg font-semibold transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete Account
      </button>
    </div>
  );
}

export default ManageAccount;
