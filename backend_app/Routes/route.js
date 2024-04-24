import { postController } from "../controllers/controller.js";
import { Router } from "express";
const router = Router();

router.get("/", postController.read);

router.post("/", postController.create);

router.put("/like/:id", postController.update);

router.delete("/:id", postController.remove);

export default router;
