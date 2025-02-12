"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts (or index.ts)
const express_1 = __importDefault(require("express"));
const item_route_1 = __importDefault(require("./web/item.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', item_route_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
