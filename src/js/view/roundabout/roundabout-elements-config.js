import { weightUnits } from '../../model/calculation-data';

import { removeChildren } from '../drop-down-menus/country-select-menu';

import { inputWeightErrorContainer, weightInput, weightRangeInput } from '../nodes';

import { nodeErrorClasses } from '../input-validation/error-data';

import { renderNewDeliveryInfo } from '../render-firms-delivery-info';

import roundaboutElements from '../../model/roundabout-elements';

import roundaboutVariables from './roundabout-variables';

const {
  ROUNDABOUT_FIRST_ORDER,
  ROUNDABOUT_CAPACITY,
  LATERAL_ELEMENT_DISTANCE,
  DECIMAL_AMOUNT,
} = roundaboutVariables;

const getCalculatedWeight = (weightUnits, weight, unit) => {
  const { active, multiplyRate, integer } = weightUnits.find(
    ({ name }) => name === unit
  );

  const calcWeight = integer
    ? Number((weight / multiplyRate).toFixed(DECIMAL_AMOUNT))
    : Math.round(weight / multiplyRate);

  return active ? weight : calcWeight;
};

const setLateralElementsStyle = activeOrder => {
  const elementsAmount = roundaboutElements.length;

  const rightOrder =
    activeOrder + LATERAL_ELEMENT_DISTANCE >= elementsAmount
      ? activeOrder + LATERAL_ELEMENT_DISTANCE - elementsAmount
      : activeOrder + LATERAL_ELEMENT_DISTANCE;
  const leftOrder =
    activeOrder - LATERAL_ELEMENT_DISTANCE < ROUNDABOUT_FIRST_ORDER
      ? elementsAmount + activeOrder - LATERAL_ELEMENT_DISTANCE
      : activeOrder - LATERAL_ELEMENT_DISTANCE;

  const lateralElements = [
    ...document.querySelectorAll(
      `[data-order="${rightOrder}"], [data-order="${leftOrder}"]`
    ),
  ];

  lateralElements.forEach(elem =>
    elem.classList.add('roundabout__element--lateral')
  );
};

const activateElementByClick = ({ target }) => {
  if (!target.closest('.roundabout__element')) {
    return;
  }

  [...document.querySelectorAll('.roundabout__element')].forEach(node => {
    node.classList.remove('roundabout__element--lateral');

    if (node === target) {
      node.classList.add('roundabout__element--active');
    } else {
      node.classList.remove('roundabout__element--active');
    }
  });

  const activeOrder = Number(target.dataset.order);

  roundaboutElements.length > ROUNDABOUT_CAPACITY &&
  setLateralElementsStyle(activeOrder);

  roundaboutElements.forEach(element => {
    element.active = false;

    if (element.order === activeOrder) {
      element.active = true;

      const calculatedWeight = getCalculatedWeight(
        weightUnits,
        element.weight,
        element.weightUnit
      );

      removeChildren(inputWeightErrorContainer);
      weightInput.classList.remove(nodeErrorClasses.inputErrorBorder);
      weightInput.value = calculatedWeight;
      weightRangeInput.value = calculatedWeight;

      renderNewDeliveryInfo();
    }
  });
};

export {
  setLateralElementsStyle,
  activateElementByClick,
}
