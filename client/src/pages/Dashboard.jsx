import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { Globalstate } from "../context/Globalcontext";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const API_URL =
    "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api";
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { proj, setproj } = useContext(Globalstate);

  const [profile, setProfile] = useState({
    name: "Melvins Simon",
    title: "Full-Stack AI Engineer | Cloud & Data Systems",
    bio: "I design and deploy scalable AI-integrated applications and data pipelines, combining modern web development with machine learning systems.",
    image: "/profile.jpg",
  });

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("projects");
  const [notification, setNotification] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const Handlehero = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const projRes = await axios.get(`${API_URL}/get-projects`);
        setProjects(projRes.data.projects);

        setSkills([
          { id: 1, name: "AI/ML", level: 90 },
          { id: 2, name: "Azure Cloud", level: 85 },
        ]);

        setSocialLinks({
          email: "melvinssimon@gmail.com",
          linkedin: "https://www.linkedin.com/in/melvinssimon/",
          github: "https://github.com/Melvins-Simon/",
          twitter: "https://twitter.com/Melvinssimon/",
        });

        const msgRes = await axios.get(`${API_URL}/get-messages`);
        setMessages(msgRes.data.messages);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const addProject = () => {
    const newProject = {
      id: projects.length + 1,
      title: "New Project",
      link: "http://github.com/project-link",
      description: "Project description",
      tags: [],
      image: "/project-default.jpg",
    };
    setProjects([...projects, newProject]);
    showNotification("Project added");
  };

  const updateProject = (id, field, value) => {
    setproj({ ...proj, [field]: value });
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const deleteProject = async (id) => {
    const API_URL =
      "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api";
    try {
      setProjects(projects.filter((project) => project.id !== id));
      showNotification("Project deleted");
      await axios.post(`${API_URL}/delete-project`, { id });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = (field, value) => {
    setProfile({ ...profile, [field]: value });
    showNotification("Profile updated");
  };

  const updateSocialLink = (platform, url) => {
    setSocialLinks({ ...socialLinks, [platform]: url });
    showNotification("Social link updated");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer"
                onClick={() => setActiveTab("projects")}
              >
                Portfolio Dashboard
              </motion.span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                "projects",
                "profile",
                "skills",
                "social",
                "messages",
                "hero",
              ].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <svg
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
                  </svg>
                ) : (
                  <svg
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
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                "projects",
                "profile",
                "skills",
                "social",
                "messages",
                "hero",
              ].map((tab) => (
                <motion.button
                  key={tab}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                    activeTab === tab
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-4 right-4 bg-purple-600 px-4 py-2 rounded-md shadow-lg z-50 cursor-pointer"
          onClick={() => setNotification(null)}
        >
          {notification}
        </motion.div>
      )}

      {/* Main Content */}
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        {activeTab === "projects" && (
          <ProjectsTab
            projects={projects}
            updateProject={updateProject}
            deleteProject={deleteProject}
            addProject={addProject}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab profile={profile} updateProfile={updateProfile} />
        )}

        {activeTab === "skills" && (
          <SkillsTab skills={skills} setSkills={setSkills} />
        )}

        {activeTab === "social" && (
          <SocialTab
            socialLinks={socialLinks}
            updateSocialLink={updateSocialLink}
          />
        )}

        {activeTab === "messages" && <MessagesTab messages={messages} />}
        {activeTab === "hero" && Handlehero()}
      </main>
    </div>
  );
};

