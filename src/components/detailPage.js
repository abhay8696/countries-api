import React, { useContext } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
//styles
import '../styles/App.scss';
import { BsArrowLeft } from 'react-icons/bs';

const DetailPage = props => {
    //props
    const { country, toggleDetailPageOFF } = props;
    //context
    const
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext);
    //functions
    const
    themeForPage= ()=> {
        if(darkTheme) return 'detailPage darkElements';
        return 'detailPage lightElements';
    },
    displayBorders = array=> {
        if(!array) return null;
        let arr = [];
        array.forEach(i => {
            arr.push(<span>{i}</span>)
        });
        return arr;
    }

    return (
        <div className={themeForPage()}>
            <div className='detailPageMenu'>
                <div onClick={()=>toggleDetailPageOFF()}>
                    <BsArrowLeft/> <span>Back</span>
                </div>
            </div>
            <div className='detailPageContent'>
                <div className='bigFlag'>
                    <img src={country?.flags?.png} />
                </div>
                <div className='countryDetails'>
                    <div className='countryDetails-name'>
                        {country?.name?.common}
                    </div>
                    <div className='countryDetails-a'>
                        <span>Native Name: {Object.values(country?.name?.nativeName)?.[0]?.common}</span>
                        <span>Population: {country?.population}</span>
                        <span>Region: {country?.region}</span>
                        <span>Sub-region: {country?.subregion}</span>
                        <span>Capital: {country?.capital?.[0]}</span>
                    </div>
                    <div className='countryDetails-b'>
                        <span>Top Level Domain: {country?.tld?.[0]}</span>
                        <span>Currency: {Object.values(country?.currencies)?.[0]?.name}</span>
                        
                        <span>Languages: {Object.values(country?.languages)?.[0]}</span>
                    </div>
                    <div>
                        Borders: <span>{displayBorders(country?.borders)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;