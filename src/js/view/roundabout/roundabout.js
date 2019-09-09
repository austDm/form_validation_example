import { roundaboutContainer } from '../nodes';

import roundaboutElements from '../../model/roundabout-elements';

import roundaboutTemplates from './roundabout-view';

import roundaboutVariables from './roundabout-variables';

const { roundaboutEmptyTemplate, getRoundAboutElem } = roundaboutTemplates;

const {
  ROUNDABOUT_CAPACITY,
  ELEMENT_WIDTH,
  ROUNDABOUT_ACTIVE_POSITION,
  MULTIPLY_TWO,
  FIRST_CHILD_NUMBER,
  SECOND_CHILD_NUMBER,
  ANIMATION_DELAY,
  LIST_ORDER_FIRST,
  LIST_ORDER_SECOND,
  LIST_ORDER_THIRD,
} = roundaboutVariables;

import {
  activateElementByClick,
  setLateralElementsStyle,
} from './roundabout-elements-config';

const roundaboutListLength = ELEMENT_WIDTH * roundaboutElements.length;

const renderRoundaboutList = (roundaboutList, roundaboutElements) =>
  roundaboutElements.forEach(
    ({ content, order, active }) =>
      (roundaboutList.innerHTML += getRoundAboutElem(content, order, active))
  );

const renderAndConfigExtraLists = roundaboutListContainer => {
  const leftList = roundaboutListContainer.children[
    FIRST_CHILD_NUMBER
  ].cloneNode(true);
  leftList.dataset.listOrder = LIST_ORDER_FIRST;

  const rightList = roundaboutListContainer.children[
    FIRST_CHILD_NUMBER
  ].cloneNode(true);
  rightList.dataset.listOrder = LIST_ORDER_THIRD;

  roundaboutListContainer.insertBefore(
    leftList,
    roundaboutListContainer.children[FIRST_CHILD_NUMBER]
  );
  roundaboutListContainer.appendChild(rightList);

  return [
    leftList,
    roundaboutListContainer.children[SECOND_CHILD_NUMBER],
    rightList,
  ];
};

const renderAndConfigLongRoundabout = roundaboutListContainer => {
  renderAndConfigExtraLists(roundaboutListContainer);

  let activeElemOrder = Number(
    document.querySelector('.roundabout__element--active').dataset.order
  );

  setLateralElementsStyle(activeElemOrder);

  roundaboutListContainer.style.left = `${-roundaboutListLength +
    ROUNDABOUT_ACTIVE_POSITION -
    ELEMENT_WIDTH * activeElemOrder}rem`;

  window.onload = () => {
    roundaboutListContainer.classList.add(
      'roundabout__list-container--transition'
    );
  };
};

const roundaboutInit = () => {
  const roundaboutList = document.querySelector('.roundabout__list');
  const roundaboutListContainer = document.querySelector(
    '.roundabout__list-container'
  );

  renderRoundaboutList(roundaboutList, roundaboutElements);

  roundaboutListContainer.addEventListener('click', activateElementByClick);

  const isShortRoundabout = roundaboutElements.length <= ROUNDABOUT_CAPACITY;

  if (isShortRoundabout) {
    roundaboutListContainer.classList.add('roundabout__list-container--short');
  } else {
    renderAndConfigLongRoundabout(roundaboutListContainer);
  }
};

const getListByOrder = order =>
  document.querySelector(`[data-list-order="${order}"`);
const calculateOffset = order =>
  -roundaboutListLength + ROUNDABOUT_ACTIVE_POSITION - ELEMENT_WIDTH * order;
const calculateLeftOffset = order =>
  -ELEMENT_WIDTH * order + ROUNDABOUT_ACTIVE_POSITION;
const calculateRightOffset = order =>
  -roundaboutListLength * MULTIPLY_TWO -
  ELEMENT_WIDTH * order +
  ROUNDABOUT_ACTIVE_POSITION;

const refreshRoundabout = () => {
  roundaboutContainer.innerHTML = roundaboutEmptyTemplate;
  roundaboutInit();
};

const handleClickOnCentralList = (roundaboutListContainer, order) =>
  (roundaboutListContainer.style.left = `${calculateOffset(order)}rem`);

const handleClickOnLeftList = (roundaboutListContainer, order) => {
  roundaboutListContainer.style.left = `${calculateLeftOffset(order)}rem`;

  setTimeout(refreshRoundabout, ANIMATION_DELAY);
};

const handleClickOnRightList = (roundaboutListContainer, order) => {
  roundaboutListContainer.style.left = `${calculateRightOffset(order)}rem`;

  setTimeout(refreshRoundabout, ANIMATION_DELAY);
};

const rotateRoundaboutByClick = ({ target }) => {
  const targetList = target.closest('.roundabout__list');
  const targetElem = target.closest('.roundabout__element');
  const roundaboutListContainer = document.querySelector(
    '.roundabout__list-container'
  );

  const centralList = getListByOrder(LIST_ORDER_SECOND);

  const isShortList = centralList.children.length <= ROUNDABOUT_CAPACITY;

  if (!targetElem || isShortList) {
    return;
  }

  const order = Number(target.dataset.order);

  const leftList = getListByOrder(LIST_ORDER_FIRST);
  const rightList = getListByOrder(LIST_ORDER_THIRD);

  switch (targetList) {
    case centralList:
      handleClickOnCentralList(roundaboutListContainer, order);
      break;
    case leftList:
      handleClickOnLeftList(roundaboutListContainer, order);
      break;
    case rightList:
      handleClickOnRightList(roundaboutListContainer, order);
      break;
  }
};

roundaboutContainer.addEventListener('click', rotateRoundaboutByClick);

roundaboutInit();
