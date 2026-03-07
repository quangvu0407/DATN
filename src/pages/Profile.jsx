import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../customize/axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react'; // Import icon

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);
  const { getCartCount, navigate } = useContext(ShopContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('name');
  
  // State quản lý ẩn/hiện mật khẩu cho từng trường
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState({
    newName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Hàm toggle ẩn hiện
  const toggleVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/user/profile");
      if (res.success) {
        setUser(res.user);
        setOrders(res.orderCount);
        setFormData(prev => ({ ...prev, newName: res.user.name }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'name' ? "/api/user/update-name" : "/api/user/change-password";
      
      if (mode === 'password' && formData.newPassword !== formData.confirmPassword) {
        return toast.error("Confirm Password not correct!");
      }

      const res = await axiosInstance.post(endpoint, formData);
      if (res.success) {
        toast.success("Update success!");
        setIsModalOpen(false);
        // Reset mật khẩu trong form sau khi đổi thành công
        setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }));
        getProfile();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen border-t bg-slate-50 flex items-center justify-center p-4">
      {/* Card Profile Chính (Giữ nguyên như code cũ của bạn) */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transition-all">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-inner border-4 border-indigo-200">
              <span className="text-4xl font-black text-indigo-600 uppercase">
                {user?.name?.charAt(0)}
              </span>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white tracking-tight">Account</h1>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border border-slate-300 p-3 rounded-sm">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Họ tên</p>
                <p className="text-lg font-medium text-slate-800">{user?.name}</p>
              </div>
              <button onClick={() => { setMode('name'); setIsModalOpen(true); }} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">Edit</button>
            </div>

            <div className="p-3 border border-slate-300 rounded-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
              <p className="text-lg font-medium text-slate-800">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div onClick={() => navigate('/cart')} className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 cursor-pointer text-center">
              <p className="text-[10px] font-black text-indigo-400 uppercase">CART</p>
              <p className="text-2xl font-black text-indigo-700">{getCartCount()}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center">
              <p className="text-[10px] font-black text-emerald-400 uppercase">MY ORDERS</p>
              <p className="text-2xl font-black text-emerald-700">{orders || 0}</p>
            </div>
          </div>

          <button onClick={() => { setMode('password'); setIsModalOpen(true); }} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg">
            Change password
          </button>
        </div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

          <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              {mode === 'name' ? 'Update Name' : 'Security Settings'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'name' ? (
                <div>
                  <label className="text-sm font-bold text-slate-500 ml-1">New Name</label>
                  <input 
                    type="text"
                    required
                    className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.newName}
                    onChange={(e) => setFormData({...formData, newName: e.target.value})}
                  />
                </div>
              ) : (
                <>
                  {/* Trường mật khẩu cũ */}
                  <div className="relative">
                    <input 
                      type={showPassword.old ? "text" : "password"}
                      placeholder="Old Password"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
                      onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                    />
                    <button type="button" onClick={() => toggleVisibility('old')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                      {showPassword.old ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Trường mật khẩu mới */}
                  <div className="relative">
                    <input 
                      type={showPassword.new ? "text" : "password"}
                      placeholder="New Password"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    />
                    <button type="button" onClick={() => toggleVisibility('new')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                      {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Trường xác nhận mật khẩu */}
                  <div className="relative">
                    <input 
                      type={showPassword.confirm ? "text" : "password"}
                      placeholder="Confirm New Password"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                    <button type="button" onClick={() => toggleVisibility('confirm')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                      {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-slate-500 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-3 font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;