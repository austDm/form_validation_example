const weightUnits = [
  {
    name: 'кг',
    multiplyRate: 2.222222,
    active: false,
    minWeight: 1,
    maxWeight: 100,
    step: 1,
    integer: true,
  },

  {
    name: 'lbs',
    multiplyRate: 0.45,
    active: true,
    minWeight: 0.45,
    maxWeight: 45,
    step: 0.45,
    integer: false,
  },
];

const sizeUnits = [
  {
    name: 'in',
    active: true,
    multiplyRate: 0.39,
    minValue: 0.39,
    maxValue: 39,
    step: 0.39,
    integer: false,
  },

  {
    name: 'см',
    active: false,
    multiplyRate: 2.5641,
    minValue: 1,
    maxValue: 100,
    step: 1,
    integer: true,
  },
];

const currency = 'руб';

export { weightUnits, sizeUnits, currency };
