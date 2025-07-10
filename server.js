// server.js (updated with JWT instead of session)
import express from "express";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/products.js";
import { sendWelcomeEmail } from "./controllers/emailController.js";
import authMiddleware from "./middleware/authMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Passport config
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        picture: profile.photos?.[0]?.value,
      };
      return done(null, user); // ✅ Pass the user to req.user
    }
  )
);

app.use(passport.initialize());

// Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }

    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Redirect with token as query param
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  }
);

app.get("/auth/user", authMiddleware, (req, res) => {
  console.log("👤 Returning user from token:", req.user);
  res.json(req.user);
});

app.get("/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect(`${process.env.FRONTEND_URL}`);
});

// Product routes
app.use("/api/products", authMiddleware, productRoutes);

// Email route
app.post("/api/send-welcome-email", sendWelcomeEmail);

// Base route
app.get("/", (req, res) => {
  res.json({
    message: "Twirl & Tie Backend API is running!",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "Twirl & Tie Email Service",
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Twirl & Tie Backend server is running on port ${PORT}`);
});
