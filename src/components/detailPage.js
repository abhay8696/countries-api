import React, { useContext } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
import { AllCountriesContext } from '../context/allCountriesContext';
//styles
import '../styles/App.scss';
import { BsArrowLeft } from 'react-icons/bs';
import { getBorderCountries } from '../functions/otherFunctions';

const DetailPage = props => {
    //props
    const { country, toggleDetailPageOFF, toggleDetailPageON } = props;
    //context
    const
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext),
    [countriesArray, setCountriesArray] = useContext(AllCountriesContext);
    //functions
    const
    themeForPage= ()=> {
        if(darkTheme) return 'detailPage darkElements';
        return 'detailPage lightElements';
    },
    displayBorders = array=> {
        if(!array) return null;
        console.log(country)
        // console.log(getBorderCountries(array, countriesArray));
        let borderCountries = getBorderCountries(array, countriesArray);
        let arr = [];
        borderCountries.forEach(i => {
            arr.push(
                <span className='detailPageButton borderButton' onClick={()=> toggleDetailPageON(i)}>
                    {i?.name?.common}
                </span>)
        });
        return arr;
    }

    return (
        <div className={themeForPage()}>
            <div className='detailPageMenu'>
                <div onClick={()=>toggleDetailPageOFF()} className='detailPageButton'>
                    <BsArrowLeft/> <span>Back</span>
                </div>
            </div>
            <div className='detailPageContent'>
                <img src={country?.flags?.png} />
                <div className='countryDetails'>
                    <h1 className='countryDetails-name'>
                        {country?.name?.common}
                    </h1>
                    <div className='countryDetails-main'>
                        <div className='countryDetails-a'>
                            <span className='detailPair'>
                                <span className='detailKey'>Native Name:</span>
                                <span className='detailValue'>{Object.values(country?.name?.nativeName)?.[0]?.common}</span>
                            </span>
                            <span className='detailPair'>
                                <span className='detailKey'>Population:</span> 
                                <span className='detailValue'>{country?.population}</span>
                            </span>
                            <span className='detailPair'>
                                <span className='detailKey'>Region:</span> 
                                <span className='detailValue'>{country?.region}</span>
                            </span>
                            <span className='detailPair'>
                                <span className='detailKey'>Sub-region:</span> 
                                <span className='detailValue'>{country?.subregion}</span>
                            </span>
                            <span className='detailPair'>
                                <span className='detailKey'>Capital:</span> 
                                <span className='detailValue'>{country?.capital?.[0]}</span>
                            </span>
                        </div>
                        <div className='countryDetails-b'>
                            <span className='detailPair'>
                                <span className='detailKey'>Top Level Domain:</span>
                                <span className='detailValue'>{country?.tld?.[0]}</span>
                            </span>
                            <span className='detailPair'>
                                <span className='detailKey'>Currency:</span> 
                                <span className='detailValue'>{Object.values(country?.currencies)?.[0]?.name}</span>
                            </span>
                            
                            <span className='detailPair'>
                                <span className='detailKey'>Languages:</span> 
                                <span className='detailValue'>{Object.values(country?.languages)?.[0]}</span>
                            </span>
                        </div>
                    </div>
                    <div className='bordersDiv'>
                        <span className='detailKey'>Borders:</span> 
                        <span className='borderButtonsDiv'>{displayBorders(country?.borders)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;