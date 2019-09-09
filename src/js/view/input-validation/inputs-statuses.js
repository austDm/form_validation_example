import {
  inputCity,
  heightInput,
  lengthInput,
  weightInput,
  widthInput,
} from '../nodes';

const DATA_ID_ATTRIBUTE = 'data-id';

const inputs = [
  {
    inputId: 'city',
    dirty: false,
  },

  {
    inputId: 'weight',
    dirty: false,
  },

  {
    inputId: 'length',
    dirty: false,
  },

  {
    inputId: 'height',
    dirty: false,
  },

  {
    inputId: 'width',
    dirty: false,
  },
];

const haveToValidateInputs = [
  inputCity,
  weightInput,
  lengthInput,
  widthInput,
  heightInput,
];

const getInputObj = (inputs, outerInputID) =>
  inputs.find(({ inputId }) => outerInputID === inputId);

const setDirtyInput = (inputs, inputID) => {
  const inputObj = getInputObj(inputs, inputID);

  inputObj && (inputObj.dirty = true);
};

const setCleanInput = (inputs, inputID) => {
  const inputObj = getInputObj(inputs, inputID);

  inputObj && (inputObj.dirty = false);
};

const changeStatusAfterInput = ({ target }) =>
  setDirtyInput(inputs, target.getAttribute(DATA_ID_ATTRIBUTE));

haveToValidateInputs.forEach(input =>
  input.addEventListener('input', changeStatusAfterInput)
);

export {
  inputs,
  getInputObj,
  setCleanInput,
  DATA_ID_ATTRIBUTE,
  haveToValidateInputs,
};
