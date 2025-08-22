const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "social_network",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");

  // Create users table if it doesn't exist
  const createTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20) NOT NULL,
      profile_picture VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  db.query(createTable, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Users table ready");
    }
  });
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});
console.log("Attempting to use email:", process.env.EMAIL_USER);
console.log("Is App Password loaded?", !!process.env.EMAIL_PASS);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

// Routes

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Social Networking API is running!" });
});

// Register user
app.post("/api/users/register", upload.single("profilePicture"), (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Name, email, and phone are required" });
  }

  const profilePicture = req.file ? req.file.filename : null;

  const query =
    "INSERT INTO users (name, email, phone, profile_picture) VALUES (?, ?, ?, ?)";

  db.query(query, [name, email, phone, profilePicture], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error("Error registering user:", err);
      return res.status(500).json({ error: "Failed to register user" });
    }

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registration Successful - Social Network",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Welcome to Social Network!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for registering with our Social Networking platform. Your account has been successfully created.</p>
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Registration Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          <p>You can now start connecting with friends and sharing your experiences!</p>
          <p>Best regards,<br>Social Network Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (emailErr, info) => {
      if (emailErr) {
        console.error("Error sending email:", emailErr);
        // Still return success as user is registered, just email failed
        return res.status(201).json({
          message:
            "User registered successfully, but email notification failed",
          userId: result.insertId,
          emailError: true,
        });
      }

      res.status(201).json({
        message: "User registered successfully and confirmation email sent",
        userId: result.insertId,
        emailSent: true,
      });
    });
  });
});

// Get all users
app.get("/api/users", (req, res) => {
  const query =
    "SELECT id, name, email, phone, profile_picture, created_at, updated_at FROM users ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    // Add full URL for profile pictures
    const usersWithImages = results.map((user) => ({
      ...user,
      profile_picture: user.profile_picture
        ? `${req.protocol}://${req.get("host")}/uploads/${user.profile_picture}`
        : null,
    }));

    res.json(usersWithImages);
  });
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const query =
    "SELECT id, name, email, phone, profile_picture, created_at, updated_at FROM users WHERE id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Failed to fetch user" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    if (user.profile_picture) {
      user.profile_picture = `${req.protocol}://${req.get("host")}/uploads/${
        user.profile_picture
      }`;
    }

    res.json(user);
  });
});

// Update user
app.put("/api/users/:id", upload.single("profilePicture"), (req, res) => {
  const userId = req.params.id;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Name, email, and phone are required" });
  }

  // First, get the current user to handle old profile picture
  const getCurrentUser = "SELECT profile_picture FROM users WHERE id = ?";

  db.query(getCurrentUser, [userId], (err, currentResults) => {
    if (err) {
      console.error("Error fetching current user:", err);
      return res.status(500).json({ error: "Failed to update user" });
    }

    if (currentResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const oldProfilePicture = currentResults[0].profile_picture;
    const newProfilePicture = req.file ? req.file.filename : oldProfilePicture;

    const query =
      "UPDATE users SET name = ?, email = ?, phone = ?, profile_picture = ? WHERE id = ?";

    db.query(
      query,
      [name, email, phone, newProfilePicture, userId],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Email already exists" });
          }
          console.error("Error updating user:", err);
          return res.status(500).json({ error: "Failed to update user" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        // Delete old profile picture if a new one was uploaded
        if (
          req.file &&
          oldProfilePicture &&
          oldProfilePicture !== newProfilePicture
        ) {
          const oldImagePath = path.join(
            __dirname,
            "uploads",
            oldProfilePicture
          );
          fs.unlink(oldImagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting old profile picture:", unlinkErr);
            }
          });
        }

        res.json({ message: "User updated successfully" });
      }
    );
  });
});

// Delete user
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  // First, get the user's profile picture to delete it
  const getUserQuery = "SELECT profile_picture FROM users WHERE id = ?";

  db.query(getUserQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user for deletion:", err);
      return res.status(500).json({ error: "Failed to delete user" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const profilePicture = results[0].profile_picture;

    const deleteQuery = "DELETE FROM users WHERE id = ?";

    db.query(deleteQuery, [userId], (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ error: "Failed to delete user" });
      }

      // Delete profile picture file if it exists
      if (profilePicture) {
        const imagePath = path.join(__dirname, "uploads", profilePicture);
        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting profile picture:", unlinkErr);
          }
        });
      }

      res.json({ message: "User deleted successfully" });
    });
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File size too large. Maximum 5MB allowed." });
    }
  }

  if (error.message === "Only image files are allowed") {
    return res.status(400).json({ error: "Only image files are allowed" });
  }

  console.error("Unhandled error:", error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
