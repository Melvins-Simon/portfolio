import {
  sendAdminNotification,
  sendUserConfirmation,
} from "../email/emails.js";
import { cloudinary } from "../middlewares/cloudinary.js";
import { gen_jwt } from "../middlewares/jwt.js";
import {
  Message,
  Profile,
  Project,
  Skill,
  User,
} from "../models/portfolio_models.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const recieve_message = async (req, res) => {
  const { username, email, message } = req.body;

  try {
    // Validation
    if (!email || !username || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details.",
      });
    }

    // Save to database
    const newMessage = new Message({ username, email, message });
    const savedMessage = await newMessage.save();

    // Send confirmation email to user
    await sendUserConfirmation(email, username);

    // Send notification to yourself
    await sendAdminNotification(email, username, message);

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
// Approve users to dashboard
export const add_admin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Please provide the required details!",
      });
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        success: false,
        message: "The user provided is already approved!",
      });
    const hashed_password = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashed_password });
    await newUser.save();
    const users = await User.find().select("-password");
    res.status(201).json({
      success: true,
      message: `User with ${email} is now approved!`,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Approved login
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Please provide the required details!",
      });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Not yet approved by admin!",
      });
    const hashed_password = await bcrypt.compare(password, user.password);
    if (!hashed_password)
      return res.status(400).json({
        success: false,
        message: "Invalid password please try again!",
      });
    gen_jwt(res, user._id);
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ success: true, message: `Authentication success!`, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// checkAuth
export const check_auth = async (req, res) => {
  const user_id = req.user_id;
  try {
    const user = await User.findById(user_id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, message: "Connected!", users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({ success: true, message: "Logged out!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// remove admin
export const remove_admin = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "No ID provided!" });
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No user with id found!" });
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ success: true, message: "User removed successfully!", users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// add project / update
export const add_project = async (req, res) => {
  try {
    const { title, description, tags, link } = req.body;
    const image = req.files?.image;

    // Validate
    if (!title || !description || !tags || !link) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Handle image upload/update
    let imageUrl, publicId;
    const existingProject = await Project.findOne({ link });

    if (image) {
      // Delete old image if exists
      if (existingProject?.image?.public_id) {
        await cloudinary.uploader.destroy(existingProject.image.public_id);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "portfolio",
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
      publicId = result.public_id;
    } else if (existingProject) {
      // Keep existing image if no new one provided
      imageUrl = existingProject.image?.url;
      publicId = existingProject.image?.public_id;
    }

    // Build update data
    const updateData = {
      title,
      description,
      tags: Array.isArray(tags) ? tags : JSON.parse(tags),
      link,
    };

    if (imageUrl) updateData["image.url"] = imageUrl;
    if (publicId) updateData["image.public_id"] = publicId;

    // Update or create
    const updatedProject = await Project.findOneAndUpdate(
      { link },
      { $set: updateData },
      { new: true, upsert: true }
    );

    // Return all projects
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      message: existingProject ? "Project updated!" : "Project created!",
      projects: projects.map((p) => ({
        id: p._id,
        title: p.title,
        description: p.description,
        tags: p.tags,
        image: p.image?.url,
        link: p.link,
      })),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: error.message.includes("Cast to string")
        ? "Database schema mismatch (check image field)"
        : "Internal server error",
    });
  }
};
// delete project
export const delete_project = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id)
      return res.status(400).json({
        success: false,
        message: "Provide the required detail!",
      });
    const project = await Project.findByIdAndDelete(id);
    if (!project)
      return res.status(404).json({
        success: false,
        message: "No project found with the specified id!",
      });
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      message: "Project deleted successfully!",
      projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get projects
export const get_projects = async (req, res) => {
  try {
    const projects = await Project.find();

    const formattedProjects = projects.map((project) => {
      let tagsArray = [];
      if (Array.isArray(project.tags)) {
        if (
          typeof project.tags[0] === "string" &&
          project.tags[0].startsWith("[")
        ) {
          try {
            tagsArray = JSON.parse(project.tags[0].replace(/'/g, '"'));
          } catch (e) {
            tagsArray = [];
          }
        } else {
          tagsArray = project.tags;
        }
      }

      return {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        tags: tagsArray,
        image: project.image?.url,
        link: project.link,
      };
    });

    res.status(200).json({
      success: true,
      message: "Projects loaded!",
      projects: formattedProjects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get messages
export const get_messages = async (req, res) => {
  try {
    const messages = await Message.find();
    const formattedMessages = messages.map((message) => ({
      id: message._id,
      name: message.username,
      email: message.email,
      message: message.message,
      date: new Date(message.createdAt).toISOString().split("T")[0],
    }));

    res.status(200).json({
      success: true,
      message: "Messages loaded!",
      messages: formattedMessages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Profile
export const update_profile = async (req, res) => {
  try {
    const { name, title, bio, welcomeText, techStack } = req.body;
    const image = req.files?.image;

    // Validation
    if (!name || !title || !bio || !welcomeText) {
      return res.status(400).json({
        success: false,
        message: "Name, title, bio and welcome text are required!",
      });
    }

    let formattedTechStack = [];
    if (Array.isArray(techStack)) {
      formattedTechStack = techStack;
    } else if (typeof techStack === "string") {
      try {
        formattedTechStack = JSON.parse(techStack.replace(/'/g, '"'));
      } catch (e) {
        formattedTechStack = [];
      }
    }

    // Image handling
    let imageData = null;
    const existingProfile = await Profile.findOne();

    if (image) {
      if (existingProfile?.image?.public_id) {
        await cloudinary.uploader.destroy(existingProfile.image.public_id);
      }

      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "profile",
        resource_type: "auto",
        format: "jpg",
      });

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } else {
      imageData = existingProfile?.image || null;
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      {
        name,
        title,
        bio,
        welcomeText,
        techStack: formattedTechStack,
        image: imageData,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: existingProfile ? "Profile updated!" : "Profile created!",
      profile: {
        id: updatedProfile._id,
        name: updatedProfile.name,
        title: updatedProfile.title,
        bio: updatedProfile.bio,
        welcomeText: updatedProfile.welcomeText,
        techStack: updatedProfile.techStack,
        image: updatedProfile.image?.url || null,
      },
    });
  } catch (error) {
    console.error("Update Error:", error);

    if (error.message.includes("File size too large")) {
      return res.status(413).json({
        success: false,
        message: "Image must be smaller than 10MB",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get profile
export const get_profile = async (req, res) => {
  try {
    const profile = await Profile.findOne({});

    if (!profile) {
      return res.status(200).json({
        success: true,
        profile: null,
        message: "No profile found",
      });
    }

    let techStack = [];
    if (Array.isArray(profile.techStack)) {
      techStack = profile.techStack;
    } else if (
      typeof profile.techStack === "string" &&
      profile.techStack.startsWith("[")
    ) {
      try {
        techStack = JSON.parse(profile.techStack.replace(/'/g, '"'));
      } catch (e) {
        techStack = [];
      }
    }

    res.status(200).json({
      success: true,
      profile: {
        id: profile._id,
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        welcomeText: profile.welcomeText || "",
        techStack,
        image: {
          url: profile.image?.url || null,
          public_id: profile.image?.public_id || null,
        },
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// Get all skills (for About section)
export const get_skills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
};

// Add new skill (for Dashboard)
export const add_skill = async (req, res) => {
  try {
    const { name, level = 50 } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const newSkill = await Skill.create({ name, level });
    res.status(201).json({
      success: true,
      skill: newSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.code === 11000 ? "Skill already exists" : "Failed to add skill",
    });
  }
};

// Update skill level (for Dashboard)
export const update_skill = async (req, res) => {
  try {
    const { id } = req.params;
    const { level } = req.body;

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { level },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      skill: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update skill",
    });
  }
};

// Delete skill (for Dashboard)
export const delete_skill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
    });
  }
};
