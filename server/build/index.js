"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 9000;
app.get("/", (req, res) => {
    res.send("Weclome to StubbleMart!");
});
app.listen(PORT, () => {
    console.log(`🚀 Server is listening at port ${PORT}...`);
    console.log(`[app]: http://localhost:${PORT}`);
});
