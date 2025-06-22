import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    // Simulate a loading delay of 1 second
    setTimeout(() => {
      setWishlist(savedWishlist);
      setLoading(false);
    }, 1000);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((book) => book.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-6">❤️ My Wishlist</h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="loading-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      ) : wishlist.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-300 hover:shadow-xl"
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-60 w-full object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold mt-3">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">${book.price}</p>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/book/${book.id}`}
                  className="text-white text-center py-2 px-4 rounded-lg bg-green-600 hover:bg-green-700"
                >
                  📖 View Details
                </Link>

                <button
                  onClick={() => removeFromWishlist(book.id)}
                  className="text-2xl text-red-500 hover:text-red-700 transition"
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
