import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({children}) =>{
    const [darkMode,SetDarkMode] = useState(()=>{
     const saveMode = localStorage.getItem("darkmode");
     return saveMode? JSON.parse(saveMode):false
    })

    useEffect(()=>{
        localStorage.setItem("DarkMode",JSON.stringify(darkMode))
        if (darkMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }, [darkMode]);


    const toggledarkMode = () =>{
        SetDarkMode(prevMode => !prevMode) 
        console.log("toggled button clicked!!")
    }    

    return(
    <DarkModeContext.Provider value={{darkMode,SetDarkMode,toggledarkMode}}>
        {children}
    </DarkModeContext.Provider>
    )
};

export const useTheme = () => useContext(DarkModeContext);