import { useRouter } from 'next/router';
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = ({setRenderElement}) => {

  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginDataChange = (e) => {
    e.preventDefault();

    setLoginData((prev) => {
      const newObject = { ...prev, [e.target.name]: e.target.value };
      return newObject;
    });
  };
  
  const handleLoginSubmit = async () => {
    try{
    const response = await axios.post('http://localhost:3000/users/login', loginData);
    localStorage.setItem('token', response.data.token);
    console.log(response.data);
    toast.success("Success");
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
    }catch(e){
      console.log(e);
      toast.error(e.response.data.message);
    }
  }
  
  const handleSignupClick = () => {
    setRenderElement("Signup");
  };

  return (
    
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" onChange={handleLoginDataChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" onChange={handleLoginDataChange} name="password"  id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <button onClick={handleLoginSubmit} className="w-full text-black bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a onClick={handleSignupClick} className="cursor-pointer font-medium text-white hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login