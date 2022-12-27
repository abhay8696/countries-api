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
import DetailPage from './detailPage';

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
    [menuStyles, setMenuStyles] = useState('menu appearIn'),
    [flagsStyles, setFlagsStyles] = useState('flags appearIn'),
    [dropDown, setDropDown] = useState(false),
    [searchText, setSearchText] = useState(''),
    [filteredCountries, setFilteredCountries] = useState([]),
    [searchedCountry, setSearchedCountry] = useState(null),
    [detailPageData, setDetailPageData] = useState(null);
    //life cycle
    useEffect(()=> {
        const delayDebounceFn = setTimeout(async () => {
            let data;
            if(searchText.length) data = await getCountryInfo(searchText);
            if(!data?.error){
                console.log(data)
                setSearchedCountry(data);
            }else setSearchedCountry(null);
          // Send Axios request here

        }, 1500);
    
        return () => clearTimeout(delayDebounceFn)
    }, [searchText])
    //functions
    const
    appBodyStylesFunc = disappear=> {
        if(disappear) setMenuStyles('menu slideBehind');
        else setMenuStyles('menu');
    },
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
                <div className='dropDownItem' onClick={()=> setFilteredCountries([])}>Reset</div>
            </div>
        )
    },
    loadingAllCountries = ()=> {
        let arr = [];
        for(let i=0; i<8; i++){
            arr.push(<Flag loading={true}/>)
        }
        return arr;
    },
    displayFlags = ()=> {
        const arr = [];
        if(searchedCountry){
            arr.push(<Flag country={searchedCountry} toggleDetailPageON={toggleDetailPageON} slideFront_Behind={slideFront_Behind}/>)
        }else if(filteredCountries.length){
            filteredCountries.map(country=> {
                arr.push(<Flag country={country} toggleDetailPageON={toggleDetailPageON} slideFront_Behind={slideFront_Behind}/>)
            })
        }else{
            homePageCountries?.map(country=> {
                arr.push(<Flag country={country} toggleDetailPageON={toggleDetailPageON} slideFront_Behind={slideFront_Behind}/>)
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
    },
    toggleDetailPageON = data=> {
        setDetailPageData(data);
    },
    toggleDetailPageOFF = ()=> {
        const tm = setTimeout(() => {
            setDetailPageData(null)
        }, 500);

        return tm;
    },
    displayDetailPage = ()=> {
        if(detailPageData) return <DetailPage country={detailPageData} toggleDetailPageOFF={toggleDetailPageOFF} toggleDetailPageON={toggleDetailPageON} slideFront_Behind={slideFront_Behind}/>
    },
    slideFront_Behind = type=> {
        console.log(type);
        if(type === 'behind'){
            setMenuStyles('menu slideBehind');
            setFlagsStyles('flags slideBehind')
        }
        if(type === 'front'){
            setMenuStyles('menu slideFront');
            setFlagsStyles('flags slideFront')
        }
    }
    return (
        <div className='appBody'>
            <div className={menuStyles}>
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
            <div className={flagsStyles}>
                {!countriesArray ? loadingAllCountries() : displayFlags()}
            </div>
            {displayDetailPage()}
        </div>
    );
};

export default AppBody;