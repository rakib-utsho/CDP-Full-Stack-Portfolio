import express from "express";
import {
  addNewAdmin,
  login,
  getAllAdmins,
  logoutAdmin,
} from "../controller/userController.js";
import { checkDuplicateUsername } from "../middlewares/userMiddleware.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post(
  "/admin/register",
  isAdminAuthenticated,
  checkDuplicateUsername,
  addNewAdmin
);

router.get("/admin/me", isAdminAuthenticated, getAllAdmins);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
