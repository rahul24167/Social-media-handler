import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";

import multer from "multer";
import mongoose from "mongoose";
import { User } from "../db";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/multer.middleware";
import { uploadOnCloudinary } from "../utills/cloudinary";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1);
}
const router = express.Router();

router.post("/user/submit", upload.array("images", 5), async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    if (req.files === undefined) {
      res.status(400).json({ message: "Please upload at least one image" });
      return;
    }

    // Get the Cloudinary URLs for uploaded images
    const imageUrls = (req.files as Express.Multer.File[]).map((file) =>
      uploadOnCloudinary(file.path)
    );

    const newUser = new User({
      name,
      socialHandle,
      images: imageUrls, // Save Cloudinary URLs
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
});
router.post(
  "/admin/auth",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const ParsedBody = signinBody.safeParse(req.body);
    if (!ParsedBody.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    if (
      req.body.email !== process.env.ADMIN_EMAIL ||
      req.body.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ adminEmail: req.body.email }, JWT_SECRET);
    res.cookie("token", token);
    res.cookie("login", "true");
    res.status(200).send("Logged in!");
    return;
  }
);

router.get("/admin/users", authMiddleware, (req, res) => {});
router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.clearCookie("login");
  res.status(200).send("Logged out!");
  return;
});

export default router;
