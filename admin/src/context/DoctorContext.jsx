import { useState } from "react";
import { createContext } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ?? '');
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    }

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    }

    const getAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } })

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }


    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            if (data.success) {
                setProfileData(data.profileData);
                console.log(data.profileData)
            }

        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    const val = {
        dToken, setDToken, backendUrl, slotDateFormat, getAppointments, calculateAge, appointments, setAppointments, completeAppointment, cancelAppointment, dashData, setDashData, getDashData, profileData, setProfileData, getProfileData
    }

    return (
        <DoctorContext.Provider value={val}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider;