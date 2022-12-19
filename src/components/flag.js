import React, { useContext } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
//styles
import '../styles/App.scss';

const Flag = props => {
    //props
    const { country } = props;
    //context
    const
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext);
    //functions
    const
    themeForFlag = ()=> {
        if(darkTheme) return 'flag darkElements';
        return 'flag lightElements';
    }
    return (
        <div className={themeForFlag()}>
            <img src={country?.flags.png} alt={country?.name?.common}/>
            <span className='flagName'>{country?.name?.common}</span>
            <span className='flagData'>Population: <span className='flagDataInfo'>{country?.population}</span></span>
            <span className='flagData'>Region: <span className='flagDataInfo'>{country?.region}</span></span>
            <span className='flagData'>Capital: <span className='flagDataInfo'>{country?.capital?.[0]}</span></span>
        </div>
    );
};

export default Flag;