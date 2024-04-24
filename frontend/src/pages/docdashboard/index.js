import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/Header';
import DocSidebar from '@/components/DocComponents/DocSidebar';
import DocProfile from '@/components/DocComponents/DocProfile';
import DocAppointments from '@/components/DocComponents/DocAppointments';
import DocBills from '@/components/DocComponents/DocBills';
import 'react-toastify/dist/ReactToastify.css';


const Docdashboard = () => {


  const [selectedComponent,setSelectedComponent] = useState("Profile");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    console.log("Token : ", token);
  }, []);


  let renderElement;
  if(selectedComponent === "Profile"){
    renderElement = <DocProfile></DocProfile>
  }else if(selectedComponent === "Appointments"){
    renderElement = <DocAppointments></DocAppointments>
  }else if(selectedComponent === "Bills"){
    renderElement = <DocBills></DocBills>
  }

  return (
    <>
  <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    <Header></Header>
    <div className='grid grid-cols-10'>
      <div className='col-span-2'>
      <DocSidebar setSelectedComponent={setSelectedComponent}></DocSidebar>
      </div>
      <div className='text-black mt-[2%] col-span-8 h-full'>
        {renderElement}
      </div>
    </div>

  </>
  );
};

export default Docdashboard