// ProjectsTab component
const ProjectsTab = ({
  projects,
  updateProject,
  deleteProject,
  addProject,
}) => {
  const API_URL =
    "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api";
  axios.defaults.withCredentials = true;
  const [editingId, setEditingId] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const bannerRef = useRef();
  const { banner, setbanner, proj } = useContext(Globalstate);

  const addTag = (projectId) => {
    if (!newTag.trim()) return;
    updateProject(projectId, "tags", [
      ...projects.find((p) => p.id === projectId).tags,
      newTag,
    ]);
    setNewTag("");
  };

  const removeTag = (projectId, tagIndex) => {
    const project = projects.find((p) => p.id === projectId);
    updateProject(
      projectId,
      "tags",
      project.tags.filter((_, i) => i !== tagIndex)
    );
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", proj.title);
      formData.append("description", proj.description);
      formData.append("tags", JSON.stringify(proj.tags));
      formData.append("link", proj.link);
      formData.append("image", banner);

      console.log(banner);
      console.log(formData);
      setIsSaving(true);
      setTimeout(() => {
        setEditingId(null);
        setIsSaving(false);
      }, 800);
      await axios.post(`${API_URL}/add-project`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const HnadleuploadBanner = () => {
    bannerRef.current.click();
  };
  const HnadleBanner = (e) => {
    setbanner(e.target.files[0]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8  max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Manage Projects
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addProject}
          className="px-4 py-2 bg-purple-600 rounded-md font-medium cursor-pointer w-full sm:w-auto"
        >
          Add Project
        </motion.button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No projects yet. Click "Add Project" to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all"
            >
              <div className="p-6 overflow-hidden">
                {editingId === project.id ? (
                  <>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded mb-2 cursor-text"
                    />{" "}
                    <input
                      type="text"
                      value={project.link}
                      onChange={(e) =>
                        updateProject(project.id, "link", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded mb-2 cursor-text"
                    />
                  </>
                ) : (
                  <h3 className="text-xl font-bold mb-2 cursor-default">
                    {project.title}
                  </h3>
                )}

                {editingId === project.id ? (
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded mb-2 min-h-[100px] cursor-text"
                  />
                ) : (
                  <p className="text-gray-300 mb-4 cursor-default">
                    {project.description}
                  </p>
                )}

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center bg-gray-700 rounded-full px-2 py-1 cursor-default"
                      >
                        <span className="text-xs">{tag}</span>
                        {editingId === project.id && (
                          <button
                            onClick={() => removeTag(project.id, index)}
                            className="ml-1 text-red-400 hover:text-red-300 cursor-pointer"
                          >
                            ×
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  {editingId === project.id && (
                    <div className="flex">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        className="flex-1 px-2 py-1 bg-gray-700 rounded-l text-sm cursor-text"
                      />
                      <button
                        onClick={() => addTag(project.id)}
                        className="px-2 py-1 bg-purple-600 rounded-r text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between  w-full">
                  {editingId === project.id ? (
                    <div className=" flex justify-between  w-full items-center">
                      <button
                        onClick={() => handleSave(project.id)}
                        disabled={isSaving}
                        className="px-3 py-1 bg-gray-600 rounded text-sm cursor-pointer flex items-center gap-1"
                      >
                        {isSaving ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          "Save"
                        )}
                      </button>

                      <div>
                        <input
                          ref={bannerRef}
                          onChange={(e) => HnadleBanner(e)}
                          name="banner"
                          className="hidden"
                          type="file"
                        />
                        <label
                          className="px-3 py-1 bg-green-600 rounded text-sm cursor-pointer"
                          htmlFor="banner"
                          onClick={HnadleuploadBanner}
                        >
                          Banner
                        </label>
                      </div>

                      <button
                        onClick={() => deleteProject(project.id)}
                        className="px-3 py-1 bg-red-600 rounded text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingId(project.id)}
                      className="px-3 py-1 bg-purple-600 rounded text-sm cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

// Profile Management Tab

const ProfileTab = ({ profile, updateProfile }) => {
  const [imagePreview, setImagePreview] = useState(profile?.image?.url || "");
  const [img, setImg] = useState(null);
  const [techStack, setTechStack] = useState(profile?.techStack || []);
  const [newTech, setNewTech] = useState("");
  const [welcomeText, setWelcomeText] = useState(profile?.welcomeText || "");
  const imgRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (index) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("title", profile.title);
    formData.append("bio", profile.bio);
    formData.append("welcomeText", welcomeText);
    formData.append("techStack", JSON.stringify(techStack));
    if (img) formData.append("image", img);

    try {
      const res = await axios.post(
        "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8 max-w-7xl mx-auto px-4"
    >
      <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Manage Profile
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Welcome Text
            </label>
            <input
              type="text"
              value={welcomeText}
              onChange={(e) => setWelcomeText(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded"
              placeholder="Welcome to my portfolio!"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile("name", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => updateProfile("title", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => updateProfile("bio", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded min-h-[150px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tech Stack
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-gray-700 rounded-full text-xs"
                >
                  {tech}
                  <button
                    onClick={() => removeTech(index)}
                    className="ml-1 text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && addTech()}
                placeholder="Add technology"
                className="flex-1 px-3 py-2 bg-gray-700 rounded-l"
              />
              <button
                onClick={addTech}
                className="px-3 py-2 bg-purple-600 rounded-r hover:bg-purple-500 transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Image and Preview */}
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="block text-gray-300 mb-2 font-semibold">
              Profile Image
            </label>
            <div className="relative group">
              <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-gray-600">
                <img
                  src={imagePreview || "/default-profile.png"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <button
                  onClick={() => imgRef.current.click()}
                  className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500 transition-colors cursor-pointer"
                >
                  Change Image
                </button>
              </div>
            </div>
            <input
              type="file"
              ref={imgRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <p className="mt-2 text-xs text-gray-400">
              Recommended: 500×500px, JPG/PNG
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Profile Preview</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold">{profile.name}</h4>
                <p className="text-purple-400">{profile.title}</p>
              </div>
              <div className="bg-gray-700/50 p-3 rounded">
                <p className="text-gray-300 italic">"{welcomeText}"</p>
              </div>
              <p className="text-gray-300">{profile.bio}</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-green-600 hover:bg-green-500 transition-colors rounded-md font-medium cursor-pointer"
          >
            Save Profile
          </button>
        </div>
      </div>
    </motion.section>
  );
};

// Skills Management Tab
const SkillsTab = () => {
  const API_URL =
    "https://melvins-simon-f2dqa4bcedcpefbq.eastus-01.azurewebsites.net/api";
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${API_URL}/skills`);
        setSkills(res.data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const addSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/skills`, { name: newSkill });
      setSkills([...skills, res.data.skill]);
      setNewSkill("");
    } catch (error) {
      console.error("Error adding skill:", error);
      alert(error.response?.data?.message || "Failed to add skill");
    }
  };

  const updateSkillLevel = async (id, level) => {
    try {
      await axios.put(`${API_URL}/skills/${id}`, { level });
      setSkills(
        skills.map((skill) => (skill._id === id ? { ...skill, level } : skill))
      );
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`${API_URL}/skills/${id}`);
      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  if (loading) {
    return (
      <div className="py-8 max-w-7xl mx-auto flex justify-center">
        <div className="animate-pulse text-gray-400">Loading skills...</div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Manage Skills
      </h2>

      <div className="mb-6 flex">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && addSkill()}
          placeholder="New skill name"
          className="flex-1 px-3 py-2 bg-gray-700 rounded-l"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-purple-600 rounded-r cursor-pointer hover:bg-purple-500"
        >
          Add Skill
        </button>
      </div>

      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill._id} className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{skill.name}</span>
              <button
                onClick={() => deleteSkill(skill._id)}
                className="text-red-400 hover:text-red-300 cursor-pointer"
              >
                Delete
              </button>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) =>
                  updateSkillLevel(skill._id, parseInt(e.target.value))
                }
                className="flex-1"
              />
              <span className="w-12 text-right">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
// Social Links Management Tab
const SocialTab = ({ socialLinks, updateSocialLink }) => {
  const socialPlatforms = [
    { key: "email", name: "Email", icon: "✉️" },
    { key: "linkedin", name: "LinkedIn", icon: "🔗" },
    { key: "github", name: "GitHub", icon: "🐙" },
    { key: "twitter", name: "Twitter", icon: "🐦" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8  max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Manage Social Links
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => (
          <div key={platform.key} className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{platform.icon}</span>
              <h3 className="text-lg font-medium">{platform.name}</h3>
            </div>
            <input
              type="text"
              value={socialLinks[platform.key]}
              onChange={(e) => updateSocialLink(platform.key, e.target.value)}
              placeholder={`Your ${platform.name} link`}
              className="w-full px-3 py-2 bg-gray-700 rounded"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

// Messages Management Tab
const MessagesTab = ({ messages }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl  font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Messages
      </h2>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{message.name}</h3>
                  <p className="text-sm text-purple-400">{message.email}</p>
                </div>
                <span className="text-sm text-gray-400">{message.date}</span>
              </div>
              <p className="text-gray-300 mt-2">{message.message}</p>
              <div className="mt-3 flex justify-end gap-2">
                <button className="px-3 py-1 bg-purple-600 hover:bg-purple-500 cursor-pointer rounded text-sm">
                  Reply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">No messages yet</p>
        )}
      </div>
    </motion.section>
  );
};

export default Dashboard;
