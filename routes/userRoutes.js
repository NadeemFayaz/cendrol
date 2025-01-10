
const express = require("express");

const { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    loginUser 
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer setup for profile picture upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG, PNG, and JPG are allowed"));
    }
};

const upload = multer({ storage, fileFilter });

// Public routes
router.post("/login", loginUser);
router.post("/register", upload.single("profilePicture"), createUser);

// Protected routes
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, upload.single("profilePicture"), updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
