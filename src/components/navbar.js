import React, { useContext, useState } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
//styles
import '../styles/App.scss'

const Navbar = () => {
    //context
    const 
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext);
    //states
    const
    [bgColor, setBgColor] = useState()
    //functions
    const
    displayThemeButton = ()=> {

        return (
            <button onClick={()=> setDarkTheme(!darkTheme)}>
                {darkTheme ? <span>Light Mode</span> : <span>Dark Mode</span>}
            </button>
        )
    },
    themeFunction = ()=> {
      if(darkTheme) return "navbar darkElements";
      return "navbar lightElements"
    }

    return (
        <div className={themeFunction()}>
            <h1>Where In The World? </h1>
            {displayThemeButton()}
        </div>
    );
};

export default Navbar;