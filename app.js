require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
sequelize
    .authenticate()
    .then(() => console.log("Connected to MySQL database"))
    .catch((err) => console.error("Database connection error:", err));

// Sync models
sequelize
    .sync({ alter: true })
    .then(() => console.log("Database synced"))
    .catch((err) => console.error("Database sync error:", err));

// Routes
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
