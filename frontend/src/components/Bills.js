import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Bills = () => {


    const [billsRecords, setBillsRecords] = useState([]);
    const [pendingBills, setPendingbBills] = useState([]);
    const [updatePayment, setUpdatePayment] = useState({
        TotalAmount: "",
        PaymentMethod: ""
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const getMedicalRecords = async () => {
            const res = await axios.get('http://localhost:3000/users/bills');

            setBillsRecords(res.data);
            setPendingbBills(() => {
                const pending = res.data.filter((item) => item.PaymentStatus === "Pending");
                return pending;
            })
        };
        getMedicalRecords();
    }, []);

    const handleBillPayment = (e) => {
        e.preventDefault();
        setUpdatePayment((prev) => {
            const newObject = { ...prev, [e.target.name]: e.target.value };
            console.log(newObject);
            return newObject;
        });
    };

    const handleDoPayment = async () => {
        try{
            const res = await axios.patch('http://localhost:3000/users/bills', updatePayment);
            console.log(res.data);
            toast.success("Payment Done Successfully!");
            const getMedicalRecords = async () => {
                const res = await axios.get('http://localhost:3000/users/bills');
                setBillsRecords(res.data);
                setPendingbBills(() => {
                    const pending = res.data.filter((item) => item.PaymentStatus === "Pending");
                    return pending;
                });
            };
            getMedicalRecords();
        }catch(e){
            console.log(e.message);
            toast.success("Payment Failed!");
        }
    }

    return (
        <div className="relative overflow-x-auto pr-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-black uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Invoice ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payment Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payment Method
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {billsRecords.length === 0 ? null :
                        billsRecords.map((item) => {
                            return <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.InvoiceID}
                                </th>
                                <td className="px-6 py-4 text-white">
                                    ₹ {item.TotalAmount}
                                </td>
                                {item.PaymentStatus === "Paid" ?
                                    <td className="px-6 py-4 text-green-600">
                                        {item.PaymentStatus}
                                    </td> : <td className="px-6 py-4 text-yellow-500">
                                        {item.PaymentStatus}
                                    </td>}
                                <td className="px-6 py-4 text-white">
                                    {item.PaymentMethod}
                                </td>
                                <td className="px-6 py-4 text-white">
                                    {item.Date}
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>
            <div className='mt-4'>
                <div className='text-3xl font-extrabold '>
                    Clear Due
                </div>
                <div className='mt-4 flex'>
                    <div class="max-w-sm pl-2">
                        <label for="email" class="block mb-2 text-sm font-medium text-black">Pending Amount</label>
                        <select onChange={handleBillPayment} name='TotalAmount' id="statusDropdown" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value="">None</option>
                            {pendingBills.length === 0 ? null :
                                pendingBills.map((item) => {
                                    return <option value={item.TotalAmount}>{item.TotalAmount}</option>
                                })}
                        </select>
                    </div>
                    <div class="max-w-sm pl-2">
                        <label for="email" class="block mb-2 text-sm font-medium text-black">Payment Method</label>
                        <select onChange={handleBillPayment} name='PaymentMethod' id="statusDropdown" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value="">None</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Cash">Cash</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Online Transfer">Online Transfer</option>
                        </select>
                    </div>

                    <div class="max-w-sm pl-2 flex items-end">
                        <button onClick={handleDoPayment} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Proceed to Pay</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Bills