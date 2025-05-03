import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Notfound = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl"
          >
            <div className="text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              404
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Page Not Found
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setisLoading(true);
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md font-medium text-lg cursor-pointer"
            >
              Return Home
            </motion.button>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="mt-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Notfound;
