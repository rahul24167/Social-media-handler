import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1);
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded.adminEmail) {
      req.body.adminEmail = decoded.adminEmail; // Add adminEmail to the request body
      next(); // Continue to the next middleware or route handler
    } else {
      res.status(403).json({ error: "Forbidden: Invalid token" });
      return;
    }
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ error: "Forbidden: Invalid token" });
    return;
  }
};
