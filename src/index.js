import './css/styles.css';
import API from'./api';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    cardsContainer: document.querySelector('.country-info'),
    serchForm:  document.querySelector('#search-box'),
};
 
refs.serchForm.addEventListener(
    'input',
    debounce(onSerch, DEBOUNCE_DELAY)
);


function onSerch(e) {
    e.preventDefault();
    //const search = e.target.value.trim();
   
    const name = e.target.value;

    API.fetchCountries(name)
    .then(renderCountryCard)
    .catch(error => console.log(error))
       // .finally(() => form.reset())
        ;
}




     
function renderCountryCard(country) {
    const markup = '<h2>${name}</h2>';
    refs.cardsContainer.innerHTML = markup;
}
