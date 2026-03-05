import express from "express";
import { signup, login, logout , updateProfile } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router=express.Router();
router.use(arcjetProtection)

router.post("/signup", signup);
router.post("/login", login)
router.post("/logout", logout)
router.get("/check",protectRoute,(req,res)=>res.status(200).json(req.user))

router.put("/update-profile", protectRoute,updateProfile) 
//as thz is updte we use the put
  // if only user is authenticted next funcyion is called

export default router;


//middleware when the user req for updating the profile pic before response there will be authentication check