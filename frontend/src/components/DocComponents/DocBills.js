import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


const DocBills = () => {

  const [billsGenerated, setBillsGenerated] = useState([]);  
  const [allPatients,setAllPatients] = useState([]);
  const [inputs,setInputs] = useState({
    PatientID : "",
    TotalAmount : "",
    Date : ""
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const getData = async () => {
      const res = await axios.get('http://localhost:3000/doctors/bills');
      console.log(res.data);
      setBillsGenerated(res.data);
    };
    getData();

    const getPatients = async () => {
      const res = await axios.get('http://localhost:3000/doctors/patients');
      console.log("Patients " , res.data);
      setAllPatients(res.data);
    }
    getPatients();
    toast.success("Bills Loaded Successfully!");
  }, []);


  const handleInputChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      const newObject = { ...prev, [e.target.name]: e.target.value };
      console.log(newObject)
      return newObject;
    });
  };

  const handleButtonSubmit = async () => {

    const newObject = {...inputs,PaymentStatus : "Pending",PaymentMethod : "None"}; 
    const response = await axios.post('http://localhost:3000/doctors/bills',newObject); 

    toast.success("Bill Added Successfully!");
    const getData = async () => {
      const res = await axios.get('http://localhost:3000/doctors/bills');
      console.log(res.data);
      setBillsGenerated(res.data);
    };
    getData();
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
              Patient ID
            </th>
            <th scope="col" className="px-6 py-3">
              Patient Name
            </th>
            <th scope="col" className="px-6 py-3">
              TotalAmount
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

          {billsGenerated.length === 0 ? null :
            billsGenerated.map((item) => {
              return <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.InvoiceID}
                </th>
                <td className="px-6 py-4 text-white">
                  {item.PatientID}
                </td>
                <td className="px-6 py-4 text-white">
                  {item.Firstname} {item.Lastname}
                </td>
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
          Add Bill For Patients
        </div>
        <div className='mt-4 flex'>
          {/* <div class="max-w-sm pl-2">
            <label for="email" class="block mb-2 text-sm font-medium text-black">Pending Amount</label>
            <select name='TotalAmount' id="statusDropdown" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value="">None</option>
              {pendingBills.length === 0 ? null :
                pendingBills.map((item) => {
                  return <option value={item.TotalAmount}>{item.TotalAmount}</option>
                })}
            </select>
          </div> */}

          <div class="max-w-sm pl-2">
            <label for="email" class="block mb-2 text-sm font-medium text-black">Patient Name</label>
            <select name='PatientID' onChange={handleInputChange} id="statusDropdown" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value="">None</option>
              {allPatients.length === 0 ? null :
              allPatients.map((item) => {
                return <option value={item.PatientID}>{item.FirstName} {item.LastName}</option>
              })
              }
            </select>
          </div>

          <div class="max-w-sm pl-2">
            <label for="email" class="block mb-2 text-sm font-medium text-black">Amount to be Paid</label>
            <input type="text" name="TotalAmount" onChange={handleInputChange}  aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Total Amount" />
          </div>

          <div class="max-w-sm pl-2">
            <label for="email" class="block mb-2 text-sm font-medium text-black">Date</label>
            <input type="text" name="Date" onChange={handleInputChange} aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date" />
          </div>

          {/* <div class="max-w-sm pl-2">
            <label for="email" class="block mb-2 text-sm font-medium text-black">Payment Method</label>
            <select onChange={handleBillPayment} name='PaymentMethod' id="statusDropdown" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value="">None</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Online Transfer">Online Transfer</option>
            </select>
          </div> */}

          <div class="max-w-sm pl-2 flex items-end">
            <button type="button" onClick={handleButtonSubmit} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Bill</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocBills