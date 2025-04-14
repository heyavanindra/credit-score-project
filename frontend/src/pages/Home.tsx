import { motion } from "motion/react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Welcome to Your Personal Dashboard
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8">
          Track insights, manage data, and experience a beautiful, intuitive interface.
        </p>
        <Link to={"/info"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default Home
