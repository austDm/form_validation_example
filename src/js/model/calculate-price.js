const MIN_PRICE = 50;
const DECIMAL_AMOUNT = 2;
const DECIMAM_MULTIPLIER = 100;

const getPrice = (cityRate, sizeRate, weight) => {
  const price = sizeRate
    ? MIN_PRICE * cityRate * sizeRate * Math.cbrt(weight)
    : MIN_PRICE * cityRate * Math.cbrt(weight);

  return {
    integer: String(Math.trunc(price)),
    fractional: String(price * DECIMAM_MULTIPLIER).slice(length - DECIMAL_AMOUNT),
  };
};

export {
  getPrice,
};
