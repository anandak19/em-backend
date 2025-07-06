import { STATUS_CODES } from "../constants/statusCodes.js"

export const getUsers = async (req, res, next) => {
    try {
        res.status(STATUS_CODES.SUCCESS).json({message: "Users fetched successfully"})
    } catch (error) {
        next(error)
    }
}
