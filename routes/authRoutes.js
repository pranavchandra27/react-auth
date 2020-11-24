const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");

// User model
const User = require("../models/User");

const maxAge = 3 * 24 * 60 * 60;

// creates a token
const createToken = id => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

/**
 *  @route POST /signup
 *  @desc  Register new user
 **/
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(400).json({ msg: "Email already exist" });
  } else {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    await User.create({ name, email, password: hash })
      .then(user => {
        const token = createToken(user._id);
        res.status(201).json({
          name: user.name,
          email: user.email,
          id: user._id,
          token,
        });
      })
      .catch(err => res.status(400).json({ err }));
  }
});

/**
 *  @route POST /login
 *  @desc  user login
 **/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const token = createToken(user._id);
      res.status(201).json({
        name: user.name,
        email: user.email,
        id: user._id,
        token,
      });
    } else {
      res.status(401).json({ msg: "Incorrect password" });
    }
  } else {
    res.status(401).json({ msg: "Email doesn't exist" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User doesn't exist");
    res.json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
