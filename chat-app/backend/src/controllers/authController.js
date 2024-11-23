import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);


    // Validate fields
    if (!name || !email || !password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "All fields are required and password must be at least 6 characters" });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPass });

    // Save and respond
    if (newUser) {
      generateToken(newUser._id, res); // Assuming this sets a token in the response
      await newUser.save();
    }

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profile: newUser.profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id, res);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        token,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const userId = req.user?._id;

    console.log("Request Body:", req.body);
    console.log("User ID:", userId);
    console.log("Profile:", profile);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! User not found." });
    }
    if (!profile) {
      return res.status(400).json({ message: "Profile pic is required!" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profile);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const checkAuth = async (req, res) => {
  console.log("hello from check auth");
  console.log(req.user);

  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
