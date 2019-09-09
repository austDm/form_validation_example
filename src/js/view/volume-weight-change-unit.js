import { sizeUnits } from '../model/calculation-data';

import {
  DATA_ID_ATTRIBUTE,
  setCleanInput,
  inputs,
} from './input-validation/inputs-statuses';

import { removeChildren } from './drop-down-menus/country-select-menu';

import {
  sizeUnitInchRadio,
  sizeUnitSmRadio,
  sizeUnitViewFields,
  lengthRangeInput,
  widthRangeInput,
  heightRangeInput,
  lengthInput,
  widthInput,
  heightInput,
  sizeUnitInchLabel,
  sizeUnitSmLabel,
} from './nodes';

import {
  removeSizeErrors,
  isSizeErrorActive,
} from './input-validation/error-size-input-handling';

const DECIMAL_AMOUNT = 2;
const RANGE_ATTRIBUTE_MIN = 'min';
const RANGE_ATTRIBUTE_MAX = 'max';
const RANGE_ATTRIBUTE_STEP = 'step';

const sizeUnitsRadioInputs = [sizeUnitInchRadio, sizeUnitSmRadio];
const sizeRangeInputs = [lengthRangeInput, widthRangeInput, heightRangeInput];
const sizeUnitsLabels = [sizeUnitInchLabel, sizeUnitSmLabel];
const sizeInputs = [lengthInput, heightInput, widthInput];
const sizeInputIDs = ['length', 'height', 'width'];

const getActiveSizeUnit = sizeUnits => sizeUnits.find(({ active }) => active);

const getCalculatedValue = (unitObj, value) => {
  const currentWeight = parseFloat(value) * unitObj.multiplyRate;

  return unitObj.integer
    ? Math.round(currentWeight)
    : Number(currentWeight.toFixed(DECIMAL_AMOUNT));
};

const renderSizeUnits = name => {
  sizeUnitViewFields.forEach(node => {
    removeChildren(node);

    node.innerHTML = name;
  });
};

const setInputsValuesByID = (inputs, infoObj) =>
  inputs.forEach(input => {
    input.value = infoObj.find(
      ({ name }) => input.getAttribute(DATA_ID_ATTRIBUTE) === name
    ).value;
  });

const setSizeRangeInputSettings = (
  rangeInputs,
  inputs,
  unitObj,
  currentSizes
) => {
  const { minValue, maxValue, step } = unitObj;

  rangeInputs.forEach(rangeInput => {
    rangeInput.setAttribute(RANGE_ATTRIBUTE_MIN, `${minValue}`);
    rangeInput.setAttribute(RANGE_ATTRIBUTE_MAX, `${maxValue}`);
    rangeInput.setAttribute(RANGE_ATTRIBUTE_STEP, `${step}`);
    rangeInput.value = minValue;
  });

  if (currentSizes) {
    setInputsValuesByID(inputs, currentSizes);
    setInputsValuesByID(rangeInputs, currentSizes);
  } else {
    inputs.forEach(input => {
      input.value = minValue;
    });

    rangeInputs.forEach(input => {
      input.value = minValue;
    });
  }
};

const sizeInputsInit = () => {
  removeSizeErrors();

  const activeSizeUnit = getActiveSizeUnit(sizeUnits);
  sizeUnitsRadioInputs
    .find(
      sizeUnitsRadioInput =>
        sizeUnitsRadioInput.getAttribute(DATA_ID_ATTRIBUTE) ===
        activeSizeUnit.name
    )
    .click();

  renderSizeUnits(activeSizeUnit.name);
  setSizeRangeInputSettings(sizeRangeInputs, sizeInputs, activeSizeUnit);

  sizeInputIDs.forEach(sizeInputID => setCleanInput(inputs, sizeInputID));
};

const sizeUnitChangeHandler = ({ target }) => {
  let activeSizeUnitObj = getActiveSizeUnit(sizeUnits);
  const activeRadio = document.querySelector(`#${target.getAttribute('for')}`);
  const targetName = activeRadio.getAttribute(DATA_ID_ATTRIBUTE);

  if (targetName === activeSizeUnitObj.name) {
    return;
  }

  sizeUnits.forEach(sizeUnit => (sizeUnit.active = sizeUnit.name === targetName));

  if (isSizeErrorActive()) {
    sizeInputsInit();

    return;
  }

  activeSizeUnitObj = getActiveSizeUnit(sizeUnits);
  renderSizeUnits(targetName);

  const currentSizes = [];
  sizeInputs.forEach(sizeInput =>
    currentSizes.push({
      name: sizeInput.getAttribute(DATA_ID_ATTRIBUTE),
      value: getCalculatedValue(activeSizeUnitObj, sizeInput.value),
    })
  );

  setSizeRangeInputSettings(
    sizeRangeInputs,
    sizeInputs,
    activeSizeUnitObj,
    currentSizes
  );
};

sizeUnitsLabels.forEach(label =>
  label.addEventListener('mousedown', sizeUnitChangeHandler)
);

sizeInputsInit();

export { sizeInputsInit };
