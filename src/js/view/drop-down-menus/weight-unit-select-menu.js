import { weightUnits } from '../../model/calculation-data';

import { removeChildren } from './country-select-menu';

import {
  weightUnitClickArea,
  weightUnitSelectList,
  weightInput,
  weightRangeInput,
  inputWeightErrorContainer,
} from '../nodes';

import { inputs, DATA_ID_ATTRIBUTE } from '../input-validation/inputs-statuses';

import { nodeErrorClasses } from '../input-validation/error-data';

const RANGE_ATTRIBUTE_MIN = 'min';
const RANGE_ATTRIBUTE_MAX = 'max';
const RANGE_ATTRIBUTE_STEP = 'step';

const getCalculatedValue = (unitObj, value) => {
  const currentWeight = parseFloat(value) * unitObj.multiplyRate;

  return unitObj.integer
    ? Math.round(currentWeight)
    : Number(currentWeight.toFixed(2));
};

const renderWeightUnitSelectMenu = name => {
  const li = document.createElement('li');

  li.classList.add('form__package-weight-unit-select-option');
  li.innerHTML = name;

  weightUnitSelectList.appendChild(li);
};

const setWeightInputSettings = (rangeInput, input, unitObj, currentWeight) => {
  const { minWeight, maxWeight, step, name } = unitObj;

  rangeInput.setAttribute(RANGE_ATTRIBUTE_MIN, `${minWeight}`);
  rangeInput.setAttribute(RANGE_ATTRIBUTE_MAX, `${maxWeight}`);
  rangeInput.setAttribute(RANGE_ATTRIBUTE_STEP, `${step}`);
  rangeInput.value = currentWeight || minWeight;
  input.value = currentWeight || minWeight;

  weightUnitClickArea.innerHTML = name;
};

const selectWeightUnit = selectedName => {
  if (weightUnits.find(({ active }) => active).name === selectedName) {
    return;
  }

  weightUnits.forEach(weightUnit => {
    weightUnit.active = false;

    if (weightUnit.name === selectedName) {
      setWeightInputSettings(
        weightRangeInput,
        weightInput,
        weightUnit,
        getCalculatedValue(weightUnit, weightInput.value)
      );

      weightUnit.active = true;
    }
  });
};

const weightInputInit = () => {
  const weightInputObj = inputs.find(
    ({ inputId }) => inputId === weightInput.getAttribute(DATA_ID_ATTRIBUTE)
  );

  weightInputObj.dirty = false;

  const activeWeightUnit = weightUnits.find(({ active }) => active);

  removeChildren(inputWeightErrorContainer);
  weightInput.classList.remove(nodeErrorClasses.inputErrorBorder);

  setWeightInputSettings(weightRangeInput, weightInput, activeWeightUnit);
};

const weightUnitClickHandler = ({ target }) => {
  removeChildren(weightUnitSelectList);

  if (target === weightUnitClickArea) {
    weightUnits.forEach(({ name }) => renderWeightUnitSelectMenu(name));

    return;
  }

  if (target.closest('.form__package-weight-unit-select-option')) {
    if (inputWeightErrorContainer.innerHTML) {
      weightInputInit();
    }

    selectWeightUnit(target.innerHTML);
  }
};

window.addEventListener('mousedown', weightUnitClickHandler);

weightInputInit();
