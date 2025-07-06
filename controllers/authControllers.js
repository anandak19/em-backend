import { STATUS_CODES } from "../constants/statusCodes.js";
import userModel from "../models/user.model.js";
import { CustomError } from "../utiles/customError.js";
import bcrypt from "bcrypt";
import { createToken } from "../utiles/tokenHelpers.js";

export const registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      jobTitle,
      salary,
      password,
    } = req.user;

    let hashedPass = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      phone,
      gender,
      jobTitle,
      salary,
      password: hashedPass,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      throw new CustomError("Faild to save user", STATUS_CODES.BAD_REQUEST);
    }

    res
      .status(STATUS_CODES.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.user;

    const userData = await userModel.findOne({ email });
    if (!userData) {
      throw new CustomError(
        "You dont have an account with us! Please register first"
      );
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new CustomError("Incorrect password", STATUS_CODES.BAD_REQUEST);
    }

    const token = createToken(userData._id, userData.email);

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "User login successfully", token, user: {id: userData._id, email: userData.email, firstName: userData.firstName} });

  } catch (error) {
    next(error);
  }
};
