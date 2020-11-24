const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  // check the token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // verify token
    const decode = jwt.verify(token, jwtSecret);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
