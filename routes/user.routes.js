import expresss from 'express'
import { getUserData } from '../controllers/userControllers.js'

const userRoutes = expresss.Router()

userRoutes.get("/", getUserData)

export default userRoutes