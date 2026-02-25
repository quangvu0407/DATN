import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axiosInstance from '../customize/axios';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        if (password !== confirmPassword) {
          toast.error("Password not correct!");
          return;
        }
        const res = await axiosInstance.post("/api/user/register", {
          name,
          email,
          password,
        });
        // console.log(response.data);

        if (res.success) {
          setToken(res.token);
          localStorage.setItem("token", res.token);
          toast.success("Create account success!");
          setCurrentState('Login');
          setEmail('');
          setPassword('');
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await axiosInstance.post("/api/user/login", {
          email,
          password,
        });

        if (res.success) {
          setToken(res.token);
          localStorage.setItem("token", res.token);
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token])
  return (
    <div className='border-t'>

      {/* 👉 Thêm dòng Welcome ở đây */}
      <div className='text-center mt-10'>
        <h1 className='text-4xl font-bold text-gray-800'>
          Welcome!
        </h1>
        <p className='text-gray-500 mt-2'>
          Please {currentState === 'Login' ? 'login to your account' : 'create a new account'}
        </p>
      </div>

      <div className='flex flex-col items-center border rounded-lg w-3/4 sm:w-[3/4] sm: w-[400px] py-8 mt-10 mx-auto bg-gray-50'>
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800'>
          <div className='inline-flex items-center gap-2 mb-2 mt-5'>
            <p className='parata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
          </div>
          {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />}
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
          {currentState === 'Sign Up' ? <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" value={confirmPassword} className='w-full px-3 py-2 border border-gray-800' placeholder='Confirm Password' /> : ''}

          <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer'>Forgot your password</p>
            {
              currentState === 'Login'
                ?
                <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create new account</p>
                :
                <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
            }
          </div>
          <button className='bg-blue-400 text-white font-light px-8 py-2 mt-4 border border-black rounded-sm cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  )
}

export default Login