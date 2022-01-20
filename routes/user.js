const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser } = require("../controllers/users.js");

const { verifyToken } = require('../middlewares/verifyToken');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/user', verifyToken, getUser);

module.exports = router;