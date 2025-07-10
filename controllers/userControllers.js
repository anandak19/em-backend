import { STATUS_CODES } from "../constants/statusCodes.js";
import userModel from "../models/user.model.js";
import { CustomError } from "../utiles/customError.js";

export const getUserData = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await userModel
      .findById(userId)
      .select(
        "firstName lastName email phone gender jobTitle salary profilePicUrl"
      );

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Users data fetched succcessfully", user });
  } catch (error) {
    next(error);
  }
};

export const saveProfilePic = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new CustomError("No file uploaded", STATUS_CODES.BAD_REQUEST);
    }
    const imagePath = `http://localhost:3000/uploads/${req.file.filename}`;
    const { userId } = req.user;
    const user = await userModel.findById(userId);
    if (!user) {
      throw new CustomError("User not found", STATUS_CODES.NOT_FOUND);
    }

    user.profilePicUrl = imagePath;
    await user.save();
    const { _id, profilePicUrl, firstName, lastName, jobTitle } = user;
    res.status(STATUS_CODES.CREATED).json({
      user: {
        id: _id,
        profilePicUrl,
        name: `${firstName} ${lastName}`,
        jobTitle,
      }
    });
  } catch (error) {
    next(error);
  }
};


