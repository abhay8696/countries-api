import React, { useContext, useEffect, useState } from 'react';
//context
import { DarkThemeContext } from '../context/darkThemeContext';
import { AllCountriesContext } from '../context/allCountriesContext';
//functions
import { getCountryInfo, getRegionInfo } from '../functions/axiosFunctions';
import { filterByRegion } from '../functions/otherFunctions';
//styles
import '../styles/App.scss';
import { BsSearch } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { SlArrowDown } from 'react-icons/sl'
import Flag from './flag';

const AppBody = (props) => {
    //props
    const { homePageCountries } = props;
    //variables
    const regionArr = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    //context
    const
    [darkTheme, setDarkTheme] = useContext(DarkThemeContext),
    [countriesArray, setCountriesArray] = useContext(AllCountriesContext);
    //states
    const 
    [dropDown, setDropDown] = useState(false),
    [searchText, setSearchText] = useState(''),
    [filteredCountries, setFilteredCountries] = useState();
    //life cycle
    useEffect(()=> {
        const delayDebounceFn = setTimeout(async () => {
            if(searchText.length) console.log(await getCountryInfo(searchText));
          // Send Axios request here

        }, 1500);
    
        return () => clearTimeout(delayDebounceFn)
    }, [searchText])
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
                {returnRegions()}
            </div>
        )
    },
    displayFlags = ()=> {
        const arr = [];
        if(filteredCountries){
            filteredCountries.map(country=> {
                arr.push(<Flag country={country}/>)
            })
        }else{
            homePageCountries?.map(country=> {
                arr.push(<Flag country={country}/>)
            })
        }
        
        return arr;
    },
    handleRegion = async region=> {
        const data = filterByRegion(countriesArray,region)
        if(data) setFilteredCountries(data);
    },
    returnRegions = ()=> {
        const arr = [];

        regionArr.forEach(i=> {
            arr.push(
                <div className='dropDownItem' onClick={()=> handleRegion(i)}>{i}</div>
            )
        })

        return arr;
    }
    return (
        <div className='appBody'>
            <div className='menu'>
                <div className={themeForSearch()}>
                    <BsSearch/>
                    <input 
                        placeholder='search for a country' 
                        autoComplete='off'
                        onChange={evt=> setSearchText(evt.target.value)}
                    />
                </div>
                <div className={themeForFilter()} onClick={()=> setDropDown(!dropDown)}>
                    <span>Filter by Region</span>
                    <SlArrowDown/>
                    {displayDropDown()}
                </div>
            </div>
            <div className='flags'>
                {displayFlags()}
            </div>
        </div>
    );
};

export default AppBody;