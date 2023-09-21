import { useParams } from "react-router-dom";
import { getCountByDate, getDeviceCountAndDates } from "../../../utils/apis/Apis";
import React, { useEffect, useState } from "react";
import { CalenderCountInterface } from "../../../@types/interface/calenderCount/CalenderCount";
import Spinner from "../../shared/spinner/Spinner";
import dayjs from "dayjs";

const DeviceCount = () => {
    let { id } = useParams();
    const [calenderCount, setCalenderCount] = useState<CalenderCountInterface[]>([]);
    const [search, setSearch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const getDeviceDateCount = async () => {
        setLoading(true);
        const response = await getDeviceCountAndDates(id!);
        setLoading(false);
        if (response?.status === 200) {
            setSearch(false);
            setCalenderCount(response?.data.data);
        }
    }
    const searchDate = async (date: string) => {
        setLoading(true);
        const response = await getCountByDate(id!, date);
        setLoading(false);
        if (response?.status === 200) {
            setSearch(true);
            setCalenderCount(response?.data.data);
        }
    }
    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const date = dayjs(value).format("DD-MM-YYYY");
        console.log(date);
        searchDate(date);
    }
    useEffect(() => {
        getDeviceDateCount();
    }, [])
    return (


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-24">
                <div className=" ms-auto m-4 max-w-sm">
            {
                    (search) ?
                    <button type="button" className=" text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={getDeviceDateCount}>Reset</button>
                    :
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" onChange={e => handleChangeDate(e)} />
                }
                </div>

            {
                (loading) ? <Spinner /> :
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Device Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Sacnned Photos
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Total Scanned
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (calenderCount.map((value, key) => {
                                    return (
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                {id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {value.date}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {value.count}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {value.total_count}
                                            </td>
                                        </tr>
                                    )
                                })
                                )}

                        </tbody>
                    </table>
            }

        </div>

    )
}

export default DeviceCount