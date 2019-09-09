import { sizeUnitContainers } from './nodes';

const sizeUnitContainersClickHandler = event => event.preventDefault();

sizeUnitContainers.forEach(sizeUnitContainer =>
  sizeUnitContainer.addEventListener(
    'mousedown',
    sizeUnitContainersClickHandler
  )
);
