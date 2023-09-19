import mongoose, { Schema } from "mongoose";
import { DeviceInterface } from "../@types/interface/CounterInterface";


export const counterCameraSchema: Schema<DeviceInterface> = new mongoose.Schema({
	device_id:{
        type:String,
        required:[true,"device_id can not be blank"],
    },
    count:{
        type:Number,
        default:0
    },
    total_count:{
        type:Number,
        default:0
    },
    last_update:{
        type:Date,
        default:Date.now()
    },
    date:{
        type:String,
        required:true
    }
}
);

const CounterCameraModel = mongoose.model<DeviceInterface>("deviceDetails", counterCameraSchema);

export default CounterCameraModel;