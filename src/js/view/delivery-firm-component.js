export default class deliveryFirmComponent {
  constructor(deliveryInfoObj) {
    this.state = deliveryInfoObj;
  }

  setState(deliveryInfoObj) {
    this.state = deliveryInfoObj;
  }

  render(container) {
    const {
      name,
      priceInteger,
      priceFractional,
      currency,
      duration,
      durationText,
      error,
    } = this.state;

    let template;

    if (error) {
      template = `
      <div class="price-calculation">
        <div class="price-calculation__firm">${name}</div>
        <div class="price-calculation__error">${error.error}</div>
      </div>`;
    } else {
      template = `
      <div class="price-calculation">
        <div class="price-calculation__firm">${name}</div>
        <div class="price-calculation__price">
          <div class="price-calculation__integer">${priceInteger}</div>
          <div class="price-calculation__fractional">${priceFractional}</div>
          <div class="price-calculation__currency">${currency}</div>
        </div>
        <div class="price-calculation__duration">
          <div class="price-calculation__days">${duration}</div>
          <div class="price-calculation__days-text">${durationText}</div>
      </div>`;
    }

    container.innerHTML = template;
  }
}
