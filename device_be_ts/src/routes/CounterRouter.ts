import express from "express";
import { getAllCameraDetails, getAllTodayDeviceDetails, getDeviceCountByDate, getDeviceCountWithDates, registerNewCamera, updateCounter } from "../controller/CounterController";

const router = express.Router();

// router.get("/")
router.post("/registerNewDevice/:deviceId/:count", registerNewCamera);
router.get("/getAllTodayDevice", getAllTodayDeviceDetails);
router.get("/getDeviceCountAndDate/:id", getDeviceCountWithDates);
router.get("/getCountByDate/:id/:date", getDeviceCountByDate);
router.patch("/updateCounter/:deviceId/:count", updateCounter);
router.get("/getAllCamera", getAllCameraDetails);

export { router as CameraRouter } 