
export const filterCountries = (allCountries, someCountries)=> {
    //  let resultArray
    //  enter allCountries loop 'i'
    //    if someCountries.length=0 break loop and return
    //    enter loop of someCountries 'j'
    //      if(i.cioc === j) push i in resultArray and delete j from someCountries
    console.log('inside homePageFlages');
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