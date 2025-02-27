import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  email?: string;
  name?: string;
}

interface AuthRequest extends Request {
  user?: DecodedToken;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is missing from environment variables");
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No valid token provided" });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, secret) as DecodedToken;
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default authMiddleware;
