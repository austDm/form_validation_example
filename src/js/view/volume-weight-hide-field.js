import {
  sizeInputSettingsHideLabel,
  sizeInputSettingsHideMenu,
  sizeInputContainer,
  sizeInputViewCheckBox,
} from './nodes';

import { removeSizeErrors } from './input-validation/error-size-input-handling';

import { sizeInputsInit } from './volume-weight-change-unit';

const sizeInputViewCheckBoxChangeHandler = () => {
  if (sizeInputViewCheckBox.checked) {
    sizeInputSettingsHideLabel.classList.add('hide-block');

    sizeInputSettingsHideMenu.classList.remove('hide-block');
    sizeInputContainer.classList.remove('hide-block');
    sizeInputsInit();
  } else {
    sizeInputSettingsHideMenu.classList.add('hide-block');
    sizeInputContainer.classList.add('hide-block');

    sizeInputSettingsHideLabel.classList.remove('hide-block');
    removeSizeErrors();
    sizeInputsInit();
  }
};

sizeInputViewCheckBox.addEventListener(
  'change',
  sizeInputViewCheckBoxChangeHandler
);
