import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookList, BookDetails, Cart, Login, Home, Navbar, ManageAccount , Wishlist, Signup} from './Components/index'; // Import ManageAccount
import { CartProvider } from "./Components/CartContext"; // Import CartProvider
import { useState } from "react"; // Import useState for category selection
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("fiction");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CartProvider> {/* Wrap your app with CartProvider */}
      <Router>
        <Navbar onCategorySelect={handleCategorySelect} /> {/* Pass the handler to Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList selectedCategory={selectedCategory} />} /> {/* Pass the selected category to BookList */}
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-account" element={<ManageAccount />} />
          <Route path="/signup" element={<Signup />} />

<Route path="/wishlist" element={<Wishlist />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
