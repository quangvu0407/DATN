import React, { useState } from 'react'
import { Form } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }
  return (
    <div className='flex flex-col items-center border rounded-lg w-3/4 sm:w-[3/4] sm: w-[400px] py-8 mt-15 mx-auto'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-5'>
          <p className='parata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        {currentState === 'Login' ? '' : <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name'></input>}
        <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Email'></input>
        <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Password'></input>
        {currentState === 'Sign Up' ? <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Confirm Password'></input> : ''}

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
        <button className='bg-red-400 text-white font-light px-8 py-2 mt-4 border rounded-sm cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login