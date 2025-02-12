"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const item_service_1 = require("./item.service");
const itemService = new item_service_1.ItemService();
class ItemController {
    createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield itemService.createItem(req.body);
                res.status(201).json(item);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: "An unknown error occurred" });
                }
            }
        });
    }
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
                const { data, total } = yield itemService.getItems(page, limit, filter);
                res.json({ data, total, page, limit });
            }
            catch (error) {
                res.status(500).json({ error: "An error occurred while fetching items" });
            }
        });
    }
}
exports.ItemController = ItemController;
