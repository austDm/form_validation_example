import {
  weightInput,
  weightRangeInput,
  lengthInput,
  lengthRangeInput,
  widthInput,
  widthRangeInput,
  heightInput,
  heightRangeInput,
} from './nodes';

const connectInputsByValues = (mainInput, receiveInput) =>
  (receiveInput.value = mainInput.value.trim());

const lengthRangeInputHandler = () =>
  connectInputsByValues(lengthRangeInput, lengthInput);
const widthRangeInputHandler = () =>
  connectInputsByValues(widthRangeInput, widthInput);
const heightRangeInputHandler = () =>
  connectInputsByValues(heightRangeInput, heightInput);
const weightRangeInputHandler = () =>
  connectInputsByValues(weightRangeInput, weightInput);
const lengthInputHandler = () =>
  connectInputsByValues(lengthInput, lengthRangeInput);
const widthInputHandler = () =>
  connectInputsByValues(widthInput, widthRangeInput);
const heightInputHandler = () =>
  connectInputsByValues(heightInput, heightRangeInput);
const weightInputHandler = () =>
  connectInputsByValues(weightInput, weightRangeInput);

lengthRangeInput.addEventListener('input', lengthRangeInputHandler);
widthRangeInput.addEventListener('input', widthRangeInputHandler);
heightRangeInput.addEventListener('input', heightRangeInputHandler);
weightRangeInput.addEventListener('input', weightRangeInputHandler);
lengthInput.addEventListener('input', lengthInputHandler);
widthInput.addEventListener('input', widthInputHandler);
heightInput.addEventListener('input', heightInputHandler);
weightInput.addEventListener('input', weightInputHandler);
