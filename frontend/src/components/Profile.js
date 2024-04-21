import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Profile() {
    const [userData, setuserData] = useState({});
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const getData = async () => {
            const res = await axios.get('http://localhost:3000/users/profile');
            setuserData(res.data);
        };
        getData();
    }, []);
    return (
        <div className="grid grid-cols-12  gap-4 p-4 bg-white rounded-lg shadow-2xl shadow-black">
    {/* Image Section */}
    <div className="col-span-4">
        <div className="w-full h-full flex items-center justify-center">
            <img className="w-64 h-64 object-cover rounded-lg" src="/images/Profile.png" alt="Description" />
        </div>
    </div>

    {/* User Data Section */}
    <div className="col-span-8 p-10">
        {Object.keys(userData).length === 0 ? (
            <p className="text-center">No user data available.</p>
        ) : (
            <div className="space-y-4 ">
                {Object.keys(userData).map((item) => (
                    <div key={item} className="flex justify-between">
                        <span className="font-semibold">{item}</span>
                        <span>{userData[item]}</span>
                    </div>
                ))}
            </div>
        )}
    </div>
</div>

    )
}

export default Profile;