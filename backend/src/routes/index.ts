import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1);
}

const router = express.Router();

router.post("/user/submit", (req, res) => {
  res.send("Hello World");
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
});

router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.clearCookie("login");
  res.status(200).send("Logged out!");
  return;
});

router.get("/admin/users", (req, res) => {});

export default router;
