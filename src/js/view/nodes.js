const main = document.querySelector('.main');
const form = document.querySelector('.form');

const inputCountry = document.querySelector('.form__country-input');
const countryMenuList = document.querySelector('.form__country-select-list');
const inputCity = document.querySelector('.form__city-input');
const inputCityLabel = document.querySelector('.form__city-label');

const weightInput = document.querySelector('.form__package-weight-input');
const weightRangeInput = document.querySelector(
  '.form__package-weight-input-range'
);
const weightUnitClickArea = document.querySelector(
  '.form__package-weight-unit-click-area'
);
const weightUnitSelectList = document.querySelector(
  '.form__package-weight-unit-select-list'
);

const sizeInputSettingsHideMenu = document.querySelector(
  '.form__package-size-input-settings-hide-menu'
);
const sizeInputSettingsHideLabel = document.querySelector(
  '.form__package-size-input-settings-turn-on'
);
const sizeInputContainer = document.querySelector(
  '.form__package-size-input-container'
);

const sizeInputViewCheckBox = document.querySelector(
  '.form__package-size-input-settings-checkbox'
);

const sizeUnitInchRadio = document.querySelector(
  '.form__package-size-input-settings-inch-radio'
);
const sizeUnitSmRadio = document.querySelector(
  '.form__package-size-input-settings-sm-radio'
);

const sizeUnitInchLabel = document.querySelector(
  '.form__package-size-input-settings-label--inch'
);
const sizeUnitSmLabel = document.querySelector(
  '.form__package-size-input-settings-label--sm'
);

const sizeUnitViewFields = document.querySelectorAll(
  '.form__package-size-input-unit'
);

const lengthInput = document.querySelector('.form__package-size-input--length');
const lengthRangeInput = document.querySelector(
  '.form__package-size-input-range--length'
);
const lengthInputErrorContainer = document.querySelector(
  '.form__length-input-error-container'
);

const widthInput = document.querySelector('.form__package-size-input--width');
const widthRangeInput = document.querySelector(
  '.form__package-size-input-range--width'
);
const widthInputErrorContainer = document.querySelector(
  '.form__width-input-error-container'
);

const heightInput = document.querySelector('.form__package-size-input--height');
const heightRangeInput = document.querySelector(
  '.form__package-size-input-range--height'
);
const heightInputErrorContainer = document.querySelector(
  '.form__height-input-error-container'
);

const citySelectList = document.querySelector('.form__city-select-list');

const inputCityErrorContainer = document.querySelector(
  '.form__city-input-error-container'
);

const inputWeightErrorContainer = document.querySelector(
  '.form__weight-input-error-container'
);

const sizeUnitContainers = document.querySelectorAll(
  '.form__package-size-input-unit'
);

const roundaboutContainer = document.querySelector('.roundabout');
const roundaboutHideCheckbox = document.querySelector(
  '.roundabout-switch-block__checkbox'
);

const birds = document.querySelector('.birds');

const priceCalculationContainers = document.querySelectorAll(
  '.price-calculation-container'
);

export {
  inputCountry,
  inputCity,
  countryMenuList,
  weightUnitClickArea,
  weightUnitSelectList,
  sizeInputSettingsHideMenu,
  sizeInputSettingsHideLabel,
  sizeInputContainer,
  sizeInputViewCheckBox,
  sizeUnitInchRadio,
  sizeUnitSmRadio,
  sizeUnitViewFields,
  weightInput,
  weightRangeInput,
  lengthInput,
  lengthRangeInput,
  widthInput,
  widthRangeInput,
  heightInput,
  heightRangeInput,
  citySelectList,
  main,
  form,
  inputCityErrorContainer,
  inputCityLabel,
  inputWeightErrorContainer,
  sizeUnitContainers,
  lengthInputErrorContainer,
  widthInputErrorContainer,
  heightInputErrorContainer,
  roundaboutContainer,
  roundaboutHideCheckbox,
  birds,
  sizeUnitInchLabel,
  sizeUnitSmLabel,
  priceCalculationContainers,
};
