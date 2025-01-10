const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

// Function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
            profilePicture: req.file ? req.file.path : null, // Handle file upload
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { name, mobile } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.mobile = mobile || user.mobile;

        if (req.file) {
            user.profilePicture = req.file.path; // Update profile picture if uploaded
        }

        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete a user



exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};
