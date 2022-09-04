import './css/styles.css'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import { fetchCountries } from './api.js'

const DEBOUNCE_DELAY = 300
const refs = {
    countryInfo: document.querySelector('.country-info'),
    countryInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),

};

refs.countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY))

function onCountryInput() {
    const name = refs.countryInput.value.trim()
    if (name === '') {
        return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '')
    }

    fetchCountries(name)
        .then(countries => {
        refs.countryList.innerHTML = ''
        refs.countryInfo.innerHTML = ''
            if (countries.length === 1) {
        refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
        refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries))
        } else if (countries.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        } else {
        refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
        }
        })
        .catch(Notiflix.Notify.failure('Oops, there is no country with that name'))
}

function renderCountryList(countries) {
    const markup = countries
    .map(({ name, flags }) => {
        return `
            <li>
                <img src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
                <h2>${name.official}</h2>
            </li>
            `
        })
        .join('')
    return markup
}

function renderCountryInfo(countries) {
    const markup = countries
    .map(({ capital, population, languages }) => {
        return `
        <ul>
            <li><p>Capital: ${capital}</p></li>
            <li><p>Population: ${population}</p></li>
            <li><p>Languages: ${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    })
    .join('')
    return markup
}

