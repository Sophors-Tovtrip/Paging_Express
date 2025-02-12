"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("./item.controller");
const router = (0, express_1.Router)();
const itemController = new item_controller_1.ItemController();
router.post("/items", itemController.createItem.bind(itemController));
router.get("/items", itemController.getItems.bind(itemController));
exports.default = router;
