import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointments = () => {

    const [appointMent, setAppointment] = useState([]);
    const [doctors,setDoctors] = useState([]);
    const [bookData,setBookData] = useState({
        PatientID : "",
        DoctorID : "",
        appointmentDate : "",
        appointmentTime : "",
        Status : ""
    });
    const [userData, setuserData] = useState({});

    const handleBookDataChange = (e) => {
        e.preventDefault();
        setBookData((prev) => {
            const newObject = { ...prev, [e.target.name]: e.target.value };
            console.log(newObject)
            return newObject;
        });
    };

    const handleSubmitAppointment = async () => {
        try{
            console.log(bookData);
            const response = await axios.post('http://localhost:3000/users/appointments', bookData);
            console.log(response.data);
            toast.success("Added Appointment");
            setBookData({
                PatientID : "",
                DoctorID : "",
                appointmentDate : "",
                appointmentTime : "",
                Status : ""
            });
            const getData = async () => {
                const res = await axios.get('http://localhost:3000/users/appointments');
                setAppointment(res.data);
            };
            getData();
        }catch(e){
            console.log(e.message);
            toast.error("Failed to Add Appointment");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const getData = async () => {
            const res = await axios.get('http://localhost:3000/users/appointments');
            setAppointment(res.data);
        };
        getData();

        const getDoctors = async () => {
            const res = await axios.get('http://localhost:3000/doctors');
            console.log(res.data);
            setDoctors(res.data);
        };
        getDoctors();
        const getProfileData = async () => {
            const res = await axios.get('http://localhost:3000/users/profile');
            setBookData((prev) => {
                const newObject = { ...prev, PatientID: res.data.PatientID};
                console.log(newObject)
                return newObject;
            });
        };
        getProfileData();
    }, []);

    return (

        <>
            <div className="relative overflow-x-auto pr-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-black uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Doctor Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PatientID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DoctorID
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
                                        {item.DoctorFirstName} {item.DoctorLastName}
                                    </th>
                                    <td className="px-6 py-4 text-white">
                                        {item.PatientID}
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {item.DoctorID}
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
            <div className='mt-4'>
                <div className='text-3xl font-extrabold '>
                    Add Appointment
                </div>
                <div className='mt-4 flex'>
                    <div class="max-w-sm">
                        <label for="email" class="block mb-2 text-sm font-medium text-black">Appointment Date</label>
                        <input onChange={handleBookDataChange} type="email" name="appointmentDate" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Appointment Date" />
                    </div>
                    <div class="max-w-sm pl-2">
                        <label for="email" class="block mb-2 text-sm font-medium text-black">Appointment Time</label>
                        <input onChange={handleBookDataChange} type="email" name="appointmentTime" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Appointment Time" />
                    </div>
                    <div class="max-w-sm pl-2">
                        <label for="email" class="block mb-2 text-sm font-medium text-black">Doctor's Name</label>
                        <select onChange={handleBookDataChange} name='DoctorID' id="doctorDropdown" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        <option value="">None</option>
                            {doctors.length === 0 ? null : 
                            doctors.map((item) => {
                                return <option value={item.DoctorID}>{item.FirstName} {item.LastName}</option>
                            })}
                        </select>
                    </div>
                    <div class="max-w-sm pl-2">
                        <label for="email" class="block mb-2 text-sm font-medium text-black">Status</label>
                        <select onChange={handleBookDataChange} name='Status' id="statusDropdown" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value="">None</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div class="max-w-sm pl-2 flex items-end">
                        <button onClick={handleSubmitAppointment} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Appointments