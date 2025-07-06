import expresss from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";
import { validateLoginData, validateUserData } from "../middlewares/validators.js";

const authRoutes = expresss.Router();

authRoutes.post("/register", validateUserData, registerUser);
authRoutes.post("/login", validateLoginData, loginUser)


export default authRoutes;