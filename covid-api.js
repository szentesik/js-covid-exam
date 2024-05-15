
const apiUrl = 'https://europe-central2-webuni-js-covid-exam.cloudfunctions.net';

export const queryCases = async country => {
    const response = await fetch(`${apiUrl}/cases?country=${country}`);
    if (!response.ok) {        
        throw new Error(`Location '${country}' not found!`);
    }

    const body = await response.json();

    //console.log('raw case data:', body);

    const result = {
        country: body.country,
        population: body.population,
        confirmed: body.confirmed,
        recovered: body.recovered,
        deaths: body.deaths,
        //updated: Date.parse(body.updated)
        updated: body.updated
    }

    //console.log('case result:', result);

    return result;   
}

export const queryVaccination = async country => {
    const response = await fetch(`${apiUrl}/vaccines?country=${country}`);
    if (!response.ok) {        
        throw new Error(`Location '${country}' not found!`);
    }

    const body = await response.json();

    //console.log('raw vaccination data:', body);

    const result = {
        country: body.country,
        population: body.population,
        administered: body.administered,
        vaccinated: body.people_vaccinated,        
        //updated: Date.parse(body.updated)
        updated: body.updated
    }

    //console.log('vaccination result:', result);

    return result;  
}