import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const Unauthorized = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginRedirect = () => {
    setIsLoading(true);
    // Simulate loading before redirect
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };
  const handleLoginRedirect2 = () => {
    setIsLoading(true);
    // Simulate loading before redirect
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  if (isLoading) return <Loader />;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-4"
          >
            {/* Animated Lock Icon */}
            <motion.div
              initial={{ y: -20, rotate: -15 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{
                y: { type: "spring", stiffness: 300, damping: 15 },
                rotate: { type: "spring", stiffness: 300 },
              }}
              className="text-8xl mb-6"
            >
              🔐
            </motion.div>

            <h1 className="max-md:text-3xl text-4xl md:text-5xl font-bold mb-6">
              <TypeAnimation
                sequence={["Unauthorized Access", 1000, "403 Forbidden", 1000]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-6"
            >
              You don't have permission to view this resource.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  background: "linear-gradient(to right, #9333ea, #ec4899)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoginRedirect}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md font-medium cursor-pointer"
              >
                Sign In
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: "#a855f7",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoginRedirect2}
                className="px-6 py-3 bg-transparent border border-purple-400 rounded-md font-medium cursor-pointer"
              >
                Return Home
              </motion.button>
            </motion.div>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent my-6 transform origin-left"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.9 }}
              className="text-sm text-gray-400 mt-8 flex flex-col justify-center items-center"
            >
              <span className="font-semibold text-blue-100">
                {" "}
                You want to explore dashboard?
              </span>
              <span className="flex justify-center items-center gap-3 mt-2">
                {" "}
                <a
                  href="mailto:melvinssimon@gmail.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email
                </a>
                <a
                  href={`https://wa.me/+254793867001`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat
                </a>
              </span>
            </motion.p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Unauthorized;
