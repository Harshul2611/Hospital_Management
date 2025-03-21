import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {

    const { docId } = useParams();
    const navigate = useNavigate();

    const { doctors, moneySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [filterDoc, setFilterDoc] = useState(null);

    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const applyFilter = async () => {
        const filterDoc = doctors.find(doc => doc._id === docId);
        setFilterDoc(filterDoc);
        console.log(filterDoc)
    }

    const getAvailableSlot = async () => {
        let allSlots = []; // Collect all slots in this array
        let today = new Date();
        today.setHours(0, 0, 0, 0); // Set today's date to start of the day to avoid the time mismatch

        // Loop through the next 7 days
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today); // Start with a fresh date object for each iteration
            currentDate.setDate(today.getDate() + i); // Increment day by i

            // Now clear the time and make sure the date is correctly set
            currentDate.setHours(10, 0, 0, 0); // Set the start time for the day to 10:00 AM

            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0); // Set the end time to 9 PM for the current date

            let timeSlots = []; // Array to hold the time slots for this day

            // If today is selected (i === 0), check the current time
            if (i === 0) {
                let currentTime = new Date(); // Get the current time
                console.log("Current Time: ", currentTime);

                // Check if current time is after 8:30 PM today
                if (currentTime.getHours() > 20 || (currentTime.getHours() === 20 && currentTime.getMinutes() > 30)) {
                    // If it's after 8:30 PM, set the end time to the current time (so no slots after that)
                    endTime = new Date(currentTime);
                    console.log("Setting endTime to current time because it's after 8:30 PM");
                } else {
                    // Otherwise, limit the end time to 8:30 PM for today
                    endTime.setHours(20, 30, 0, 0); // Set end time to 8:30 PM for today
                    console.log("Setting endTime to 8:30 PM for today");
                }
            }

            // Generate available time slots for the day (up to endTime)
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const slotTime = formattedTime;

                const isSlotAvailable = filterDoc.slots_booked[slotDate] && filterDoc.slots_booked[slotDate].includes(slotTime) ? false : true;

                if (isSlotAvailable) {
                    if (currentDate <= endTime) {
                        timeSlots.push({
                            datetime: new Date(currentDate), // Save the current date for the slot
                            time: formattedTime,
                        });
                    }
                }
                // Only push slots before or equal to the end time

                currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment time by 30 minutes
            }

            console.log("Generated Slots for Day:", timeSlots); // Log time slots for each day
            allSlots.push(timeSlots); // Add this day's slots to the allSlots array
        }

        console.log("All Slots:", allSlots); // Log all slots once created
        setDocSlots(allSlots); // Finally, update the state with the slots
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Login  to book appointment")
            return navigate('/login');
        }
        try {
            const date = docSlots[slotIndex][0].datetime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + "_" + month + "_" + year;

            console.log(slotDate, slotTime);

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate('/my-appointments');
            }
            else {
                toast.error(data.message);
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        applyFilter();
    }, [docId])

    useEffect(() => {
        if (filterDoc) {
            getAvailableSlot();
        }
    }, [filterDoc])

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots])

    return filterDoc && (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={filterDoc.image} alt="" />
                </div>

                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{filterDoc.name} <img className='w-5' src={assets.verified_icon} /></p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{filterDoc["degree"]} - {filterDoc["speciality"]}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{filterDoc.experience}</button>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{filterDoc.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-600'>{moneySymbol}{filterDoc.fees}</span>
                    </p>
                </div>
            </div>

            {/** ---- Booking Slots ---- */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <div
                                onClick={() => setSlotIndex(index)}
                                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-200'}`}
                                key={index}
                            >
                                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0] && item[0].datetime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                <button onClick={bookAppointment} className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
            </div>

            <RelatedDoctors docId={docId} speciality={filterDoc.speciality} />
        </div>
    )
}

export default Appointments