import mongoose from "mongoose";

const message_schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", message_schema);

const user_schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", user_schema);

const project_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", project_schema);

const profileSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    bio: String,
    welcomeText: String,
    techStack: [String],
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Skill = mongoose.model("Skill", skillSchema);
