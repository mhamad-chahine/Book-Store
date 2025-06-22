import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBell, FaUser, FaSignOutAlt, FaCog, FaSearch, FaBook, FaBars, FaHome, FaSignInAlt } from "react-icons/fa";

function Navbar({ onCategorySelect }) {
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New book added: 'The Great Adventure'" },
    { id: 2, message: "Your order #1234 has been shipped!" },
  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const categoriesDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      setCartCount(storedCart.length);
      setWishlistCount(storedWishlist.length);
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target) &&
        userDropdownRef.current && !userDropdownRef.current.contains(event.target) &&
        notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target)
      ) {
        setCategoriesDropdownOpen(false);
        setUserDropdownOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Implement search functionality here
  };

  return (
    <nav className="p-2 shadow-md bg-gradient-to-r from-[#2C5F2D] to-[#1E3A5F] text-white">
      <div className="container mx-auto flex justify-between items-center space-x-4">
        
        {/* Left Section: Logo & Categories */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold flex items-center">
            BookStore
          </Link>

          {/* Categories Dropdown for Mobile */}
          <div className="relative md:hidden" ref={categoriesDropdownRef}>
            <button
              className="text-white hover:text-gray-300"
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
            >
              <FaBars />
            </button>
            {categoriesDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black border rounded-lg shadow-lg py-2 z-50">
                {[
                  { name: "Fiction", icon: "📖" },
                  { name: "Mystery", icon: "🕵️" },
                  { name: "Fantasy", icon: "🐉" },
                  { name: "Science Fiction", icon: "🚀" },
                  { name: "Romance", icon: "💖" },
                  { name: "Thriller", icon: "🔪" },
                  { name: "Young Adult", icon: "📕" },
                  { name: "Horror", icon: "👻" },
                  { name: "Biography", icon: "📜" },
                ].map(({ name, icon }) => (
                  <button
                    key={name}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left flex items-center"
                    onClick={() => onCategorySelect(name.toLowerCase())}
                  >
                    <span className="mr-2">{icon}</span> {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories Dropdown for Desktop */}
          <div className="relative hidden md:block" ref={categoriesDropdownRef}>
            <button
              className="hover:text-gray-300 font-medium flex items-center"
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
            >
              <FaBook className="mr-1" /> Categories
            </button>
            {categoriesDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black border rounded-lg shadow-lg py-2 z-50">
                {[
                  { name: "Fiction", icon: "📖" },
                  { name: "Mystery", icon: "🕵️" },
                  { name: "Fantasy", icon: "🐉" },
                  { name: "Science Fiction", icon: "🚀" },
                  { name: "Romance", icon: "💖" },
                  { name: "Thriller", icon: "🔪" },
                  { name: "Young Adult", icon: "📕" },
                  { name: "Horror", icon: "👻" },
                  { name: "Biography", icon: "📜" },
                ].map(({ name, icon }) => (
                  <button
                    key={name}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left flex items-center"
                    onClick={() => onCategorySelect(name.toLowerCase())}
                  >
                    <span className="mr-2">{icon}</span> {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar for Mobile */}
        <div className="relative md:flex-grow max-w-md hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for books..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* Right Section: Wishlist, Cart, Notifications, and User */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Wishlist - Show only if user is logged in */}
          {user && (
            <Link to="/wishlist" className="relative hover:text-gray-300 font-medium flex items-center">
              <FaHeart className="mr-1" /> Wishlist
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">{wishlistCount}</span>
              )}
            </Link>
          )}

          {/* Shopping Cart - Show only if user is logged in */}
          {user && (
            <Link to="/cart" className="relative hover:text-gray-300 font-medium flex items-center">
              <FaShoppingCart className="mr-1" /> Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">{cartCount}</span>
              )}
            </Link>
          )}

          {/* Notifications Dropdown - Show only if user is logged in */}
          {user && (
            <div className="relative" ref={notificationsDropdownRef}>
              <button
                className="hover:text-gray-300 font-medium flex items-center"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <FaBell className="mr-1" /> Notifications
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">{notifications.length}</span>
                )}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black border rounded-lg shadow-lg py-2 z-50">
                  {notifications.length > 0 ? (
                    notifications.map((note) => (
                      <div key={note.id} className="px-4 py-2 hover:bg-gray-100">
                        📢 {note.message}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No notifications</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* User Dropdown */}
          {user ? (
            <div className="relative" ref={userDropdownRef}>
              <button className="hover:text-gray-300 font-medium flex items-center"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                <FaUser className="mr-1" /> {user.name}
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black border rounded-lg shadow-lg py-2 z-50">
                  <Link to="/manage-account" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                    <FaCog className="mr-2" /> Manage Account
                  </Link>
                  <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 w-full flex items-center">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-[#FFD700] text-[#2C5F2D] px-4 py-2 rounded-lg font-semibold hover:bg-[#FFC107]">
              Login
            </Link>
          )}
        </div>
      </div>
{/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="absolute top-0 left-0 w-full bg-white text-black shadow-lg md:hidden">
    <div className="flex flex-col items-start p-4">
      <Link to="/wishlist" className="py-2 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
        <FaHeart className="text-lg" />
        <span>Wishlist</span>
      </Link>
      <Link to="/cart" className="py-2 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
        <FaShoppingCart className="text-lg" />
        <span>Cart</span>
      </Link>
      <Link to="/" className="py-2 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
        <FaHome className="text-lg" />
        <span>Home</span>
      </Link>
      {user ? (
        <>
          <Link to="/manage-account" className="py-2 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <FaCog className="text-lg" />
            <span>Manage Account</span>
          </Link>
          <button onClick={handleLogout} className="py-2 flex items-center space-x-2">
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <Link to="/login" className="py-2 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
          <FaSignInAlt className="text-lg" />
          <span>Login</span>
        </Link>
      )}
    </div>
  </div>
)}

    </nav>
  );
}

export default Navbar;
