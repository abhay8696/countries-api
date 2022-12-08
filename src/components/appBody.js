import React, { useContext } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
//styles
import '../styles/App.scss';
import { BsSearch } from 'react-icons/bs';

const AppBody = () => {
    //context
    const
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext);
    //functions
    const
    themeFunction = ()=> {
        if(darkTheme) return 'searchBox darkElements';
        return 'searchBox lightElements';
    }
    return (
        <div className='appBody'>
            <div className='menu'>
                <div className={themeFunction()}>
                    <BsSearch/>
                    <input placeholder='search for a country'/>
                </div>
                <select></select>
            </div>
        <h1>Here goes flags</h1>
        </div>
    );
};

export default AppBody;