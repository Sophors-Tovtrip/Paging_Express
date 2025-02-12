"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: /Users/apple/Desktop/express-server-pagination/src/db/knex.ts
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const knexfile_1 = __importDefault(require("./knexfile"));
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, '../../.env') });
const environment = process.env.NODE_ENV || 'development';
const connection = (0, knex_1.default)(knexfile_1.default[environment]);
exports.default = connection;
