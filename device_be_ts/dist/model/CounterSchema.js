"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterCameraSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.counterCameraSchema = new mongoose_1.default.Schema({
    device_id: {
        type: String,
        required: [true, "device_id can not be blank"],
    },
    count: {
        type: Number,
        default: 0
    },
    total_count: {
        type: Number,
        default: 0
    },
    last_update: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: String,
        required: true
    }
});
const CounterCameraModel = mongoose_1.default.model("deviceDetails", exports.counterCameraSchema);
exports.default = CounterCameraModel;
