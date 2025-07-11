import { STATUS_CODES } from "../constants/statusCodes.js";
import userModel from "../models/user.model.js";
import { CustomError } from "../utiles/customError.js";
import {
  validateEmail,
  validateGender,
  validateJobTitle,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateSalary,
  validateUpdatedEmail,
  validateUpdatedPhoneNumber,
} from "../utiles/inputValidators.js";
import { varifyToken } from "../utiles/tokenHelpers.js";

export const validateUserData = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, gender, jobTitle, password } =
      req.body;

    const salary = parseFloat(req.body?.salary);

    const errorMessage =
      validateName(firstName, "first") ||
      validateName(lastName, "last") ||
      (await validateEmail(email)) ||
      (await validatePhoneNumber(phone)) ||
      validateGender(gender) ||
      validateJobTitle(jobTitle) ||
      validateSalary(salary) ||
      validatePassword(password);

    if (errorMessage) {
      throw new CustomError(errorMessage, STATUS_CODES.BAD_REQUEST);
    }

    req.user = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      jobTitle,
      salary,
      password,
    };

    return next();
  } catch (error) {
    next(error);
  }
};

export const validateLoginData = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new CustomError("Email is required", STATUS_CODES.BAD_REQUEST);
    }

    if (!password) {
      throw new CustomError("Password is required", STATUS_CODES.BAD_REQUEST);
    }

    req.user = { email, password };
    return next();
  } catch (error) {
    next(error);
  }
};

export const varifyAuthToken = async (req, res, next) => {
  try {
    let token;

    if (req.originalUrl.startsWith('/api/admin')) {
      token = req.cookies.token_admin;
    } else if (req.originalUrl.startsWith('/api/user')) {
      token = req.cookies.token_user;
    } else {
      throw new CustomError('Invalid access route', STATUS_CODES.BAD_REQUEST);
    }

    if (!token) {
      throw new CustomError("Unauthorized", STATUS_CODES.UNAUTHORIZED);
    }

    const payload = varifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    // error.message =
    //   error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    error.statusCode = STATUS_CODES.UNAUTHORIZED;
    next(error);
  }
};

export const validateEditedUserData = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, gender, jobTitle } = req.body;
    const salary = parseFloat(req.body?.salary);
    const userId = req.params.id;

    const errorMessage =
      validateName(firstName, "first") ||
      validateName(lastName, "last") ||
      validateUpdatedEmail(email) ||
      validateUpdatedPhoneNumber(phone) ||
      validateGender(gender) ||
      validateJobTitle(jobTitle) ||
      validateSalary(salary);

    if (errorMessage) {
      throw new CustomError(errorMessage, STATUS_CODES.BAD_REQUEST);
    }

    if (!userId) {
      throw new CustomError("No user selected", STATUS_CODES.GONE);
    }
    const user = await userModel.findById(userId);
    if (!user) {
      throw new CustomError("User not found", STATUS_CODES.GONE);
    }

    const existingEmailUser = await userModel.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingEmailUser) {
      throw new CustomError(
        "Email already in use by another user",
        STATUS_CODES.CONFLICT
      );
    }

    const existingPhoneUser = await userModel.findOne({
      phone,
      _id: { $ne: userId },
    });

    if (existingPhoneUser) {
      throw new CustomError(
        "Phone number already in use by another user",
        STATUS_CODES.CONFLICT
      );
    }

    req.user = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      jobTitle,
      salary,
      id: userId,
    };

    return next();
  } catch (error) {
    next(error);
  }
};
