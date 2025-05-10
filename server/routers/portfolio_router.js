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
  get_messages,
  update_profile,
  get_profile,
  delete_skill,
  update_skill,
  add_skill,
  get_skills,
  delete_message,
} from "../controllers/portfolio_controller.js";
import { verify_jwt } from "../middlewares/jwt.js";

const router = Router();

// ===== Unprotected Routes =====
router.post("/send-message", recieve_message);
router.post("/signin", signin);
router.post("/signout", logout);
router.get("/get-projects", get_projects);
router.get("/get-messages", get_messages);
router.get("/get-profile", get_profile);
router.get("/skills", get_skills);

// ===== Protected Routes (require JWT) =====
router.use(verify_jwt);
router.post("/add-admin", add_admin);
router.get("/check-auth", check_auth);
router.post("/remove-admin", remove_admin);
router.post("/add-project", add_project);
router.post("/delete-project", delete_project);
router.delete("/delete-message/:id", delete_message);
router.post("/update-profile", update_profile);
router.post("/skills", add_skill);
router.put("/skills/:id", update_skill);
router.delete("/skills/:id", delete_skill);

export default router;
