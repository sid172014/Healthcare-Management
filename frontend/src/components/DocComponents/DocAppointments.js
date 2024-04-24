import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const DocAppointments = () => {


  const [appointMent, setAppointment] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const getData = async () => {
        const res = await axios.get('http://localhost:3000/doctors/appointments');
        setAppointment(res.data);
    };
    getData();

    toast.success("Appointments Loaded Successfully!")
  },[]);

  return (

    <>
    <div className="relative overflow-x-auto pr-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-black uppercase bg-gray-50  ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Patient Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        PatientID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Appointment Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Appointment Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {appointMent.length === 0 ? null :
                    appointMent.map((item) => {
                        return <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.Firstname} {item.Lastname}
                            </th>
                            <td className="px-6 py-4 text-white">
                                {item.PatientID}
                            </td>
                            <td className="px-6 py-4 text-white">
                                {item.AppointmentDate}
                            </td>
                            <td className="px-6 py-4 text-white">
                                {item.AppointmentTime}
                            </td>
                            {item.Status === "Scheduled" ? <td className="px-6 py-4 text-white">
                                {item.Status}
                            </td> : <td className="px-6 py-4 text-green-500">
                                {item.Status}
                            </td>}
                        </tr>
                    })}
            </tbody>
        </table>
    </div>
</>
  )
}

export default DocAppointments