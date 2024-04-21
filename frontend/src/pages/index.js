import Header from '@/components/Header';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const router = useRouter();

  // useEffect(() => {
  //   const body = {
  //     email : "sid@gmail.com",
  //     password : "sid"
  // };
  //   const getData = async () => {
  //     const res = await axios.post('http://localhost:3000/users/login',body);
  //     localStorage.setItem('token', res.data.token);
  //     console.log("Token saved" , localStorage.getItem('token'));
  //   }
  //   getData();
  // }, []);
  const [renderElement, setRenderElement] = useState("Login");

  if (renderElement === 'Login') {
    setRenderElement(<Login setRenderElement={setRenderElement}></Login>);
  } else if (renderElement === 'Signup') {
    setRenderElement(<Signup setRenderElement={setRenderElement}></Signup>)
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
      <div className="w-full bg-[url('/images/homebg.png')] bg-no-repeat bg-center bg-cover">
        {renderElement}
      </div>
    </>
  );
}
