
export const filterCountries = (allCountries, someCountries)=> {
    const resultArray = [];
    for(let i=0; i<allCountries.length; i++){
        if(!someCountries.length) break;
        for(let j=0; j<someCountries.length; j++){
            if(allCountries[i].cioc === someCountries[j]){
                resultArray.push(allCountries[i]);
                const index = someCountries.indexOf(j);
                someCountries.splice(index, 1);
            }
        }
    }
    return resultArray;
}

export const filterByRegion = (allCountries, region)=> {
    const arr = []
    allCountries.map(i=> i.region === region ? arr.push(i) : null);
    return arr;
}

export const getBorderCountries = (array, allCountries)=> {
    let arr = [...array], countries = [...allCountries];
    let borderCounriesData = [];
    while(arr.length){
        let temp = arr.shift();
        countries.forEach(i => {
            if(temp === i.cioc){
                borderCounriesData.push(i);
                let index = countries.indexOf(i);
                if(index > -1) countries.splice(index, 1);
            }
        });
    }
    return borderCounriesData;
}