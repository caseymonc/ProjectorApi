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
const LinearAccelerator_1 = require("./LinearAccelerator");
const awaitTimeout_1 = __importDefault(require("./awaitTimeout"));
const motor = new LinearAccelerator_1.LinearAccelerator();
motor.open().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield motor.startUp();
    yield (0, awaitTimeout_1.default)(10000);
    yield motor.startUp();
    yield (0, awaitTimeout_1.default)(10000);
    yield motor.stop();
    yield motor.close();
}));
