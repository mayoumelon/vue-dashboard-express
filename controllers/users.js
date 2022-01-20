const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  });
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json("メールアドレスに誤りがあります");
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json("パスワードに誤りがあります。");
  res.status(200).json({
    token: generateAccessToken(user),
  });
};

module.exports = { registerUser, loginUser };