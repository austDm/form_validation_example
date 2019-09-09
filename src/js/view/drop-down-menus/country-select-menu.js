import { destinationCountries } from '../../model/destination-data';

import {
  inputCountry,
  inputCity,
  countryMenuList,
  inputCityErrorContainer,
  inputCityLabel,
} from '../nodes';

import { nodeErrorClasses } from '../input-validation/error-data';

import {
  inputs,
  setCleanInput,
  DATA_ID_ATTRIBUTE,
} from '../input-validation/inputs-statuses';

const NO_INNER_HTML = '';
const NO_BORDER_CLASS = 'no-border';
const CITY_LABEL_INNER_HTML = 'Ваш город';
const NO_CITY_CHOICE_MESSAGE = 'Доставка осуществляется в город ';

const { inputErrorBorder } = nodeErrorClasses;

destinationCountries.forEach(
  ({ active, countryName }) => active && (inputCountry.value = countryName)
);

const removeChildren = parent => (parent.innerHTML = NO_INNER_HTML);

const renderCountrySelectMenu = () => {
  destinationCountries.forEach(({ countryName }) => {
    const li = document.createElement('li');

    li.classList.add('.form__country-select-option');
    li.innerHTML = countryName;

    countryMenuList.appendChild(li);
  });
};

const renderCitiesField = ({ cities, activeCity }) => {
  if (cities) {
    inputCity.classList.remove(NO_BORDER_CLASS);
    inputCity.removeAttribute('disabled');
    inputCityLabel.innerHTML = CITY_LABEL_INNER_HTML;
    inputCity.value = activeCity;
  } else {
    inputCity.setAttribute('disabled', 'true');
    inputCity.classList.add(NO_BORDER_CLASS);
    removeChildren(inputCityLabel);
    inputCity.value = `${NO_CITY_CHOICE_MESSAGE}${activeCity}.`;
  }
};

const selectCountryAndHandleCitiesField = selectedCountryName => {
  destinationCountries.forEach(country => {
    country.active = false;

    if (selectedCountryName === country.countryName) {
      country.active = true;

      setCleanInput(inputs, inputCity.getAttribute(DATA_ID_ATTRIBUTE));
      inputCity.classList.remove(inputErrorBorder);
      removeChildren(inputCityErrorContainer);
      renderCitiesField(country);
    }
  });
};

const countryFieldClickHandler = ({ target }) => {
  if (
    target.closest('.form__country-container') &&
    !target.closest('.form__country-select-list') &&
    !target.closest('.form__country-label')
  ) {
    selectCountryAndHandleCitiesField(inputCountry.value);
    removeChildren(countryMenuList);
    renderCountrySelectMenu();

    return;
  }

  if (target.closest('.form__country-select-list')) {
    inputCountry.value = target.innerHTML;

    selectCountryAndHandleCitiesField(target.innerHTML);
  }

  removeChildren(countryMenuList);
};

window.addEventListener('mousedown', countryFieldClickHandler);

export { removeChildren };
