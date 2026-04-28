const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // ADD CONSOLE LOG TO DEBUG
      console.log("Decoded ID:", decoded.id);
      
      req.user = await User.findById(decoded.id).select("-password");
      
      // ADD THIS NULL CHECK
      if (!req.user) {
        console.log("User not found for ID:", decoded.id);
        return res.status(401).json({ message: "User not found" });
      }
      
      return next();
    } catch (error) {
      console.log("Token error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  return res.status(401).json({ message: "Not authorized, no token" });
};

module.exports = { protect };
