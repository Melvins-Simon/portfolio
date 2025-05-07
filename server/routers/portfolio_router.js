import { Router } from "express";
import {
  recieve_message,
  add_admin,
  signin,
  check_auth,
  logout,
  remove_admin,
  add_project,
  delete_project,
  get_projects,
} from "../controllers/portfolio_controller.js";
import { verify_jwt } from "../middlewares/jwt.js";

const router = Router();

router.post("/send-message", recieve_message);
router.post("/add-admin", add_admin);
router.post("/signin", signin);
router.get("/check-auth", verify_jwt, check_auth);
router.post("/signout", logout);
router.post("/remove-admin", verify_jwt, remove_admin);
router.post("/add-project", verify_jwt, add_project);
router.post("/delete-project", verify_jwt, delete_project);
router.get("/get-projects", verify_jwt, get_projects);

export default router;
