import { destinationCountries } from '../../model/destination-data';

import { inputCity, citySelectList } from '../nodes';

import { removeChildren } from './country-select-menu';

const CITIES_LIST_LENGTH = 3;

const getActiveCountry = () =>
  destinationCountries.find(({ active }) => active);

const getSuitableCities = (inputString, cities) => {
  const suitableCities = [];

  cities.forEach(city => {
    if (suitableCities.length === CITIES_LIST_LENGTH) {
      return;
    }

    city.toUpperCase().startsWith(inputString.toUpperCase()) &&
      suitableCities.push(city);
  });

  return suitableCities;
};

const renderCitySelectList = cities => {
  cities.forEach(city => {
    const li = document.createElement('li');

    li.classList.add('form__city-select-option');
    li.innerHTML = city;

    citySelectList.appendChild(li);
  });
};

const cityFieldInputHandler = () => {
  const { cities } = getActiveCountry();
  const { value } = inputCity;

  removeChildren(citySelectList);

  if (!value) {
    return;
  }

  renderCitySelectList(getSuitableCities(value, cities));
};

inputCity.addEventListener('input', cityFieldInputHandler);

const handleMouseDownOnCitySelectMenu = ({ target }) => {
  removeChildren(citySelectList);

  if (target.closest('.form__city-select-option')) {
    const { innerHTML } = target;

    getActiveCountry().activeCity = innerHTML;
    inputCity.value = innerHTML;
    inputCity.focus();
  }
};

window.addEventListener('mousedown', handleMouseDownOnCitySelectMenu);
