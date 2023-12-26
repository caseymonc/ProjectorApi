"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time);
    });
}
exports.default = default_1;
