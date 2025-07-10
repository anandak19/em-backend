import { STATUS_CODES } from "../constants/statusCodes.js";
import userModel from "../models/user.model.js";
import { CustomError } from "../utiles/customError.js";

export const varifyAdmin = async (req, res, next) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      throw new CustomError("Unauthorized", STATUS_CODES.UNAUTHORIZED);
    }

    const user = await userModel.findById(userId);
    if (!user) {
      throw new CustomError("Admin not found", STATUS_CODES.UNAUTHORIZED);
    }
    if (!user.isAdmin) {
      throw new CustomError(
        "You are not authorized to proceed",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    return next();
  } catch (error) {
    error.statusCode = STATUS_CODES.UNAUTHORIZED;
    next(error);
  }
};
