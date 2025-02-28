import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const obj = "Hello"
    const val = {
        obj
    }

    return (
        <AppContext.Provider value={val} >
            {props.children}
        </AppContext.Provider >
    )
}

export default AppContextProvider;