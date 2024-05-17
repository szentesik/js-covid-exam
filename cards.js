import Chart from 'chart.js/auto';

let uid = 1;

export const addCard = (country, info, showCharts) => {
    console.log('addCard:', country, info);
    const container = document.getElementById('cards-container');   
    container.insertAdjacentHTML('beforeend', `
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
            ${showCharts ?
            `<div id="charts">
                ${'confirmed' in info ?  
                `<div class="chart-container"><canvas class="chart" id="mortality-chart-${uid}"></canvas></div>` : ''
                }
                ${'administered' in info ?  
                `<div class="chart-container"><canvas class="chart" id="vaccination-chart-${uid}"></canvas></div>` : ''
                } 
            </div>` : ''
            }
        <div>
    `); 

    if(showCharts && 'confirmed' in info) {
        renderMortalityChart(info, uid);
    }
    
    if(showCharts && 'administered' in info) {
        renderVaccinationChart(info, uid);
    }

    document.querySelector(`#remove-card-${uid}`)
        .addEventListener('click', e => e.target.closest('.card').remove());

    const newCard = document.querySelector(`#card-${uid}`);    
    setTimeout(() => newCard.scrollIntoView({behavior: "smooth"}), 60);     // Async call is required to make scrollIntoView with smooth behavor to align the item to top properly on chromium based browsers
    
    uid++;    
}

const renderMortalityChart = (info, uid) => {     
    const ctx = document.getElementById(`mortality-chart-${uid}`);
    new Chart(ctx, {
        type: 'pie',
        data: {            
            labels: ['Confirmed', 'Recovered', 'Deaths'],
            datasets: [{
            label: '# of Cases',
            data: [info.confirmed, info.recovered, info.deaths],
            borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Cases'
                },
                legend: {
                    position: 'right'
                }
            }
        }        
    });    
}

const renderVaccinationChart = (info, uid) => {    
    const ctx = document.getElementById(`vaccination-chart-${uid}`);
    new Chart(ctx, {
        type: 'pie',
        data: {            
            labels: ['Not vaccinated', 'Vaccinated'],
            datasets: [{
            label: '# of Person',
            data: [info.population - info.vaccinated, info.vaccinated],
            borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Vaccination'
                },
                legend: {
                    position: 'right'
                }
            }
        }        
    });    
}