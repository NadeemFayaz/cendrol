require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

// Routes
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});