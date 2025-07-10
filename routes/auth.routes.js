import expresss from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";
import { validateLoginData, validateUserData } from "../middlewares/validators.js";

const authRoutes = expresss.Router();

authRoutes.post("/register", validateUserData, registerUser);
authRoutes.post("/login", validateLoginData, loginUser)
authRoutes.get("/logout", logoutUser)

export default authRoutes;