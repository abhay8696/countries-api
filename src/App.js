import { useEffect, useState } from 'react';
//dependecies
import axios from 'axios';
//context
import { DarkThemeContext } from './context/darkThemeContext';
import { AllCountriesContext } from './context/allCountriesContext';
//functions
import { getAllCountries, getCountryInfo } from './functions/axiosFunctions';
import { filterCountries } from './functions/otherFunctions';
//styles
import './styles/App.css';
import Navbar from './components/navbar';
import AppBody from './components/appBody';

function App() {

  const 
  [countriesArray, setCountriesArray] = useState(),
  [homePageCountries, setHomePageCountries] = useState([]),
  [darkTheme, setDarkTheme] = useState(true);
  //variables
  const displayCountries = ['GER', 'USA', 'GBR', 'KOR', 'SWE', 'JPN', 'IND', 'NOR'];

  useEffect(()=> {
    fetchCountries();
  }, []);
  useEffect(()=> {
    if(countriesArray){
      console.log('inside useEffect');
      setHomePageCountries(filterCountries(countriesArray, displayCountries));
    }
  }, [countriesArray])
  //functions
  const
  fetchCountries = async ()=> {
    const data = await getAllCountries();
    setCountriesArray(data);
  },
  themFunction = ()=> {
    if(darkTheme) return "App darkApp";
    return "App lightApp"
  }

  return (
    <DarkThemeContext.Provider value={[darkTheme, setDarkTheme]}>
    <AllCountriesContext.Provider value={[countriesArray, setCountriesArray]}>
    <div className={themFunction()}>
      <Navbar/>
      <AppBody homePageCountries={homePageCountries}/>
    </div>
    </AllCountriesContext.Provider>
    </DarkThemeContext.Provider>
  );
}

export default App;

