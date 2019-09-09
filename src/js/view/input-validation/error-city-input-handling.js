import { destinationCountries } from '../../model/destination-data';

import { inputCity, inputCityErrorContainer } from '../nodes';

import { inputs, getInputObj, DATA_ID_ATTRIBUTE } from './inputs-statuses';

import { errorMessages, nodeErrorClasses } from './error-data';

import { removeChildren } from '../drop-down-menus/country-select-menu';

const wordsPattern = /^[а-яё]+([ -]?[а-яё]+)*$/i;
const spacePattern = /([ -])+/g;
const spaceGroup = '$1';

const { inputErrorBorder, inputErrorMessage } = nodeErrorClasses;
const { wrongSymbolsCity, noCity, enterCity } = errorMessages;

const getActiveCountry = destinationCountries =>
  destinationCountries.find(({ active }) => active);
const fixSpacesAndDashes = value =>
  value.trim().replace(spacePattern, spaceGroup);

const renderErrorMessage = (container, nodeClass, errorMessage) => {
  const div = document.createElement('div');
  div.classList.add(nodeClass);
  div.innerHTML = errorMessage;

  container.appendChild(div);
};

const removeErrorMessage = errorContainer => removeChildren(errorContainer);

const handleFocusOnCityInput = ({ target }) => {
  const inputStatusObj = getInputObj(
    inputs,
    target.getAttribute(DATA_ID_ATTRIBUTE)
  );

  if (!inputStatusObj || !inputStatusObj.dirty) {
    return;
  }

  removeErrorMessage(inputCityErrorContainer);
  target.classList.remove(inputErrorBorder);
};

const cityInputErrorHandling = (activeCountry, errorMessage) => {
  renderErrorMessage(inputCityErrorContainer, inputErrorMessage, errorMessage);
  inputCity.classList.add(inputErrorBorder);
  activeCountry.activeCity = '';
};

const handleBlurOnCityInput = ({ target }) => {
  const inputStatusObj = getInputObj(
    inputs,
    target.getAttribute(DATA_ID_ATTRIBUTE)
  );
  const activeCountry = getActiveCountry(destinationCountries);
  target.value = target.value.trim();

  if (!inputStatusObj || !inputStatusObj.dirty) {
    return;
  }

  if (!target.value) {
    cityInputErrorHandling(activeCountry, enterCity);

    return;
  }

  target.value = fixSpacesAndDashes(target.value);

  if (!wordsPattern.test(target.value)) {
    cityInputErrorHandling(activeCountry, wrongSymbolsCity);

    return;
  }

  const cityInList = activeCountry.cities.find(
    city => city.toUpperCase() === target.value.toUpperCase()
  );

  if (!cityInList) {
    cityInputErrorHandling(activeCountry, noCity);

    return;
  }

  inputCity.value = cityInList;
  activeCountry.activeCity = cityInList;
};

inputCity.addEventListener('blur', handleBlurOnCityInput);
inputCity.addEventListener('focus', handleFocusOnCityInput);

export { renderErrorMessage, removeErrorMessage };
