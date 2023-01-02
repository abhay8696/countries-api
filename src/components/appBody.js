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
import { MdAutorenew } from 'react-icons/md'
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
    [menuStyles, setMenuStyles] = useState('menu appearUp'),
    [flagsStyles, setFlagsStyles] = useState('flags'),
    [dropDown, setDropDown] = useState(false),
    [searchText, setSearchText] = useState(''),
    [currentRegion, setCurrentRegion] = useState('Filter by Region'),
    [filteredCountries, setFilteredCountries] = useState([]),
    [searchedCountry, setSearchedCountry] = useState(null),
    [detailPageData, setDetailPageData] = useState(null),
    [searchLoad, setSearchLoad] = useState(false);
    //life cycle
    useEffect(()=> {
        setSearchLoad(true);
        const delayDebounceFn = setTimeout(async () => {
            let data;
            if(searchText.length) data = await getCountryInfo(searchText);
            if(!data?.error){
                console.log(data)
                setSearchedCountry(data);
            }else setSearchedCountry(null);
          // Send Axios request here
            setSearchLoad(false);
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
        let str = 'slideDown';
        if(darkTheme) return str = str.concat(' dropDown darkElements');
        return str = str.concat(' dropDown lightElements');
    },
    displayDropDown = ()=> {
        if(dropDown) return(
            <div className='filterOptionDiv' onClick={()=> setDropDown(false)}>
            <div className={themeForDropDown()}>
                {returnRegions()}
                <div className='dropDownItem' onClick={()=> handleRegion(undefined)}>Reset</div>
            </div>
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
            arr.push(
            <Flag 
                country={searchedCountry} 
                toggleDetailPageON={toggleDetailPageON} 
                slideFront_Behind={slideFront_Behind}
                searchLoad={searchLoad}
                clearSearchText={clearSearchText}
            />)
        }else if(filteredCountries.length){
            filteredCountries.map(country=> {
                arr.push(
                <Flag 
                    country={country} 
                    toggleDetailPageON={toggleDetailPageON} 
                    slideFront_Behind={slideFront_Behind}
                    searchLoad={searchLoad}
                    clearSearchText={clearSearchText}
                />)
            })
        }else{
            homePageCountries?.map(country=> {
                arr.push(
                <Flag 
                    country={country} 
                    toggleDetailPageON={toggleDetailPageON} 
                    slideFront_Behind={slideFront_Behind}
                    searchLoad={searchLoad}
                    clearSearchText={clearSearchText}
                />)
            })
        }
        
        return arr;
    },
    handleRegion = async region=> {
        setSearchText('');
        if(region){
            const data = filterByRegion(countriesArray,region)
            if(data) setFilteredCountries(data);
            setCurrentRegion(`${region}`);
        }
        else{
            setFilteredCountries([])
            setCurrentRegion('Filter by Region');
        }
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
    },
    clearSearchText = ()=> setSearchText('');
    return (
        <div className='appBody'>
            <div className={menuStyles}>
                <div className={themeForSearch()}>
                    {searchLoad ? 
                    <span className='searchLoad searchIcon'>
                    <MdAutorenew/>
                    </span> 
                    : 
                    <span className='searchIcon'>
                    <BsSearch/>
                    </span>}
                    
                    <input 
                        placeholder='search for a country' 
                        autoComplete='off'
                        onChange={evt=> setSearchText(evt.target.value)}
                        value={searchText}
                    />
                </div>
                <div className={themeForFilter()} onClick={()=> setDropDown(!dropDown)}>
                    <span>{currentRegion}</span>
                    <SlArrowDown/>
                </div>
            </div>
            <div className={flagsStyles}>
                {!countriesArray ? loadingAllCountries() : displayFlags()}
            </div>
            {displayDetailPage()}
            {displayDropDown()}
        </div>
    );
};

export default AppBody;