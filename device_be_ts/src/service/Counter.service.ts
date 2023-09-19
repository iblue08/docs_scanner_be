import { response } from "express";
import { DeviceInterface } from "../@types/interface/CounterInterface"
import CounterCameraModel from "../model/CounterSchema"
import dayjs from "dayjs";
const todayDate: string = dayjs(new Date()).format("DD-MM-YYYY");
export const registerNewDevice = async (device_id: string, scanned_count: number) => {
    console.log(device_id);
    try {
        const count = await getCountByDateAndDeviceid(device_id, todayDate);
        const lastTotal= await getLastTotal(device_id,scanned_count);
        const device_details: DeviceInterface = {
            device_id: device_id,
            count: scanned_count,
            last_update: new Date(),
            total_count:lastTotal,
            date: todayDate
        }
        if (!count) {
            const response = await CounterCameraModel.create(device_details);
            return response;
        }
        else {
            const reponse = await updateCameraCounter(device_id, scanned_count);
            return response;
        }
    }
    catch (error) {
        console.log(error);
    }
}

const getCountByDateAndDeviceid = async (device_id: string, date: string) => {
    const response = await CounterCameraModel.findOne({ device_id: device_id, date: date });
    return response;
}
const getLastTotal =async (device_id:string,count:number) => {
    const response = await CounterCameraModel.find({ device_id: device_id },{total_count:1,_id:0}).lean();
    const responseLength=response.length;
    let lastTotal=0
    if(responseLength!==0){
        lastTotal=response[responseLength-1].total_count;
    }
    return lastTotal+count;
}
export const updateCameraCounter = async (device_id: string, count: number) => {
    const response = await CounterCameraModel.updateOne(
        { device_id: device_id, date: todayDate },
        {
            $inc: { count: count,total_count:count },
            $set:{last_update:new Date()}
        }
    );
    const deviceDetails = await getDeviceDetails(device_id);
    return deviceDetails;
}

export const getAllDeviceDetialsToday =async () => {
    const response = await CounterCameraModel.find(
        {date:todayDate}
    );
    return response;
}

export const getDeviceDetails = async (device_id: string) => {
    const response = await CounterCameraModel.findOne({ device_id: device_id });
    return response;
}
export const getAllDevice = async () => {
    const deviceList = await CounterCameraModel.find({}).lean();
    return deviceList;
}
export const getCountAndDateById =async (device_id:string) => {
    const deviceList = await CounterCameraModel.find(
        {device_id:device_id},
        {date:1,count:1,total_count:1,_id:0}
    ).lean();
    return deviceList;
}

export const getCountByDate =async (date:string,device_id:string) => {
    const deviceCount = await CounterCameraModel.find(
        {device_id:device_id,date:date},
        {date:1,count:1,total_count:1,_id:0}
    )
    return deviceCount;
}