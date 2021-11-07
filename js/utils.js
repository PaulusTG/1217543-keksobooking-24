const ALERT_SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const getRandomNumber = (min, max) => {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, numAfterPoint = 1) => {
  min = Math.min(Math.abs(min), Math.abs(max));
  max = Math.max(Math.abs(min), Math.abs(max));

  return +((Math.random() * (max - min)) + min).toFixed(numAfterPoint);
};

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

const onHideMessage = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
  document.body.lastChild.remove();
  document.removeEventListener('click', onHideMessage);
  document.removeEventListener('keydown', onHideMessage);
  document.querySelector('.error__button').removeEventListener('click', onHideMessage);
};

const addListenersOnMessage = () => {
  document.addEventListener('click', onHideMessage);
  document.addEventListener('keydown', onHideMessage);
};

const showSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  addListenersOnMessage();
  document.body.append(message);
};

const showErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  addListenersOnMessage();

  const errorButton = message.querySelector('.error__button');
  errorButton.addEventListener('click', onHideMessage);
  document.body.append(message);
};

export {showAlert, showSuccessMessage, showErrorMessage, getRandomNumber, getRandomFloat, getRandomRangeFromArray};
