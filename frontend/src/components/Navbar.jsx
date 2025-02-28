import React, { useState } from 'react'
import { assets } from "../assets/assets"
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
    const [isMenu, setIsMenu] = useState(false);
    const [token, setToken] = useState(true);

    return (
        <div className='flex justify-between text-sm items-center py-4 mb-5 border-b-gray-400 border-b'>
            <NavLink to="/"><img onClick={() => { navigate('/') }} src={assets.logo} alt="hospital-logo" className='cursor-pointer w-44' /></NavLink>
            <ul className='hidden md:flex gap-5 font-medium items-start'>
                <NavLink to="/"><li className='py-1'>HOME</li><hr className='outline-none border-none h-0.5 w-3/5 bg-[#5f6FFF] m-auto hidden' /></NavLink>
                <NavLink to="/doctors"><li className='py-1'>ALL DOCTORS</li><hr className='outline-none border-none h-0.5 w-3/5 bg-[#5f6FFF] m-auto hidden' /></NavLink>
                <NavLink to="/about"><li className='py-1'>ABOUT</li><hr className='outline-none border-none h-0.5 w-3/5 bg-[#5f6FFF] m-auto hidden' /></NavLink>
                <NavLink to="/contact"><li className='py-1'>CONTACT</li><hr className='outline-none border-none h-0.5 w-3/5 bg-[#5f6FFF] m-auto hidden' /></NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p className='hover:text-black cursor-pointer' onClick={() => navigate('/profile')}>My Profile</p>
                                    <p className='hover:text-black cursor-pointer' onClick={() => navigate('/my-appointments')}>My Appointments</p>
                                    <p className='hover:text-black cursor-pointer' onClick={() => setToken(prev => !prev)}>Logout</p>
                                </div>
                            </div>
                        </div>
                        :
                        <button onClick={() => navigate('/login')} className='cursor-pointer font-light text-white bg-[#5f6FFF] px-8 py-3 rounded-full hidden md:block'>Create Account</button>
                }


                <img onClick={() => setIsMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />
                <div className={`${isMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setIsMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink className={`px-4 py-2 rounded inline-block hover:bg-indigo-600 hover:text-white`} onClick={() => setIsMenu(false)} to="/">HOME</NavLink>
                        <NavLink className={`px-4 py-2 rounded inline-block hover:bg-indigo-600 hover:text-white`} onClick={() => setIsMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
                        <NavLink className={`px-4 py-2 rounded inline-block hover:bg-indigo-600 hover:text-white`} onClick={() => setIsMenu(false)} to="/about">ABOUT</NavLink>
                        <NavLink className={`px-4 py-2 rounded inline-block hover:bg-indigo-600 hover:text-white`} onClick={() => setIsMenu(false)} to="/contact">CONTACT</NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar