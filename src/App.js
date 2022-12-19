import { useEffect, useState } from 'react';
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
  [countriesArray2, setCountriesArray2] = useState([]),
  [darkTheme, setDarkTheme] = useState(true);
  //variables
  const displayCountries = ['germany', 'united states of america', 'brazil', 'iceland', 'afghanistan', 'sweden', 'albania', 'algeria'];

  useEffect(()=> {
    getCountries();
    setCountriesArray2(getCountries2(displayCountries, []));
  }, []);
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
  getCountries2 = (arr=[], resultArr=[])=> {
    //if !arr.length return resultArr
    //call axios func with arr.shift() as parameter
    //.then push data in result arr
    //.then recurse(arr, resultArr)
    if(!arr.length) {
      setCountriesArray2(resultArr);
      return resultArr;
    }
    const temp = arr.shift();
    // console.log(`getting country data of ${temp}`)
    
    axios.get(`https://restcountries.com/v3.1/name/${temp}`)
    .then(response=> {
      console.log(response?.data?.[0]);
      resultArr.push(response?.data?.[0]);
      getCountries2(arr, resultArr);
    })
    .catch(function (error) {
      console.log(error);
      console.log(`found error at ${temp} country`);
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
      <AppBody countriesArray={countriesArray2}/>
    </div>
    </DarkThemeContext.Provider>
  );
}

export default App;




// axios.get(`https://restcountries.com/v3.1/name/${displayCountries.shift()}`)
// .then(function (response) {
//   console.log(response?.data?.[0]);
//   arr.push(response?.data?.[0]);
//   setCountriesArray2(arr)
// })
// .catch(function (error) {
//   console.log(error);
// })