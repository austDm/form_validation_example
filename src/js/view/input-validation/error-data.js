const errorMessages = {
  wrongSymbolsCity:
    'Введены неверные символы! Допустимые символы: А - Я, а - я, Space, - . Буквы обязательны.',
  noCity: 'Город не найден!',
  enterCity: 'Введите город для отправки!',
  enterWeight: 'Введите массу посылки!',
  wrongSymbolsWeight:
    'Введены неверные символы! Допустимые значения: целые и дробные (десятичные) числа!',
  weightIsOutOfRange:
    'Введено недопустимое значение. Масса должна находиться в пределах: ',
  enterSize: 'Введите данные!',
  wrongSymbolsSize:
    'Введены неверные символы! Допустимые значения: целые и дробные (десятичные) числа!',
  sizeIsOutOfRange:
    'Введено недопустимое значение. Размер должен находиться в пределах: ',
};

const nodeErrorClasses = {
  classSelectorStart: '.',
  cityErrorContainer: 'form__city-input-error-container',
  inputErrorMessage: 'form__error-message',
  inputErrorBorder: 'error-input-border',
};

export { errorMessages, nodeErrorClasses };
