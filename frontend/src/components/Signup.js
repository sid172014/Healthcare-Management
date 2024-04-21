import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = ({setRenderElement}) => {
    const [signupData, setSignupData] = useState({
        firstname: "",
        lastname: "",
        dateofbirth: "",
        gender: "",
        contactnumber : "",
        email : "",
        password : "",
        address : ""
    });

    const handleSignupDataChange = (e) => {
        e.preventDefault();
        setSignupData((prev) => {
          const newObject = { ...prev, [e.target.name]: e.target.value };
          return newObject;
        });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault(); 

        try{
        const response = await axios.post('http://localhost:3000/users/signup', signupData);
        toast.success("Signed Up Successfully");
        }catch(e){
            toast.error(e.message);
        }
    }

    const handleLoginClick = () => {
        setRenderElement("Login")
    }
    return (
        <section>
            <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <div className="space-y-2 md:space-y-2" >
                            <div className='grid grid-cols-2'>
                                <div className='p-2 first-line:pb-2'>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={handleSignupDataChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div className='p-2 pb-2'>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={handleSignupDataChange}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className='p-2 pb-2'>
                                    <label for="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input onChange={handleSignupDataChange}  type="text" name="firstname" id="password" placeholder="First Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className='p-2 pb-2'>
                                    <label for="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input onChange={handleSignupDataChange}  type="text" name="lastname" id="password" placeholder="Last Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className='p-2 pb-2'>
                                    <label for="dateofbirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                                    <input onChange={handleSignupDataChange} type="text" name="dateofbirth" id="password" placeholder="Date of Birth" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div className='p-2 pb-2'>
                                    <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                    <input onChange={handleSignupDataChange}  type="text" name="gender" id="password" placeholder="Gender" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div className='p-2 pb-2'>
                                    <label for="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Number</label>
                                    <input onChange={handleSignupDataChange}  type="text" name="contactnumber" id="password" placeholder="Contact Number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className='p-2 pb-2'>
                                    <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input onChange={handleSignupDataChange}  type="text" name="address" id="password" placeholder="Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                            </div>
                            <button onClick={handleSubmit}  className="w-full bg-white text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a onClick={handleLoginClick} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup