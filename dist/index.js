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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ProjectorConnection_1 = require("./ProjectorConnection");
const projector = new ProjectorConnection_1.ProjectorConnection('/dev/ttyAMA0', 115200);
projector.open().then(() => {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 3040;
    app.use((0, cors_1.default)());
    app.get('/projector/:command', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const value = yield projector.read(req.params.command);
            return res.json({ value });
        }
        catch (e) {
            console.log("error", e);
            return res.send("Failed ");
        }
    }));
    app.post('/projector/:command/toggle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const value = yield projector.read(req.params.command);
            if (value === 1) {
                const command = projector.negativeCommand(req.params.command);
                if (!command)
                    return res.send("Failed, invalid command ");
                yield projector.doAction(command);
            }
            else {
                const command = projector.positiveCommand(req.params.command);
                if (!command)
                    return res.send("Failed, invalid command ");
                yield projector.doAction(command);
            }
            return res.json({ value });
        }
        catch (e) {
            console.log("error", e);
            return res.send("Failed ");
        }
    }));
    app.post('/projector/:command', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield projector.doAction(req.params.command);
            return res.send("OK");
        }
        catch (e) {
            console.log("error", e);
            return res.send("Failed ");
        }
    }));
    app.post('/projector/:command/set', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const value = req.body.value;
            const currentValue = yield projector.read(req.params.command);
            if (typeof currentValue !== 'number')
                return res.send("Failed, invalid current value");
            if (typeof value !== 'number')
                return res.send("Failed, invalid value");
            const diff = value - currentValue;
            if (diff < 0) {
                const command = projector.negativeCommand(req.params.command);
                if (!command)
                    return res.send("Failed, invalid command ");
                for (let i = 0; i < diff * -1; i++) {
                    yield projector.doAction(command);
                }
            }
            else {
                const command = projector.positiveCommand(req.params.command);
                if (!command)
                    return res.send("Failed, invalid command ");
                for (let i = 0; i < diff; i++) {
                    yield projector.doAction(command);
                }
            }
            return res.send("OK");
        }
        catch (e) {
            console.log("error", e);
            return res.send("Failed ");
        }
    }));
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
