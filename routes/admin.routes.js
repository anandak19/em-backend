import expresss from 'express'
import { deleteSelectedUser, getSelectedUser, getUsers, saveEditedUserData } from '../controllers/adminController.js'
import { validateEditedUserData, varifyAuthToken } from '../middlewares/validators.js'
import { varifyAdmin } from '../middlewares/adminMiddlewares.js'
import { adminTrue } from '../controllers/authControllers.js'

const adminRoutes = expresss.Router()

adminRoutes.get("/is-admin-login", varifyAuthToken, varifyAdmin, adminTrue)
adminRoutes.get("/users", getUsers)
adminRoutes.delete("/user/delete/:id", varifyAuthToken, varifyAdmin, deleteSelectedUser)
adminRoutes.get("/user/:id", varifyAuthToken, varifyAdmin, getSelectedUser)
adminRoutes.patch("/user/:id", varifyAuthToken, varifyAdmin, validateEditedUserData, saveEditedUserData)

export default adminRoutes 