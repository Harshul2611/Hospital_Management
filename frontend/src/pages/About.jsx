import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-12'>
                <img className='w-full max-w-[360px]' src={assets.about_image} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
                    <p>Welcome to Care Hospital, Your Trusted Partner In Managing your Healthcare Needs Conveniently and Efficiently. At Care Hospital, We Understand the Challenges Individuals Face when it comes to Scheduling Doctor Appointments and Managing their Health Records</p>
                    <p>Care Hospital is commited to Excellence in Healthcare Technology. We continuously strive to enhance our platform, Integrating the latest Advancements to improve user experience and deliver superior service. Whether You're booking Your First Appointment Or Manging Ongoing Care, Care Hospital is here to support you every step of the way.</p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p>Our Vision at Care Hospital is to create a seamless Healthcare Experience For every User. We Aims to bridge the gap between patients and Healthcare Providers, Making it easier for you to Access the care you need, when you need it.</p>
                </div>
            </div>

            <div className='text-xl my-4'>
                <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
            </div>

            <div className='flex flex-col md:flex-row mb-20'>

                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Efficiency:</b>
                    <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Convenience:</b>
                    <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Personalization:</b>
                    <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                </div>

            </div>
        </div>
    )
}

export default About