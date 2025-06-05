import { getMessages, getUsersForSidebar, marksMessageAsSeen, sendMessage } from "../controllers/messageController.js";
import {protectRoute} from "../middleware/auth.js";
import express from "express";
const messageRouter = express.Router();
messageRouter.get("/users" , protectRoute , getUsersForSidebar);
messageRouter.get("/:id" , protectRoute , getMessages);
messageRouter.get("mark/:id" , protectRoute, marksMessageAsSeen);
messageRouter.post("/send/:id" , protectRoute , sendMessage);


export default messageRouter;