import { Request, Response } from "express";
import { getAllDevice, getAllDeviceDetialsToday, getCountAndDateById, getCountByDate, registerNewDevice, updateCameraCounter } from "../service/Counter.service";
import { DateInterface } from "../@types/interface/DateInterface";


export const registerNewCamera = async (req: Request, res: Response) => {
    const device_id = req.params.deviceId;
    const count = req.params.count;
    console.log(count);
    if (!device_id || !count) {
        res.status(422).json({
            message: "fields are empty"
        })
    }
    else {
        try {
            const response = await registerNewDevice(device_id,Number(count));
            console.log(response);
            if (response) {
                res.status(200).json({
                    message: "device register successfully",
                    data: response
                })
            }
        }
        catch (error) {
            res.status(500).json({
                message: "error in server",
                error
            })
        }
    }
}

export const updateCounter = async (req: Request, res: Response) => {
    const device_id = req.params.deviceId;
    const count = req.params.count;
    if (!device_id) {
        res.status(422).json({
            message: "fields are empty"
        })
    }
    else {
        try {
            const response = await updateCameraCounter(device_id,Number(count));
            if (response) {
                res.status(200).json({
                    message: "count updated successfully",
                    data: response
                })
            }
        }
        catch (error) {
            res.status(500).json({
                message: "error in server"
            })
        }
    }
}

export const getAllCameraDetails = async (req: Request, res: Response) => {
    try {
        const response = await getAllDevice();
        if (response) {
            res.status(200).json({
                message: "camera details fetched successfully",
                data: response
            })
        }
    }
    catch (error) {
        res.send(500).json({
            message: "error in server"
        })
    }

}
export const getDeviceCountWithDates = async (req: Request, res: Response) => {
    const device_id=req.params.id;
    if(!device_id || device_id===undefined){
        res.status(422).json({
            message: "fields are empty"
        })
    }
    try {
        const response = await getCountAndDateById(device_id);
        if (response) {
            res.status(200).json({
                message: "camera details fetched successfully",
                data: response
            })
        }
    }
    catch (error) {
        res.send(500).json({
            message: "error in server"
        })
    }

}
export const getDeviceCountByDate = async (req: Request, res: Response) => {
    const device_id=req.params.id;
    const date=req.params.date;
    if(!device_id || device_id===undefined || !date || date===undefined){
        res.status(422).json({
            message: "fields are empty"
        })
    }
    try {
        const response = await getCountByDate(date,device_id);
        if (response) {
            res.status(200).json({
                message: "camera details fetched successfully",
                data: response
            })
        }
    }
    catch (error) {
        res.send(500).json({
            message: "error in server"
        })
    }

}

export const getAllTodayDeviceDetails = async (req: Request, res: Response) => {
    try {
        const response = await getAllDeviceDetialsToday();
        if (response) {
            res.status(200).json({
                message: "camera details fetched successfully",
                data: response
            })
        }
    }
    catch (error) {
        res.send(500).json({
            message: "error in server"
        })
    }

}