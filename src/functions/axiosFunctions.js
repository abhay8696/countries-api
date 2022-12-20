import axios from "axios"

export const getAllCountries = async ()=> {
  const data = await axios.get('https://restcountries.com/v3.1/all')
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error;
  })
  return data;
}

export const getCountryInfo = async name=> {
  const val = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
    .then(response=> {
      return(response?.data?.[0]);
    })
    .catch(function (error) {
      return({error:error});
    })
    return val
}

export const getRegionInfo = async region=> {
  const val = await axios.get(`https://restcountries.com/v3.1/region/${region}`)
    .then(response=> {
      return(response?.data?.[0]);
    })
    .catch(function (error) {
      return(error);
    })
    return val
}