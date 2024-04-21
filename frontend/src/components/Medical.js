import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Medical = () => {
    
    const [medicalRecords, setMedicalRecords] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const getMedicalRecords = async () =>{
            const res = await axios.get('http://localhost:3000/users/records');
            console.log(res.data);
            setMedicalRecords(res.data);
        };
        getMedicalRecords();
    },[]);

  return (
    <div className="relative overflow-x-auto pr-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-black uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                            Diagnosis
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Medications
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Treatments
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Record ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Notes
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    {medicalRecords.length === 0 ? null :
                            medicalRecords.map((item) => {
                                return <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.Diagnosis}
                                    </th>
                                    <td className="px-6 py-4 text-white">
                                        {item.Medications}
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {item.Treatments}
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {item.Date}
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {item.RecordID}
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {item.Notes}
                                    </td>
                                </tr>
                            })}
                    </tbody>
                </table>

            </div>
  )
}

export default Medical;