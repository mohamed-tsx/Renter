const jwt = require("jsonwebtoken");
const Prisma = require("../Config/Prisma");
const asyncHandler = require("express-async-handler");

const Protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      // Take the token from the headers
      token = req.headers.authorization.split(" ")[1];

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user
      const user = await Prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "Authenticatin failed: User not found",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Autherization failed: Invalid token",
      });
    }
  if (!token) {
    res.status(401).json({
      message: "Authorization failed: No token provided",
    });
  }
});

module.exports = Protect;
