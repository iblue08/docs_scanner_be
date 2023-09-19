"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraRouter = void 0;
const express_1 = __importDefault(require("express"));
const CounterController_1 = require("../controller/CounterController");
const router = express_1.default.Router();
exports.CameraRouter = router;
// router.get("/")
router.post("/registerNewDevice/:deviceId/:count", CounterController_1.registerNewCamera);
router.get("/getAllTodayDevice", CounterController_1.getAllTodayDeviceDetails);
router.get("/getDeviceCountAndDate/:id", CounterController_1.getDeviceCountWithDates);
router.get("/getCountByDate/:id/:date", CounterController_1.getDeviceCountByDate);
router.patch("/updateCounter/:deviceId/:count", CounterController_1.updateCounter);
router.get("/getAllCamera", CounterController_1.getAllCameraDetails);
