import { roundaboutContainer, roundaboutHideCheckbox } from '../nodes';

const hideRoundabout = () => {
  roundaboutContainer.classList.toggle('roundabout--hide');
};

roundaboutHideCheckbox.addEventListener('change', hideRoundabout);
