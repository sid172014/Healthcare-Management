import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Profile from '@/components/Profile';
import { render } from 'react-dom';
import Appointments from '@/components/Appointments';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Medical from '@/components/Medical';
import Bills from '@/components/Bills';

const Dashboard = () => {

  const [selectedComponent,setSelectedComponent] = useState("Profile");

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Dashboard", token);

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  let renderElement;
  if(selectedComponent === "Profile"){
    renderElement = <Profile></Profile>; 
    toast.success("Profile Loaded")
  }else if(selectedComponent === "Appointments"){
    renderElement = <Appointments></Appointments>
    toast.success("Appointments Loaded")
  }else if(selectedComponent === "Medical Records"){
    renderElement = <Medical></Medical>
    toast.success("Medical History Loaded")
  }else if(selectedComponent === "Bills"){
    renderElement = <Bills></Bills>
    toast.success("Bills Loaded")
  }
  return (<>
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
      <Sidebar setSelectedComponent={setSelectedComponent}></Sidebar>
      </div>
      <div className='text-black mt-[2%] col-span-8 h-full'>
        {renderElement}
      </div>
    </div>

  </>
  )
}

export default Dashboard