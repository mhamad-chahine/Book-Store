import { useCart } from "../CartContext";
import { useState, useEffect } from "react";
import { Checkout } from "../index"; // Import the checkout modal

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false); // Modal state
  const [loading, setLoading] = useState(true);

  const totalPrice = cart
    .reduce((total, book) => total + parseFloat(book.price) * book.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    // Simulate a loading delay of 1 second
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Your Cart 🛒</h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="loading-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <p className="text-gray-600 text-lg mt-4">No items in cart.</p>
      ) : (
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          {cart.map((book, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 mb-4 last:border-none"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm">{book.authors}</p>
                <p className="text-blue-600 font-bold text-lg">${book.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400 transition-all"
                    onClick={() => updateQuantity(book.id, book.quantity - 1)}
                    disabled={book.quantity === 1}
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg">{book.quantity}</span>
                  <button
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400 transition-all"
                    onClick={() => updateQuantity(book.id, book.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                onClick={() => removeFromCart(book.id)}
              >
                🗑️ Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">
              Total: <span className="text-blue-600">${totalPrice}</span>
            </p>
          </div>

          {/* Open Checkout Modal */}
          <button
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg shadow-md hover:bg-green-700 transition-all"
            onClick={() => setShowCheckout(true)}
          >
            ✅ Proceed to Checkout
          </button>
        </div>
      )}

      {/* Checkout Popup */}
      {showCheckout && <Checkout onClose={() => setShowCheckout(false)} />}
    </div>
  );
}

export default Cart;
