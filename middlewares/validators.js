import { STATUS_CODES } from "../constants/statusCodes.js";
import { CustomError } from "../utiles/customError.js";
import {
  validateEmail,
  validateGender,
  validateJobTitle,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateSalary,
} from "../utiles/inputValidators.js";

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

    req.user = {firstName, lastName, email, phone, gender, jobTitle, salary, password}

    return next();
  } catch (error) {
    next(error);
  }
};

export const validateLoginData = async (req, res, next) => {
  try {
    const {email, password} = req.body

    if(!email){
      throw new CustomError("Email is required", STATUS_CODES.BAD_REQUEST)
    }

    if(!password){
      throw new CustomError("Password is required", STATUS_CODES.BAD_REQUEST)
    }

    req.user = {email, password}
    return next()
  } catch (error) {
    next(error)
  }
}
