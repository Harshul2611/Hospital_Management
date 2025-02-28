import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const obj = "Hello";
    const val = {
        obj
    }

    return (
        <DoctorContext.Provider value={val}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider;