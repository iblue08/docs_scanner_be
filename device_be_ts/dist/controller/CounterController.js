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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTodayDeviceDetails = exports.getDeviceCountByDate = exports.getDeviceCountWithDates = exports.getAllCameraDetails = exports.updateCounter = exports.registerNewCamera = void 0;
const Counter_service_1 = require("../service/Counter.service");
const registerNewCamera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device_id = req.params.deviceId;
    const count = req.params.count;
    console.log(count);
    if (!device_id || !count) {
        res.status(422).json({
            message: "fields are empty"
        });
    }
    else {
        try {
            const response = yield (0, Counter_service_1.registerNewDevice)(device_id, Number(count));
            console.log(response);
            if (response) {
                res.status(200).json({
                    message: "device register successfully",
                    data: response
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: "error in server",
                error
            });
        }
    }
});
exports.registerNewCamera = registerNewCamera;
const updateCounter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device_id = req.params.deviceId;
    const count = req.params.count;
    if (!device_id) {
        res.status(422).json({
            message: "fields are empty"
        });
    }
    else {
        try {
            const response = yield (0, Counter_service_1.updateCameraCounter)(device_id, Number(count));
            if (response) {
                res.status(200).json({
                    message: "count updated successfully",
                    data: response
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: "error in server"
            });
        }
    }
});
exports.updateCounter = updateCounter;
const getAllCameraDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, Counter_service_1.getAllDevice)();
        if (response) {
            res.status(200).json({
                message: "camera details fetched successfully",
                data: response
            });
        }
    }
    catch (error) {
        res.send(500).json({
            message: "error in server"
        });
    }
});
exports.getAllCameraDetails = getAllCameraDetails;
const getDeviceCountWithDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device_id = req.params.id;
    if (!device_id || device_id === undefined) {
        res.status(422).json({
            message: "fields are empty"
        });
    }
    try {
        const response = yield (0, Counter_service_1.getCountAndDateById)(device_id);
        if (response) {
            res.status(200).json({
                message: "camera details fetched successfully",
                data: response
            });
        }
    }
    catch (error) {
        res.send(500).json({
            message: "error in server"
        });
    }
});
exports.getDeviceCountWithDates = getDeviceCountWithDates;
const getDeviceCountByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device_id = req.params.id;
    const date = req.params.date;
    if (!device_id || device_id === undefined || !date || date === undefined) {
        res.status(422).json({
            message: "fields are empty"
        });
    }
    try {
        const response = yield (0, Counter_service_1.getCountByDate)(date, device_id);
        if (response) {
            res.status(200).json({
                message: "camera details fetched successfully",
                data: response
            });
        }
    }
    catch (error) {
        res.send(500).json({
            message: "error in server"
        });
    }
});
exports.getDeviceCountByDate = getDeviceCountByDate;
const getAllTodayDeviceDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, Counter_service_1.getAllDeviceDetialsToday)();
        if (response) {
            res.status(200).json({
                message: "camera details fetched successfully",
                data: response
            });
        }
    }
    catch (error) {
        res.send(500).json({
            message: "error in server"
        });
    }
});
exports.getAllTodayDeviceDetails = getAllTodayDeviceDetails;
