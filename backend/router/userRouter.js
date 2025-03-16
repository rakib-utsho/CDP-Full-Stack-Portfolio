import express from "express";
import { addNewAdmin, login } from "../controller/userController.js";
import { checkDuplicateUsername } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/admin/register", checkDuplicateUsername, addNewAdmin);

export default router;
