import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
        // Simulate API calls
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setProjects([
          {
            id: 1,
            title: "AI-Powered Analytics Platform",
            description:
              "Built with Azure OpenAI and Microsoft Fabric for real-time business insights.",
            tags: ["Azure", "AI", "Power BI"],
            image: "/project1.jpg",
          },
          // ... other projects
        ]);

        setSkills([
          { id: 1, name: "AI/ML", level: 90 },
          { id: 2, name: "Azure Cloud", level: 85 },
        ]);

        setSocialLinks({
          email: "melvinssimon@gmail.com",
          linkedin: "https://linkedin.com/in/yourprofile",
          github: "https://github.com/yourusername",
          twitter: "https://twitter.com/yourhandle",
        });

        setMessages([
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            message: "Interested in your AI services",
            date: "2023-05-15",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            message: "Looking for a collaboration",
            date: "2023-05-10",
          },
        ]);
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
      description: "Project description",
      tags: [],
      image: "/project-default.jpg",
    };
    setProjects([...projects, newProject]);
    showNotification("Project added");
  };

  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
    showNotification("Project deleted");
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
              {["projects", "profile", "skills", "social", "messages"].map(
                (tab) => (
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
                )
              )}
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

// ProjectsTab component (updated with cursor pointers)
const ProjectsTab = ({
  projects,
  updateProject,
  deleteProject,
  addProject,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = (id) => {
    setIsSaving(true);
    setTimeout(() => {
      setEditingId(null);
      setIsSaving(false);
    }, 800);
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
              <div className="p-6">
                {editingId === project.id ? (
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(project.id, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded mb-2 cursor-text"
                  />
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

                <div className="flex justify-between">
                  {editingId === project.id ? (
                    <>
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
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="px-3 py-1 bg-red-600 rounded text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </>
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
  const [imagePreview, setImagePreview] = useState(profile.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        updateProfile("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const imgRef = useRef(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8  max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Manage Profile
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => updateProfile("bio", e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded min-h-[150px]"
            />
          </div>
        </div>

        <div>
          <div className="mb-4 flex justify-center items-center flex-col">
            <label className="block text-gray-300 mb-1 font-semibold">
              Profile Image
            </label>
            <div className="relative flex justify-center items-center">
              <div className="relative w-max  rounded-lg p-1">
                <img
                  src={
                    imagePreview ? imagePreview : "https://shorturl.at/Vu5Xf"
                  }
                  alt="Profile Preview"
                  className="rounded-lg w-72 h-72"
                />
              </div>
            </div>
            <input
              type="file"
              ref={imgRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              name="image"
            />
            <label
              htmlFor="image"
              onClick={(e) => imgRef.current.click()}
              className="px-2 py-1 rounded-md bg-purple-600 hover:bg-purple-500 cursor-pointer ease-in-out duration-200"
            >
              Upload image
            </label>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
              <p className="text-purple-400 mb-2">{profile.title}</p>
              <p className="text-gray-300">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Skills Management Tab
const SkillsTab = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([
      ...skills,
      { id: skills.length + 1, name: newSkill, level: 50 },
    ]);
    setNewSkill("");
  };

  const updateSkillLevel = (id, level) => {
    setSkills(
      skills.map((skill) => (skill.id === id ? { ...skill, level } : skill))
    );
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8  max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Manage Skills
      </h2>

      <div className="mb-6 flex">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
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
          <div key={skill.id} className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{skill.name}</span>
              <button
                onClick={() => deleteSkill(skill.id)}
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
                  updateSkillLevel(skill.id, parseInt(e.target.value))
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
