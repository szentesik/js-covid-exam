let uid = 1;

export const addCard = (country, info) => {
    console.log('addCard:', country, info);
    const container = document.getElementById('cards-container');   
    container.insertAdjacentHTML('afterbegin', `
        <div class="card" id="card-${uid}">
            <button class="close-button" id="remove-card-${uid}">&#x2716;</button>
            <h1 class="card-title">${country}</h1>
            <ul>
                <li><span class="card-data-title">Population: </span><span class="card-data-value">${info.population}</span></li>
                ${'confirmed' in info ? 
                    `<li><span class="card-data-title">Confirmed: </span><span class="card-data-value">${info.confirmed}</span></li>` : ''
                }
                ${'recovered' in info ? 
                    `<li><span class="card-data-title">Recovered: </span><span class="card-data-value">${info.recovered ? info.recovered : 'N/A'}</span></li>` : ''
                }
                ${'deaths' in info ? 
                    `<li><span class="card-data-title">Deaths: </span><span class="card-data-value">${info.deaths ? info.deaths : 'N/A'}</span></li>` : ''
                }
                ${'administered' in info ? 
                    `<li><span class="card-data-title">Administered for vaccination: </span><span class="card-data-value">${info.administered}</span></li>` : ''
                }
                ${'vaccinated' in info ? 
                    `<li><span class="card-data-title">Vaccinated: </span><span class="card-data-value">${info.vaccinated}</span></li>` : ''
                }
                <li><span class="card-data-title">Updated: </span><span class="card-data-value">${info.updated}</span></li>
            </ul>
        <div>
    `); 

    document.querySelector(`#remove-card-${uid}`)
        .addEventListener('click', e => e.target.closest('.card').remove());

    uid++;    
}