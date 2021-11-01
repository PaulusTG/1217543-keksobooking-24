const ALERT_SHOW_TIME = 5000;

// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomNumber = (min, max) => {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = (min, max, numAfterPoint = 1) => {
  min = Math.min(Math.abs(min), Math.abs(max));
  max = Math.max(Math.abs(min), Math.abs(max));

  return +((Math.random() * (max - min)) + min).toFixed(numAfterPoint);
};

// Получаем массив строк случайной длины из массива
const getRandomRangeFromArray = (arrayToRange) => {
  const numOfElements = getRandomNumber(1, arrayToRange.length);
  const slice = arrayToRange.slice();
  const arr = [];
  for (let i = 1; i <= numOfElements; i++) {
    arr.push(slice[getRandomNumber(0, slice.length - 1)]);
    slice.splice(slice.indexOf(arr[arr.length - 1]), 1);
  }

  return arr;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'coral';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const hideMessage = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
  document.body.lastChild.remove();
  document.removeEventListener('click', hideMessage);
  document.removeEventListener('keydown', hideMessage);
  document.querySelector('.error__button').removeEventListener('click', hideMessage);
};

const addListenersOnMessage = () => {
  document.addEventListener('click', hideMessage);
  document.addEventListener('keydown', hideMessage);
};

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const message = successMessageTemplate.cloneNode(true);
  document.body.append(message);
  addListenersOnMessage();
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const message = errorMessageTemplate.cloneNode(true);
  document.body.append(message);
  addListenersOnMessage();

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', hideMessage);
};

export {showAlert, showSuccessMessage, showErrorMessage, getRandomNumber, getRandomFloat, getRandomRangeFromArray};
