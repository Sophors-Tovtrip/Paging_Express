import { Router } from "express";
import { ItemController } from "./item.controller";

const router = Router();
const itemController = new ItemController();

router.post("/create-item", itemController.createItem.bind(itemController));
router.get("/get-items", itemController.getItems.bind(itemController));

export default router;