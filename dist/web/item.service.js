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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
// src/services/item.service.ts
const knex_1 = __importDefault(require("../db/knex"));
const type_1 = require("./type");
class ItemService {
    createItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedData = type_1.ItemSchema.parse(data);
            const [item] = yield (0, knex_1.default)("items").insert(parsedData).returning("*");
            console.log(item);
            return item;
        });
    }
    getItems() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, filter = {}) {
            var _a;
            const offset = (page - 1) * limit;
            console.log(`Fetching items with page: ${page}, limit: ${limit}, offset: ${offset}, filter: ${JSON.stringify(filter)}`);
            // Clone the query to count all results first
            const baseQuery = (0, knex_1.default)('items').where((builder) => {
                Object.entries(filter).forEach(([key, value]) => {
                    if (value) {
                        builder.where(key, 'like', `%${value}%`);
                    }
                });
            });
            // Get total count
            const totalQuery = baseQuery.clone().count('* as count').first();
            const total = Number((_a = (yield totalQuery)) === null || _a === void 0 ? void 0 : _a.count) || 0;
            // Fetch paginated results
            const data = yield baseQuery.clone().offset(offset).limit(limit).select('*');
            console.log(`Query: ${baseQuery.toString()}`);
            console.log(`Data: ${JSON.stringify(data)}`);
            return { data, total };
        });
    }
}
exports.ItemService = ItemService;
