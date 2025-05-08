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
router.get("/get-messages", verify_jwt, get_messages);
router.post("/update-profile", verify_jwt, update_profile);
router.get("/get-profile", verify_jwt, get_profile);
router.get("/skills", verify_jwt, get_skills);
router.post("/skills", verify_jwt, add_skill);
router.put("/skills/:id", verify_jwt, update_skill);
router.delete("/skills/:id", verify_jwt, delete_skill);

export default router;
