import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {


    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ?? '')

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const val = {
        aToken, setAToken, backendUrl
    }

    return (
        <AdminContext.Provider value={val}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;
