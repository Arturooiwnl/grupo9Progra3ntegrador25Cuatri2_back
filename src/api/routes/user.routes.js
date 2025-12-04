import { Router } from "express";
import { insertUser, logoutUser, loginUser } from "../controllers/user.controllers.js";

const router = Router();

router.post("/", insertUser);

router.post("/login", loginUser)

router.post("/logout", logoutUser)

export default router;