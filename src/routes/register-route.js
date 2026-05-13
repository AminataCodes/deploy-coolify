import { Router } from "express";
import * as registerController from "../controllers/register-controller.js";
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.post("/register", registerController.register);
router.get("/me", authenticate, registerController.connectedUser);

export default router;

