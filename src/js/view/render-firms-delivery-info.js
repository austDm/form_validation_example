import { DunkanObj, AnnMariaObj } from '../model/delivery-firms-class';

import { getPrice } from '../model/calculate-price';

import { destinationCountries } from '../model/destination-data';

import deliveryFirmComponent from './delivery-firm-component';

import {
  form,
  weightInput,
  lengthInput,
  widthInput,
  heightInput,
  sizeInputViewCheckBox,
  priceCalculationContainers,
  inputCity,
  inputCountry,
} from './nodes';

import { currency, weightUnits, sizeUnits } from '../model/calculation-data';

const ERROR_MSG = {
  error: 'Введите данные!'
};
const DURATION_MSG = 'дней';

const MULTIPLIER_ONE = 1;
const CUBE_DEGREE = 3;
const DAYS_INTERVAL_DELAY = 1;
const FIRST_ELEMENT_ORDER = 0;
const SECOND_ELEMENT_ORDER = 1;

const getMultiplyRate = (activeDeliveryFirmUnit, unitsData) => {
  const { name, multiplyRate } = unitsData.find(({ active }) => active);

  return name === activeDeliveryFirmUnit ? MULTIPLIER_ONE : multiplyRate;
};

const getDeterminedInterval = interval =>
  `${interval - DAYS_INTERVAL_DELAY} - ${interval + DAYS_INTERVAL_DELAY}`;
const isNotValueInRange = (min, max, val) => {
  const isNotNumber = isNaN(val);

  return isNotNumber || val > max || val < min;
};
const getSize = () => Number(heightInput.value) * Number(lengthInput.value) * Number(widthInput.value);

const isErrorInInputsData = () => {
  const { maxWeight, minWeight } = weightUnits.find(({ active }) => active);
  const { maxValue, minValue } = sizeUnits.find(({ active }) => active);

  const errorWeight = isNotValueInRange(minWeight, maxWeight, Number(weightInput.value));
  const errorHeight = isNotValueInRange(minValue, maxValue, Number(heightInput.value));
  const errorLength = isNotValueInRange(minValue, maxValue, Number(lengthInput.value));
  const errorWidth = isNotValueInRange(minValue, maxValue, Number(widthInput.value));

  return errorWeight || sizeInputViewCheckBox.checked && (errorHeight || errorLength || errorWidth);
};

const calculateDeliveryInfoObj = company => {
  const { name, activeWeightUnit, activeSizeUnit } = company;
  const { countryName, activeCity } = destinationCountries.find(({ active }) => active);

  if (!countryName || !activeCity || isErrorInInputsData()) {
    return {
      name,
      error: ERROR_MSG,
    };
  }

  const determinedWeight =
    Number(weightInput.value) / getMultiplyRate(activeWeightUnit, weightUnits);
  const determinedSize =
    sizeInputViewCheckBox.checked &&
    getSize() /
      Math.pow(getMultiplyRate(activeSizeUnit, sizeUnits), CUBE_DEGREE);
  const deliveryPriceObj = company.getDeliveryPriceRates(
    countryName,
    activeCity,
    determinedSize
  );

  if (deliveryPriceObj.error) {
    return {
      name,
      error: deliveryPriceObj.error,
    };
  }

  const { cityRate, sizeRate } = deliveryPriceObj;
  const { interval, error } = company.getDeliveryIntervalRate(countryName, activeCity);

  if (error) {
    return {
      name,
      error,
    };
  }

  const { integer, fractional } = getPrice(cityRate, sizeRate, determinedWeight);
  const determinedInterval = getDeterminedInterval(interval);

  return {
    name,
    priceInteger: integer,
    priceFractional: fractional,
    currency,
    duration: determinedInterval,
    durationText: DURATION_MSG,
  };
};

const annMariaComponent = new deliveryFirmComponent(
  calculateDeliveryInfoObj(AnnMariaObj)
);
const dunkanComponent = new deliveryFirmComponent(
  calculateDeliveryInfoObj(DunkanObj)
);

const containerOne = priceCalculationContainers[FIRST_ELEMENT_ORDER];
const containerTwo = priceCalculationContainers[SECOND_ELEMENT_ORDER];

annMariaComponent.render(containerOne);
dunkanComponent.render(containerTwo);

const renderNewDeliveryInfo = () => {
  annMariaComponent.setState(calculateDeliveryInfoObj(AnnMariaObj));
  dunkanComponent.setState(calculateDeliveryInfoObj(DunkanObj));
  annMariaComponent.render(containerOne);
  dunkanComponent.render(containerTwo);
};

inputCity.addEventListener('blur', renderNewDeliveryInfo);
inputCountry.addEventListener('blur', renderNewDeliveryInfo);

form.addEventListener('input', renderNewDeliveryInfo);

export { renderNewDeliveryInfo };
