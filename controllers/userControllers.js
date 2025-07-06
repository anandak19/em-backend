import { STATUS_CODES } from "../constants/statusCodes.js"

export const getUserData = async(req, res, next) => {
    try {
        
        res.status(STATUS_CODES.SUCCESS).json({message: "Users data fetched succcessfully"})
    } catch (error) {
        next(error)
    }
}

export const saveEditedUserData = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}