import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
export const getAllUsers = async (req, res, next) => {
 try {
  const user = await User.find();
  res.json({
    succes: true,
    user,
  });
 } catch (error) {
  next(error)
 }
};

export const register = async (req, res, next) => {
  // getting user details
  try {
    const { name, email, password } = req.body;
    let singleUser = await User.findOne({ email });
    // if email already found then send the message
    if (singleUser) return next(new ErrorHandler("User Already Exist", 404));
    //   hashed the pass
    const hashedPass = await bcrypt.hash(password, 10);
    // create the user to the DB
    singleUser = User.create({ name, email, password: hashedPass });
    // set cookie
    setCookie(singleUser, "Registered Sucesfully", 201, res);
  } catch (err) {
    next(err);
  }
};

export const getmyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const login = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 400));
    setCookie(user, `welcome back ${user.name}`, 200, res);
  } catch (error) {
    next(error);
  }
};

export const LogOut = async (req, res, next) => {
 try {
  res
  .cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  .json({
    succes: true,
    user: req.user,
  });
 } catch (error) {
  next(error)
 }
};
