import React, { useContext, useState, useEffect, createContext } from 'react';

// Create context
const ColorContext = createContext()
// Helper function outside the component in case it needs to be used externally
const getBackgroundColor = (isDarkTheme) => { return isDarkTheme ? '#000000' : '#ffffff'}

export default function ColorProvider({children}) {
    // Variable that determines and function that sets the dark theme value, to activate CSS
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        // Get the stored theme value from localStorage
        const savedTheme = localStorage.getItem("isDarkTheme")
        // Return boolean
        return savedTheme === "true"
    })
    // Sets the boolean value for theme change
    const toggleTheme = () => {
        // Sets the new value and stores the data in localStorage
        setIsDarkTheme(prevTheme => {
            const newTheme = !prevTheme
            localStorage.setItem("isDarkTheme", newTheme)
            return newTheme
        })
    }
    
    useEffect(() => {
        // Saves the value of the new background color in the variable
        const newBackgroundColor = getBackgroundColor(isDarkTheme)
        document.body.style.backgroundColor = newBackgroundColor
    }, [isDarkTheme]);
    
    return(
        <ColorContext.Provider value={{isDarkTheme, toggleTheme}}>
            {children} 
        </ColorContext.Provider>
    )
}

export function useColor() {
    return useContext(ColorContext)
}
