import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // CHECKING WHETHER USER ALREDY EXIST OR NOT
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    // CREATING NEW USER
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //GET THE USER BY EMAIL
    const user = await User.findOne({ email });
    !user && res.status(404).json({ message: "User not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json({ message: "Wrong password" });
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: _, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};

//Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    //GET THE USER BY EMAIL
    const user = User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (password !== passwordConfirm) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.updateOne(
      {
        email,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
