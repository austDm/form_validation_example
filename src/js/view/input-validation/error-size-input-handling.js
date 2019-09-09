import { sizeUnits } from '../../model/calculation-data';

import { errorMessages, nodeErrorClasses } from './error-data';

import {
  renderErrorMessage,
  removeErrorMessage,
} from './error-city-input-handling';

import { inputs, getInputObj, DATA_ID_ATTRIBUTE } from './inputs-statuses';

import {
  lengthInputErrorContainer,
  widthInputErrorContainer,
  heightInputErrorContainer,
  lengthRangeInput,
  widthRangeInput,
  heightRangeInput,
  lengthInput,
  heightInput,
  widthInput,
} from '../nodes';

const { inputErrorBorder, inputErrorMessage } = nodeErrorClasses;
const { enterSize, wrongSymbolsSize, sizeIsOutOfRange } = errorMessages;
const sizeErrorContainers = [
  lengthInputErrorContainer,
  widthInputErrorContainer,
  heightInputErrorContainer,
];
const sizeRangeInputs = [lengthRangeInput, widthRangeInput, heightRangeInput];
const sizeInputs = [lengthInput, heightInput, widthInput];

const numbersPattern = /^[0-9]+(.[0-9]+)?$/;

const getActiveSizeUnit = sizeUnits => sizeUnits.find(({ active }) => active);
const getTargetID = target => target.getAttribute(DATA_ID_ATTRIBUTE);
const getNodeByAttributeID = (nodes, ID) =>
  nodes.find(node => node.getAttribute(DATA_ID_ATTRIBUTE) === ID);
const isSizeErrorActive = () =>
  sizeErrorContainers.find(({ innerHTML }) => innerHTML);

const handleFocusOnSizeInput = ({ target }) => {
  const targetID = getTargetID(target);
  const inputStatusObj = getInputObj(inputs, targetID);

  if (!inputStatusObj || !inputStatusObj.dirty) {
    return;
  }

  removeErrorMessage(getNodeByAttributeID(sizeErrorContainers, targetID));
  target.classList.remove(inputErrorBorder);
};

const sizeInputErrorHandling = (
  input,
  inputWeightErrorContainer,
  errorMessage
) => {
  renderErrorMessage(
    inputWeightErrorContainer,
    inputErrorMessage,
    errorMessage
  );
  input.classList.add(inputErrorBorder);
};

const handleBlurOnSizeInput = ({ target }) => {
  const targetID = getTargetID(target);
  const inputStatusObj = getInputObj(inputs, targetID);

  target.value = target.value.trim();

  if (!inputStatusObj || !inputStatusObj.dirty) {
    return;
  }

  const errorContainer = getNodeByAttributeID(sizeErrorContainers, targetID);

  if (!target.value) {
    sizeInputErrorHandling(target, errorContainer, enterSize);

    return;
  }

  if (!numbersPattern.test(target.value)) {
    sizeInputErrorHandling(target, errorContainer, wrongSymbolsSize);

    return;
  }

  const { minValue, maxValue, name } = getActiveSizeUnit(sizeUnits);
  target.value = Number(target.value);
  const { value } = target;

  if (value < minValue || value > maxValue) {
    sizeInputErrorHandling(
      target,
      errorContainer,
      `${sizeIsOutOfRange} ${minValue} - ${maxValue} ${name}!`
    );
  }
};
//
const clearErrorAfterChangeRangeInput = ({ target }) => {
  const targetID = getTargetID(target);
  const errorContainer = getNodeByAttributeID(sizeErrorContainers, targetID);
  const input = getNodeByAttributeID(sizeInputs, targetID);

  removeErrorMessage(errorContainer);
  input.classList.remove(inputErrorBorder);
};

sizeInputs.forEach(input =>
  input.addEventListener('blur', handleBlurOnSizeInput)
);
sizeInputs.forEach(input =>
  input.addEventListener('focus', handleFocusOnSizeInput)
);
sizeRangeInputs.forEach(input =>
  input.addEventListener('input', clearErrorAfterChangeRangeInput)
);

const removeSizeErrors = () => {
  sizeInputs.forEach(input => input.classList.remove(inputErrorBorder));
  sizeErrorContainers.forEach(removeErrorMessage);
};

export { removeSizeErrors, isSizeErrorActive };
