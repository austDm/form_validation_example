import {
  AnnMariaDeliveryInfo,
  DunkanDeliveryInfo,
} from './delivery-firms-data';

const outerError = {
  destination: {
    error: 'Данный кораблик туда не плавает',
  },
};

const WEIGHT_UNIT_KG = 'кг';
const SIZE_UNIT_SM = 'см';

const shortPackVolumeAmount = 125000;

class deliveryFirm {
  constructor(name, deliveryInfo) {
    this.name = name;
    this.deliveryInfo = deliveryInfo;
    this.activeWeightUnit = WEIGHT_UNIT_KG;
    this.activeSizeUnit = SIZE_UNIT_SM;
  }

  getDeliveryIntervalRate(country, city) {
    const { activeCountry, error } = this.getActiveCountry(country);

    if (error) {
      return {
        error: error,
      };
    }

    const { lowPriceCities, standardPriceCities, interval } = activeCountry;

    if (!lowPriceCities && !standardPriceCities) {
      return {
        interval: interval.standardPriceCities,
      };
    }

    const lowPriceCity = lowPriceCities.find(
      lowPriceCity => city === lowPriceCity
    );

    if (lowPriceCity) {
      return {
        interval: interval.lowPriceCities,
      };
    }

    const standardPriceCity = standardPriceCities.find(
      standardPriceCity => city === standardPriceCity
    );

    if (standardPriceCity) {
      return {
        interval: interval.standardPriceCities,
      };
    }

    return outerError.destination;
  }

  getDeliveryPriceRates(country, city, volume) {
    const { activeCountry, error } = this.getActiveCountry(country);

    if (error) {
      return {
        error: error,
      };
    }

    const { lowPriceCities, standardPriceCities, multiplyRate } = activeCountry;
    const result = {};

    if (volume) {
      result.sizeRate =
        volume > shortPackVolumeAmount
          ? multiplyRate.longPack
          : multiplyRate.shortPack;
    }

    if (!lowPriceCities && !standardPriceCities) {
      result.cityRate = multiplyRate.standardPriceCities;

      return result;
    }

    const lowPriceCity = lowPriceCities.find(
      lowPriceCity => city === lowPriceCity
    );

    if (lowPriceCity) {
      result.cityRate = multiplyRate.lowPriceCities;

      return result;
    }

    const standardPriceCity = standardPriceCities.find(
      standardPriceCity => city === standardPriceCity
    );

    if (standardPriceCity) {
      result.cityRate = multiplyRate.standardPriceCities;

      return result;
    }

    if (!lowPriceCity && !standardPriceCity) {
      result.error = outerError.destination;

      return result;
    }

    return result;
  }

  getActiveCountry(country) {
    const { deliveryInfo } = this;
    const result = {};

    const activeCountry = deliveryInfo.find(
      ({ name }) => name.toUpperCase() === country.toUpperCase()
    );

    if (!activeCountry) {
      result.error = outerError.destination;
    } else {
      result.activeCountry = activeCountry;
    }

    return result;
  }
}

const AnnMariaObj = new deliveryFirm('Анна Мария', AnnMariaDeliveryInfo);
const DunkanObj = new deliveryFirm('Дункан', DunkanDeliveryInfo);

export { AnnMariaObj, DunkanObj };
