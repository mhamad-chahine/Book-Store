import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
<div className="text-center p-10 bg-gradient-to-r from-[#2C5F2D] to-[#1E3A5F] min-h-screen flex flex-col items-center justify-center text-white">
{/* Welcome Message */}      
      {/* Welcome Message with Animation */}
      <motion.h1 
        className="text-6xl font-extrabold  drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to Book Store 📚
      </motion.h1>

      {/* Subheading with Fade-in Effect */}
      <motion.p
        className="text-xl text-gray-800 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        Discover a world of knowledge. Buy, rent, or explore the best books in every genre.
      </motion.p>

      {/* Browse Books Button with Hover Effects */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        <Link
          to="/books"
          className="mt-6 inline-block bg-[#2C5F2D] text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-[#1E3A5F] hover:scale-105 transition duration-300 ease-in-out"
        >
          📖 Browse Books
        </Link>
      </motion.div>

      {/* Decorative Line */}
      <motion.div 
        className="mt-10 w-20 border-b-4 border-[#2C5F2D]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
      ></motion.div>
    </div>
  );
}

export default Home;
