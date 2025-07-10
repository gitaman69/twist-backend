import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const rawAuthHeader = req.headers.authorization;
  const token =
    rawAuthHeader?.split(" ")[1] || req.query.token || req.cookies?.token;

  console.log("🔐 Incoming Auth Header:", rawAuthHeader);
  console.log("🔐 Extracted Token:", token);

  if (!token) {
    console.warn("⚠️ No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
