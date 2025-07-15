import { STATUS_CODES } from "../constants/statusCodes.js";
import userModel from "../models/user.model.js";
import { CustomError } from "../utiles/customError.js";

export const getUsers = async (req, res, next) => {
  try {

    const searchQuery = req.query.search || ''

    const matchStage = {
      isAdmin: false
    }

    if(searchQuery){
      matchStage.firstName = { $regex: searchQuery.trim(), $options: 'i' }
    }

    const users = await userModel.aggregate([
      {
        $match: matchStage,
      },
      {
        $project: {
          password: 0,
          isAdmin: 0,
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);

    if (!users || users.length === 0) {
      throw new CustomError("No users found", STATUS_CODES.GONE);
    }

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    next(error);
  }
};

export const deleteSelectedUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      throw new CustomError("No user selected", STATUS_CODES.GONE);
    }
    const user = await userModel.findById(userId);
    if (!user) {
      throw new CustomError("User not found", STATUS_CODES.GONE);
    }
    user.isDeleted = !user.isDeleted;
    await user.save();
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Users deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getSelectedUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      throw new CustomError("No user selected", STATUS_CODES.GONE);
    }
    const user = await userModel.findById(userId);
    if (!user) {
      throw new CustomError("User not found", STATUS_CODES.GONE);
    }
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "User fetched successfully", user });
  } catch (error) {
    next(error);
  }
};

export const saveEditedUserData = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, gender, jobTitle, salary, id } =
      req.user;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phone,
        gender,
        jobTitle,
        salary,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      throw new CustomError("Failed to update user", STATUS_CODES.NOT_FOUND);
    }

    res.status(STATUS_CODES.SUCCESS).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    next(error);
  }
};
