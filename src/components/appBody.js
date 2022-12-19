import React, { useContext, useState } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
//styles
import '../styles/App.scss';
import { BsSearch } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { SlArrowDown } from 'react-icons/sl'
import Flag from './flag';

const AppBody = (props) => {
    //props
    const { countriesArray } = props;
    //context
    const
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext);
    //states
    const 
    [dropDown, setDropDown] = useState(false);
    //functions
    const
    themeForSearch = ()=> {
        if(darkTheme) return 'searchBox darkElements';
        return 'searchBox lightElements';
    },
    themeForFilter = ()=> {
        if(darkTheme) return 'filter darkElements';
        return 'filter lightElements';
    },
    themeForDropDown = ()=> {
        if(darkTheme) return 'dropDown darkElements';
        return 'dropDown lightElements';
    },
    displayDropDown = ()=> {
        if(dropDown) return(
            <div className={themeForDropDown()}>
                <div className='dropDownItem'>Africa</div>
                <div className='dropDownItem'>America</div>
                <div className='dropDownItem'>Asia</div>
                <div className='dropDownItem'>Europe</div>
                <div className='dropDownItem'>Oceania</div>
            </div>
        )
    },
    displayFlags = ()=> {
        const arr = [];
        countriesArray.map(country=> {
            arr.push(<Flag country={country}/>)
        })
        return arr;
    }
    return (
        <div className='appBody'>
            <div className='menu'>
                <div className={themeForSearch()}>
                    <BsSearch/>
                    <input placeholder='search for a country'/>
                </div>
                <div className={themeForFilter()} onClick={()=> setDropDown(!dropDown)}>
                    <span>Filter by Region</span>
                    <SlArrowDown/>
                    {displayDropDown()}
                </div>
            </div>
            <div className='flags'>
                {countriesArray && displayFlags()}
            </div>
        </div>
    );
};

export default AppBody;