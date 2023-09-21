import { header } from "../../configs/apiconfig";
import { Get } from "./ApiCall";

export const getTodayDeviceDetails = async () => {
    const response = await Get("/getAllTodayDevice",header);
    return response;
}
export const getDeviceCountAndDates =async (device_id:string) => {
    const response = await Get(`/getDeviceCountAndDate/${device_id}`,header);
    return response;
}
export const getCountByDate =async (device_id:string,date:string) => {
    const response = await Get(`/getCountByDate/${device_id}/${date}`,header);
    return response;
}
