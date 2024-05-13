export const addCard = (country, info) => {
    console.log('addCard:', country, info);
    const container = document.getElementById('content');

    const card = document.createElement('div');
    card.classList.add('card');

    container.appendChild(card);
}