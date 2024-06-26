import { addCard } from "./cards";
import { queryCases, queryVaccination } from "./covid-api";
import { autocomplete } from "./autocomplete";

const countries = [ "Hungary", "France", "Slovakia", "Slovenia", "Austria", "Romania"];

export const initForm = () => {
    const searchForm = document.getElementById('search');
    searchForm.addEventListener('submit', onSubmit);

    // Reset invalidity if appropriate element changed
    const country = document.getElementById('country');
    const showCases = document.getElementById('cases');    
    country.addEventListener('input', _ => country.setCustomValidity(''));
    document.querySelectorAll('#filters input')
    .forEach( el => el.addEventListener('change', _ => showCases.setCustomValidity('')));

    autocomplete(document.getElementById("country"), countries);
}

// Check validity and gather search parameters from the form
const checkAndGetInput = () => {
    let input = {};

    const country = document.getElementById('country');
    const showCases = document.getElementById('cases');
    const showVaccination = document.getElementById('vaccinated');
    const showCharts = document.getElementById('charts');

    if(!country.value) {        
        console.error('checkAndGetInput:', 'No country selected!');
        country.setCustomValidity("Please select a country!");
        country.reportValidity();        
        return undefined;
    }

    country.setCustomValidity("");

    input = {
        country: country.value
    };

    if(!showCases.checked && !showVaccination.checked) {
        console.error('checkAndGetInput:', 'None of the checkboxes checked!');
        showCases.setCustomValidity("Please select at least one information to show!");
        showCases.reportValidity();        
        return undefined;
    }

    showCases.setCustomValidity("");

    input = {
        ...input,
        showCases: showCases.checked,
        showVaccination: showVaccination.checked,
        showCharts: showCharts.checked
    };

    return input;
}

const onSubmit = async e => {
    e.preventDefault();
    console.log('submit pressed');
    const input = checkAndGetInput();
    if(!input) {
        return;
    }
    
    console.log('validity passed');
    const submitBtn = document.getElementById('submit');
    const loadingIndicator = document.getElementById('loading-indicator');
    submitBtn.disabled = true;
    loadingIndicator.style.display = 'inline-block';

    let requests = [];    
    
    if(input.showCases) {
        requests.push(queryCases(input.country));
    }

    if(input.showVaccination) {
        requests.push(queryVaccination(input.country));        
    }   

    try {        
        const responses = await Promise.all(requests);
        //console.log('responses:', responses);                
        let info = {};
        responses.forEach(resp => info = {...info, ...resp});
        //console.log('merged:', info);
        try {
            addCard(input.country, info, input.showCharts);
        }
        catch (error) {
            console.error('Rendering failed:', error);
            showError(`Rendering data failed: ${error.message}`);
        }
        
    } catch (error) {
        console.error('Retreving data failed:', error);
        showError(`Retreving data failed: ${error.message}`);
    } finally {
        submitBtn.disabled = false;
        loadingIndicator.style.display = 'none';
        e.target.reset();
    }
}

const showError = error => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
    errorMessage.innerText = error;
    setTimeout(() => errorMessage.style.display = 'none', 5500);
}

