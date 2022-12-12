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
    console.log(country?.name?.common);
    console.log(country?.population);
    console.log(country?.region);
    console.log(country?.capital[0]);
    console.log(country?.flags.png);
    //functions
    const
    themeForFlag = ()=> {
        if(darkTheme) return 'flag darkElements';
        return 'flag lightElements';
    }
    return (
        <div className={themeForFlag()}>
            <img src={country?.flags.png} alt={country?.name?.common}/>
            <span>Population: {country?.population}</span>
            <span>Region: {country?.region}</span>
            <span>Capital: {country?.capital[0]}</span>
        </div>
    );
};

export default Flag;