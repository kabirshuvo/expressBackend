"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const productRoutes_1 = require("./routes/productRoutes");
const OrderRoutes_1 = require("./routes/OrderRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, server_1.default)();
// Middlewares
app.use('/api/products', productRoutes_1.ProductRouter);
app.use('/api/orders', OrderRoutes_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
