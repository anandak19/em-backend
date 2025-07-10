import expresss from 'express'
import { getUserData, saveProfilePic } from '../controllers/userControllers.js'
import { varifyAuthToken } from '../middlewares/validators.js'
import { upload } from '../utiles/multer.js'

const userRoutes = expresss.Router()

userRoutes.get("/", varifyAuthToken, getUserData)
userRoutes.post("/profile-pic/upload", varifyAuthToken, upload.single('profilePicture'), saveProfilePic)

export default userRoutes