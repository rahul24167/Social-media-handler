import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";

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
    const files = req.files as Express.Multer.File[];

    // Upload images to Cloudinary
    const imageUploadPromises = files.map((file) =>
      uploadOnCloudinary(file.path)
    );

    // Wait for all uploads to finish
    const uploadedImages = await Promise.all(imageUploadPromises);

    // Extract URLs
    const imageUrls = uploadedImages.map((upload) => upload ? upload.secure_url : null).filter(url => url !== null);

    // Create the user
    const newUser = new User({
      name,
      socialHandle,
      images: imageUrls,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
});
router.post("/admin/auth",
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

router.get("/admin/users", authMiddleware, async (req, res) => {
  try{
  const { name, page=1 } = req.query;
  const pageNumber = parseInt(page as string) || 1;
  const filter: any = {};
    if (name) {
      filter.name = { $regex: new RegExp(name as string, "i") }; // Case-insensitive search
    }
    const users = await User.find(filter)
      .skip((pageNumber - 1))
      .select("name socialHandle images") // Fetch only the required fields
      .exec();
      res.status(200).json({
        users,
        currentPage: pageNumber,
      });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

});
router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.clearCookie("login");
  res.status(200).send("Logged out!");
  return;
});

export default router;
