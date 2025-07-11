import expresss from "express";
import { loginAdmin, loginUser, logoutAdmin, logoutUser, registerUser } from "../controllers/authControllers.js";
import { validateLoginData, validateUserData } from "../middlewares/validators.js";

const authRoutes = expresss.Router();

authRoutes.post("/register", validateUserData, registerUser);
authRoutes.post("/login", validateLoginData, loginUser)
authRoutes.get("/logout", logoutUser)

//for admin
authRoutes.post("/login/admin", validateLoginData, loginAdmin)
authRoutes.get("/logout/admin", logoutAdmin)

export default authRoutes;