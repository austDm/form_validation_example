import { birds } from './nodes';

window.addEventListener('scroll', () => {
  const scroll = window.pageYOffset;

  birds.style.top = `${scroll / 18}rem`;
});
