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
exports.getCountByDate = exports.getCountAndDateById = exports.getAllDevice = exports.getDeviceDetails = exports.getAllDeviceDetialsToday = exports.updateCameraCounter = exports.registerNewDevice = void 0;
const express_1 = require("express");
const CounterSchema_1 = __importDefault(require("../model/CounterSchema"));
const dayjs_1 = __importDefault(require("dayjs"));
const todayDate = (0, dayjs_1.default)(new Date()).format("DD-MM-YYYY");
const registerNewDevice = (device_id, scanned_count) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(device_id);
    try {
        const count = yield getCountByDateAndDeviceid(device_id, todayDate);
        const lastTotal = yield getLastTotal(device_id, scanned_count);
        const device_details = {
            device_id: device_id,
            count: scanned_count,
            last_update: new Date(),
            total_count: lastTotal,
            date: todayDate
        };
        if (!count) {
            const response = yield CounterSchema_1.default.create(device_details);
            return response;
        }
        else {
            const reponse = yield (0, exports.updateCameraCounter)(device_id, scanned_count);
            return express_1.response;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerNewDevice = registerNewDevice;
const getCountByDateAndDeviceid = (device_id, date) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CounterSchema_1.default.findOne({ device_id: device_id, date: date });
    return response;
});
const getLastTotal = (device_id, count) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CounterSchema_1.default.find({ device_id: device_id }, { total_count: 1, _id: 0 }).lean();
    const responseLength = response.length;
    let lastTotal = 0;
    if (responseLength !== 0) {
        lastTotal = response[responseLength - 1].total_count;
    }
    return lastTotal + count;
});
const updateCameraCounter = (device_id, count) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CounterSchema_1.default.updateOne({ device_id: device_id, date: todayDate }, {
        $inc: { count: count, total_count: count },
        $set: { last_update: new Date() }
    });
    const deviceDetails = yield (0, exports.getDeviceDetails)(device_id);
    return deviceDetails;
});
exports.updateCameraCounter = updateCameraCounter;
const getAllDeviceDetialsToday = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CounterSchema_1.default.find({ date: todayDate });
    return response;
});
exports.getAllDeviceDetialsToday = getAllDeviceDetialsToday;
const getDeviceDetails = (device_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CounterSchema_1.default.findOne({ device_id: device_id });
    return response;
});
exports.getDeviceDetails = getDeviceDetails;
const getAllDevice = () => __awaiter(void 0, void 0, void 0, function* () {
    const deviceList = yield CounterSchema_1.default.find({}).lean();
    return deviceList;
});
exports.getAllDevice = getAllDevice;
const getCountAndDateById = (device_id) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceList = yield CounterSchema_1.default.find({ device_id: device_id }, { date: 1, count: 1, total_count: 1, _id: 0 }).lean();
    return deviceList;
});
exports.getCountAndDateById = getCountAndDateById;
const getCountByDate = (date, device_id) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceCount = yield CounterSchema_1.default.find({ device_id: device_id, date: date }, { date: 1, count: 1, total_count: 1, _id: 0 });
    return deviceCount;
});
exports.getCountByDate = getCountByDate;
