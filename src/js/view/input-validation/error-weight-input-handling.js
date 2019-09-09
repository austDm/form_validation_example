import {
  weightInput,
  inputWeightErrorContainer,
  weightRangeInput,
} from '../nodes';

import { inputs, getInputObj, DATA_ID_ATTRIBUTE } from './inputs-statuses';

import { errorMessages, nodeErrorClasses } from './error-data';

import { weightUnits } from '../../model/calculation-data';

import {
  renderErrorMessage,
  removeErrorMessage,
} from './error-city-input-handling';

const numbersPattern = /^[0-9]+(.[0-9]+)?$/;

const { inputErrorBorder, inputErrorMessage } = nodeErrorClasses;
const { enterWeight, wrongSymbolsWeight, weightIsOutOfRange } = errorMessages;

const getActiveWeightUnit = weightUnits =>
  weightUnits.find(({ active }) => active);

const handleFocusOnWeightInput = ({ target }) => {
  const inputStatusObj = getInputObj(
    inputs,
    target.getAttribute(DATA_ID_ATTRIBUTE)
  );

  if (!inputStatusObj || !inputStatusObj.dirty) {
    return;
  }

  removeErrorMessage(inputWeightErrorContainer);
  target.classList.remove(inputErrorBorder);
};

const weightInputErrorHandling = errorMessage => {
  renderErrorMessage(
    inputWeightErrorContainer,
    inputErrorMessage,
    errorMessage
  );
  weightInput.classList.add(inputErrorBorder);
};

const handleBlurOnWeightInput = ({ target }) => {
  const inputStatusObj = getInputObj(
    inputs,
    target.getAttribute(DATA_ID_ATTRIBUTE)
  );

  target.value = target.value.trim();

  if (!inputStatusObj || !inputStatusObj.dirty) {
    return;
  }

  if (!target.value) {
    weightInputErrorHandling(enterWeight);

    return;
  }

  if (!numbersPattern.test(target.value)) {
    weightInputErrorHandling(wrongSymbolsWeight);

    return;
  }

  const { minWeight, maxWeight, name } = getActiveWeightUnit(weightUnits);
  const value = parseFloat(target.value);

  if (value < minWeight || value > maxWeight) {
    weightInputErrorHandling(
      `${weightIsOutOfRange} ${minWeight} - ${maxWeight} ${name}!`
    );
  }
};

const clearErrorAfterChangeRangeInput = () => {
  removeErrorMessage(inputWeightErrorContainer);
  weightInput.classList.remove(inputErrorBorder);
};

weightRangeInput.addEventListener('input', clearErrorAfterChangeRangeInput);
weightInput.addEventListener('blur', handleBlurOnWeightInput);
weightInput.addEventListener('focus', handleFocusOnWeightInput);
