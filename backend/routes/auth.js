import { Router } from "express";
import User from "../models/User.js";
import { body } from "express-validator";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
const router = Router();
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.js";
const JWT_SEC = process.env.SECRET_KEY_JWT;
router.post(
  "/register",
  [
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user_email = await User.findOne({ email: req.body.email });
      if (user_email) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with the same email exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
      });
      await newUser.save();
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SEC);
      success = true;
      res.status(200).json({ success, authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success, err: "Internal server error!" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Kindly enter correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Incorrect Password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SEC);
      success = true;
      res.status(200).json({ success, authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success, err });
    }
  }
);
router.post("/getuser", fetchUser, async (req, res) => {
  let success = false;
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true;
    res.status(200).json({ success, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, error: "Internal server error!" });
  }
});
router.put(
  "/edituser",
  [body("password", "Enter a valid password").exists()],
  fetchUser,
  async (req, res) => {
    const { nusername, nemail, npassword, password } = await req.body;
    let userId = await req.user.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Note not found" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid access" });
    }
    const newUser = {};
    if (nusername) {
      newUser.username = nusername;
    }
    if (nemail) {
      newUser.email = nemail;
    }
    if (npassword) {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(npassword, salt);
      newUser.password = secPass;
    }
    try {
      user = await User.findByIdAndUpdate(
        userId,
        { $set: newUser },
        { new: true }
      );
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);
export default router;
