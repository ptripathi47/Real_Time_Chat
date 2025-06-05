import express from "express"
const userRouter = express.Router();
import {signup} from "../controllers/userController.js"
import { login } from "../controllers/userController.js";
import { updateProfile } from "../controllers/userController.js";
import { checkAuth } from "../middleware/auth.js";
import { protectRoute } from "../middleware/auth.js";
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile" , protectRoute , updateProfile);
userRouter.get("/check" , protectRoute , checkAuth);

export default userRouter;