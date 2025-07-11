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

    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        "Email is already registerd",
        STATUS_CODES.BAD_REQUEST
      );
    }

    existingUser = await userModel.findOne({ phone });
    if (existingUser) {
      throw new CustomError(
        "Phone number is already registerd",
        STATUS_CODES.BAD_REQUEST
      );
    }

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

    res.cookie("token_user", token, {
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "User login successfully",
      user: {
        id: userData._id,
        email: userData.email,
        firstName: userData.firstName,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token_user", {
      httpOnly: false,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie("token_admin", {
      httpOnly: false,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.user;

    const userData = await userModel.findOne({ email });
    if (!userData) {
      throw new CustomError(
        "Incorrect email address",
        STATUS_CODES.BAD_REQUEST
      );
    }

    if (!userData.isAdmin) {
      throw new CustomError("Unauthorized", STATUS_CODES.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new CustomError("Incorrect password", STATUS_CODES.BAD_REQUEST);
    }
    const token = createToken(userData._id, userData.email);

    res.cookie("token_admin", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "User login successfully",
      token,
      user: {
        id: userData._id,
        email: userData.email,
        firstName: userData.firstName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const adminTrue = async (req, res, next) => {
  try {
    res.status(STATUS_CODES.SUCCESS).json({success: true, mesage: "Admin varification success"})
  } catch (error) {
    next(error)
  }
}
