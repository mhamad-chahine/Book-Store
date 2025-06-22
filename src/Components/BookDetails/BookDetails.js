import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../CartContext";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => {
        const bookData = {
          id: response.data.id,
          title: response.data.volumeInfo.title,
          description: response.data.volumeInfo.description || "No description available.",
          authors: response.data.volumeInfo.authors
            ? response.data.volumeInfo.authors.join(", ")
            : "Unknown Author",
          image: response.data.volumeInfo.imageLinks
            ? response.data.volumeInfo.imageLinks.thumbnail
            : "https://via.placeholder.com/200",
          price: (Math.random() * 20 + 5).toFixed(2),
        };
        setBook(bookData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch book details. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!book) return <p className="text-center mt-10">No book details available.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col md:flex-row max-w-4xl w-full">
        <img
          src={book.image}
          alt={book.title}
          className="w-72 h-96 object-cover rounded-lg shadow-md mx-auto md:mx-0"
        />
        <div className="md:ml-8 mt-6 md:mt-0 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800">{book.title}</h2>
            <p className="text-gray-500 text-lg mb-2"><strong>Author:</strong> {book.authors}</p>
            <p className="text-blue-600 font-bold text-xl mb-4">${book.price}</p>
            <p className="text-gray-700 text-sm leading-6 whitespace-pre-line">{book.description}</p>
          </div>
          <div className="mt-6">
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all w-full"
              onClick={handleAddToCart}
            >
              Add to Cart 🛒
            </button>
            <button
  className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition-all w-full mt-2"
  onClick={() => navigate(-1)} // Go back to the previous page
>
  Go Back 🔙
</button>

          </div>
        </div>
      </div>

      {/* Pop-up Message */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-8 py-4 rounded-lg shadow-lg text-lg font-semibold animate-bounce">
          ✅ Book added to cart!
        </div>
      )}
    </div>
  );
}

export default BookDetails;
