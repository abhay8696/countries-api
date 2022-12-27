import React, { useContext, useState } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
//functions
import { getCountryInfo } from '../functions/axiosFunctions';
//styles
import '../styles/App.scss';

const Flag = props => {
    //props
    const { country, toggleDetailPageON, loading, slideFront_Behind } = props;
    //context
    const
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext);
    //functions
    const
    themeForFlag = ()=> {
        let str = 'flag appearUp';
        if(darkTheme) str = str.concat(' darkElements');
        else str = str.concat(' lightElements');
        return str;
    },
    getFlagInfo = async data=> {
        console.log(data);
        slideFront_Behind('behind');
        toggleDetailPageON(data);
    },
    loadingDiv = ()=> {
        return(
            <div className={`${themeForFlag()} dummyFlag`}>
                <div className='dummyImg'></div>
                <span className='flagName'>Fetching...</span>
                <span className='flagData'>Please Wait </span>
                <span className='flagData'></span>
                <span className='flagData'></span>
            </div>
        )
    }

    if(loading) return loadingDiv();

    return (
        <div className={themeForFlag()} onClick={()=>getFlagInfo(country)}>
            <img src={country?.flags?.png} alt={country?.name?.common}/>
            <span className='flagName'>{country?.name?.common}</span>
            <span className='flagData'>Population: <span className='flagDataInfo'>{country?.population}</span></span>
            <span className='flagData'>Region: <span className='flagDataInfo'>{country?.region}</span></span>
            <span className='flagData'>Capital: <span className='flagDataInfo'>{country?.capital?.[0]}</span></span>
        </div>
    );
};

export default Flag;