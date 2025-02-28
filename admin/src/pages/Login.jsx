import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { aToken, setAToken, backendUrl } = useContext(AdminContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
            else {

            }
        } catch (error) {

        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='shadow-xl rounded-xl text-sm text-[#5E5E5E] flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 m-auto'>
                <p className='font-semibold text-2xl m-auto'><span className='text-[#5F6FFF]'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-[#DADADA] rounded outline-none focus:ring-gray-700 focus:ring-2 w-full p-2 mt-1' type='email' name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='border border-[#DADADA] rounded outline-none focus:ring-gray-700 focus:ring-2 w-full p-2 mt-1' type='password' name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className='py-2 bg-[#5F6FFF] w-full text-white rounded-md text-base'>Login</button>
                {
                    state === 'Admin' ?
                        <p>Doctor Login? <span className='text-[#5F6FFF] underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                        :
                        <p>Admin Login? <span className='text-[#5F6FFF] underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login;