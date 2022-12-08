import { useEffect, useState, useContext } from 'react';
//dependecies
import axios from 'axios';
//styles
import './styles/App.css';
import Navbar from './components/navbar';
import { DarkThemeContext } from './context/darkThemeContext';
import AppBody from './components/appBody';

function App() {

  const 
  [countriesArray, setCountriesArray] = useState(),
  [darkTheme, setDarkTheme] = useState(true);

  useEffect(()=> {
    getCountries();
  }, [])
  //functions
  const
  getCountries = ()=> {
    axios.get('https://restcountries.com/v3.1/all')
    .then(function (response) {
      setCountriesArray(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  themFunction = ()=> {
    if(darkTheme) return "App darkApp";
    return "App lightApp"
  }

  return (
    <DarkThemeContext.Provider value={[darkTheme, setDarkTheme]}>
    <div className={themFunction()}>
      <Navbar/>
      <AppBody/>
    </div>
    </DarkThemeContext.Provider>
  );
}

export default App;
