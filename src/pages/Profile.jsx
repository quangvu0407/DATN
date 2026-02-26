import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../customize/axios';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);
  const {getCartCount, navigate} = useContext(ShopContext)

  const getProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/user/profile");

      if (res.success) {
        console.log(res);
        setUser(res.user);
        setOrders(res.orderCount)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 border-y">
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

        {/* Header Section */}
        <div className="bg-indigo-600 p-6 text-center">
          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-indigo-600">
              {user?.name?.charAt(0)}
            </span>
          </div>
          <h1 className="mt-4 text-xl font-bold text-white uppercase tracking-wider">
            User Profile
          </h1>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-50 pb-3">
              <span className="font-semibold text-slate-700 min-w-[70px]">Name:</span>
              <span className="text-slate-600">{user?.name}</span>
            </div>

            <div className="flex items-center space-x-2 border-b border-slate-50 pb-3">
              <span className="font-semibold text-slate-700 min-w-[70px]">Email:</span>
              <span className="text-slate-600 font-medium">{user?.email}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div onClick={() => navigate('/cart')} className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100 cursor-pointer">
              <p className="text-xs uppercase font-bold text-blue-500 mb-1">Cart Items</p>
              <p  className="text-2xl font-black text-blue-700">{getCartCount()}</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl text-center border border-emerald-100 cursor-pointer">
              <p className="text-xs uppercase font-bold text-emerald-500 mb-1">Orders</p>
              <p className="text-2xl font-black text-emerald-700">{orders}</p>
            </div>
          </div>

          <button className="mt-8 w-full bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-slate-900 transition-all active:scale-95 shadow-md cursor-pointer">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;