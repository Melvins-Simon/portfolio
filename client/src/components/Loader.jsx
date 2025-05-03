import { motion } from "framer-motion";

const Loader = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="flex justify-center mb-8"
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          {[...Array(3)].map((_, index) => (
            <motion.span
              key={index}
              className="block w-4 h-4 mx-1 rounded-full bg-gradient-to-br from-purple-400 to-pink-600"
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Loading...
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          className="h-1 mt-6 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        />
      </div>
    </div>
  );
};

export default Loader;
