import React, { useContext, useState } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
//styles
import '../styles/App.scss'
//icons
import { BsSun } from 'react-icons/bs'
import { BsMoonFill } from 'react-icons/bs'

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
            <div onClick={()=> setDarkTheme(!darkTheme)} className='themeButton'>
                {darkTheme ? <><BsSun/><span>Light Mode</span></> : <><BsMoonFill/><span>Dark Mode</span></>}
            </div>
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