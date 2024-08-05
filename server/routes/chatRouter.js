import { Router } from "express";
import { createChat } from "../controllers/chat.js";

const chatRouter = Router();

chatRouter.post("/", createChat);

export default chatRouter;
