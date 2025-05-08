import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import axios from "axios";
import toast from "react-hot-toast";
import { Globalstate } from "../context/Globalcontext";
import Loader from "../components/Loader";

const Portfolio = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Globalstate);
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const Handleactive = async (tab) => {
    setActiveTab(tab);
    if (tab === "admin") {
      try {
        const res = await axios.get("http://localhost:5000/api/check-auth");
        setIsAuthenticated(true);
        navigate("/admin");
        toast.success(res.data.message || "Reconnected!");
      } catch (error) {
        navigate("/unauthorized");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div
              onClick={() => setActiveTab("home")}
              className="flex items-center cursor-pointer"
            >
              <Logo />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              >
                Melvins Simon
              </motion.span>
            </div>
            <div className="hidden md:flex items-center space-x-8 ">
              {["home", "about", "projects", "contact", "admin"].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => Handleactive(tab)}
                  className={`capitalize px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                    activeTab === tab
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden fixed top-2 right-4 z-50">
        {/* Mobile Toggler */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-purple-600 p-3 rounded-full shadow-lg"
        >
          {mobileMenuOpen ? (
            // Close (X) icon
            <motion.svg
              key="close"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            // Hamburger icon
            <motion.svg
              key="menu"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </motion.svg>
          )}
        </motion.div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mb-4 w-48 bg-gray-800 rounded-md shadow-lg py-1"
          >
            {["home", "about", "projects", "contact", "admin"].map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm capitalize ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Main Content */}
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        {activeTab === "home" && <HeroSection setActiveTab={setActiveTab} />}
        {activeTab === "about" && <AboutSection />}
        {activeTab === "projects" && <ProjectsSection />}
        {activeTab === "contact" && <ContactSection />}
        {activeTab === "admin" && isAuthenticated ? (
          <Navigate to={"/admin"} />
        ) : activeTab === "admin" && !isAuthenticated ? (
          <Navigate to={"/unauthorized"} />
        ) : (
          ""
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Melvins Simon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ setActiveTab }) => {
  const API_URL = "http://localhost:5000/api";
  axios.defaults.withCredentials = true;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-profile`);
        setProfile(res.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile({
          techStack: [
            "Full-Stack Developer",
            "AI Engineer",
            "Cloud Specialist",
          ],
          welcomeText:
            "I design and deploy scalable AI-integrated applications",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Fallback tech stack
  const techStack = profile?.techStack?.length
    ? profile.techStack
    : ["Full-Stack Developer", "AI Engineer", "Cloud Specialist"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-pulse text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 flex flex-col items-center justify-center min-h-[80vh]"
    >
      <div className="text-center max-w-3xl px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          {profile?.title || "Your Name"}
        </motion.h1>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-purple-400 min-h-[2.5rem] mb-2"
        >
          <TypeAnimation
            sequence={techStack.flatMap((tech) => [tech, 2000])}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ display: "inline-block" }}
          />
        </motion.div>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          {profile?.welcomeText ||
            "I design and deploy scalable AI-integrated applications"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("projects")}
            className="px-6 py-3 bg-purple-600 rounded-md font-medium cursor-pointer"
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("contact")}
            className="px-6 py-3 bg-transparent border border-purple-400 rounded-md font-medium cursor-pointer"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-20"
      >
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </motion.div>
    </motion.section>
  );
};

// About Section Component

const AboutSection = () => {
  const API_URL = "http://localhost:5000/api";
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, skillsRes] = await Promise.all([
          axios.get(`${API_URL}/get-profile`),
          axios.get(`${API_URL}/skills`),
        ]);
        setProfile(profileRes.data.profile);
        setSkills(skillsRes.data.skills);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 max-w-7xl mx-auto -mt-16 flex justify-center">
        <div className="animate-pulse text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 max-w-7xl mx-auto -mt-16"
      id="about"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        About Me
      </h2>

      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center px-4">
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-max rounded-full overflow-hidden w-max border-2 border-purple-500/20"
          >
            <img
              src={profile?.image?.url || "/melvins.png"}
              alt="Profile"
              className="h-60 w-60 object-cover"
              onError={(e) => {
                e.target.src = "/melvins.png";
              }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-purple-300">
            {profile?.title || "Full-Stack AI Engineer | Cloud & Data Systems"}
          </h3>
          <p className="text-gray-300 mb-6">
            {profile?.bio ||
              "I specialize in building AI-integrated applications and scalable data pipelines."}
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">
                Technical Skills
              </h4>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill._id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
// Projects Section Component
const ProjectsSection = () => {
  axios.defaults.withCredentials = true;
  const [projects, setprojects] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setisLoading(false);
      try {
        setisLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/get-projects"
        );
        setprojects(response.data?.projects);
        setisLoading(false);
      } catch (error) {
        setisLoading(false);
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-20 md:max-w-7xl md:mx-auto -mt-16"
        >
          <h2 className="text-3xl md:text-4xl  font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            My Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all group"
              >
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.link}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 rounded-md text-sm font-medium"
                  >
                    View Project
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(false);
    try {
      setisLoading(true);
      const res = await axios.post("http://localhost:5000/api/send-message", {
        username: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setisLoading(false);
      setFormData({ name: "", email: "", message: "" });
      toast.success(res.data.message || "Message submition success!");
    } catch (error) {
      setisLoading(false);
      console.error("ERROR: ", error);
      toast.error(error.response.data.message || "Message submition failed!");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 -mt-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Get In Touch
      </h2>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your name"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="your.email@example.com"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your message..."
              required
            ></textarea>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md font-medium cursor-pointer"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <span>Sending Message...</span>
                <span className="h-4 w-4 border-l-2 border-t-2 border-blue-50 rounded-full animate-spin" />
              </div>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold mb-4">Or connect directly</h3>
          <div className="flex justify-center space-x-6">
            <motion.a
              whileHover={{ y: -5 }}
              href="https://www.linkedin.com/in/melvinssimon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
              aria-label="LinkedIn"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -5 }}
              href="https://github.com/Melvins-Simon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
              aria-label="GitHub"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -5 }}
              href="https://wa.me/+254793867001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
