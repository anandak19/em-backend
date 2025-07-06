import expresss from 'express'
import { getUsers } from '../controllers/adminController.js'

const adminRoutes = expresss.Router()

adminRoutes.get("/users", getUsers)

export default adminRoutes