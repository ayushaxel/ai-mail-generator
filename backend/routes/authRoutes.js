import express from "express"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

const router = express.Router()


// Register User
router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      user,
      token,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }
});


// Login User
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      user,
      token,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }
});

export default router;