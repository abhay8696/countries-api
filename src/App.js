import { useEffect, useState } from 'react';
//dependecies
import axios from 'axios';
//styles
import './App.css';

function App() {

  const 
  [countriesArray, setCountriesArray] = useState();

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
  }
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
