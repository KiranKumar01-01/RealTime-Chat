import express from "express";
import { getAllContacts,getMessagesByUserId,sendMessage,getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router=express.Router();
//the middleware execute in order- so req get rate limited first ,then authenticated.
//thz is actually more efficient since unauthenticated req get blocked by rate limited
//before hitting the auth middleware
router.use(arcjetProtection,protectRoute)

router.get("/contacts",protectRoute,getAllContacts);
router.get("/chats",protectRoute,getChatPartners)
router.get("/:id",protectRoute,getMessagesByUserId)
router.post("/send/:id",protectRoute,sendMessage)


export default router;