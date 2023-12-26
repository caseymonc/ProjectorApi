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
exports.LinearAccelerator = void 0;
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
const ENA = 11;
const IN1 = 13;
const IN2 = 15;
class LinearAccelerator {
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Setup ENA');
            yield rpi_gpio_1.default.promise.setup(ENA, rpi_gpio_1.default.DIR_OUT);
            console.log('Setup IN1');
            yield rpi_gpio_1.default.promise.setup(IN1, rpi_gpio_1.default.DIR_OUT);
            console.log('Setup IN2');
            yield rpi_gpio_1.default.promise.setup(IN2, rpi_gpio_1.default.DIR_OUT);
            console.log('Setup Done');
        });
    }
    startDown() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Starting Motor Down');
            yield rpi_gpio_1.default.promise.write(ENA, true);
            yield rpi_gpio_1.default.promise.write(IN1, true);
            yield rpi_gpio_1.default.promise.write(IN2, false);
            console.log('Started Motor Down');
        });
    }
    startUp() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Starting Motor Up');
            yield rpi_gpio_1.default.promise.write(ENA, true);
            yield rpi_gpio_1.default.promise.write(IN1, false);
            yield rpi_gpio_1.default.promise.write(IN2, true);
            console.log('Started Motor Up');
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Stopping Motor');
            yield rpi_gpio_1.default.promise.write(ENA, false);
            yield rpi_gpio_1.default.promise.write(IN1, false);
            yield rpi_gpio_1.default.promise.write(IN2, false);
            console.log('Stopped Motor');
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield rpi_gpio_1.default.promise.destroy();
        });
    }
}
exports.LinearAccelerator = LinearAccelerator;
