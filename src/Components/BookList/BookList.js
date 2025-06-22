import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Import heart icons
import "./BookList.css";

function BooksList({ selectedCategory }) {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("title");
  const [error, setError] = useState(null);
  const booksPerPage = 8;

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);

    setLoading(true);
    const categoryQuery = selectedCategory ? `subject:${selectedCategory}` : "";
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${categoryQuery}&maxResults=40`
      )
      .then((response) => {
        if (response.data.items) {
          const fetchedBooks = response.data.items.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors
              ? item.volumeInfo.authors.join(", ")
              : "Unknown Author",
            image: item.volumeInfo.imageLinks
              ? item.volumeInfo.imageLinks.thumbnail
              : "https://via.placeholder.com/150",
            price: (Math.random() * 20 + 5).toFixed(2),
          }));
          setBooks(fetchedBooks);
        } else {
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      });
  }, [selectedCategory]);

  const toggleWishlist = (book) => {
    let updatedWishlist;
    if (wishlist.some((item) => item.id === book.id)) {
      updatedWishlist = wishlist.filter((item) => item.id !== book.id);
    } else {
      updatedWishlist = [...wishlist, book];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedBooks = books.sort((a, b) =>
    a[sortOption] > b[sortOption] ? 1 : -1
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    if (currentPage < Math.ceil(sortedBooks.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 return (
  <div className="p-10 bg-gradient-to-b from-[#f3f4f6] to-[#e2e8f0] min-h-screen text-gray-900 font-roboto">
    <h2 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-3">
      <span>📚</span> Book Collection
    </h2>

    <div className="flex justify-end mb-6">
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="px-4 py-2 border rounded-lg shadow-sm"
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>

    {error ? (
      <div className="text-center text-red-500">{error}</div>
    ) : loading ? (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="loading-animation">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className="relative bg-white p-5 rounded-lg shadow-md border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Heart Icon in Top-Right Corner */}
              <button
                onClick={() => toggleWishlist(book)}
                className="heart-icon"
              >
                {wishlist.some((item) => item.id === book.id) ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>

              <img
                src={book.image}
                alt={`Cover of the book titled ${book.title}`}
                className="h-60 w-full object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold mt-3 text-gray-800">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm">Author: {book.author}</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">
                ${book.price}
              </p>

              <Link
                to={`/book/${book.id}`}
                className="block mt-4 text-white text-center py-2 px-4 rounded-lg bg-gradient-to-r from-[#4CAF50] to-[#2C5F2D] shadow-md hover:from-[#2C5F2D] hover:to-[#1E3A5F] transition duration-300"
              >
                📖 View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 gap-3">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#4CAF50] text-white hover:bg-[#2C5F2D]"
            }`}
          >
            ◀ Previous
          </button>

          <span className="text-lg font-bold bg-[#2C5F2D] text-white px-4 py-2 rounded-full">
            {currentPage}
          </span>

          <button
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(sortedBooks.length / booksPerPage)
            }
            className={`px-4 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
              currentPage >= Math.ceil(sortedBooks.length / booksPerPage)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#4CAF50] text-white hover:bg-[#2C5F2D]"
            }`}
          >
            Next ▶
          </button>
        </div>
      </>
    )}
  </div>
);

}

export default BooksList;
