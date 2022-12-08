import React, { useContext } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
//styles
import '../styles/App.scss';
import { BsSearch } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { SlArrowDown } from 'react-icons/sl'

const AppBody = () => {
    //context
    const
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext);
    //functions
    const
    themeForSearch = ()=> {
        if(darkTheme) return 'searchBox darkElements';
        return 'searchBox lightElements';
    },
    themeForFilter = ()=> {
        if(darkTheme) return 'filter darkElements';
        return 'filter lightElements';
    }
    return (
        <div className='appBody'>
            <div className='menu'>
                <div className={themeForSearch()}>
                    <BsSearch/>
                    <input placeholder='search for a country'/>
                </div>
                <div className={themeForFilter()}>
                    <span>Filter by Region</span>
                    <SlArrowDown/>
                </div>
            </div>
        <h1>Here goes flags</h1>
        </div>
    );
};

export default AppBody;