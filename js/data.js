import {getRandomNumber, getRandomFloat, getRandomRangeFromArray} from './utils.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_OF_CHECK = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const ROOMS = ['1', '2', '3', '100'];
const GUESTS = ['для 1', 'для 2', 'для 3', 'не для'];

const createPoints = () => {
  const points = [];
  for (let i = 0; i < 10; i++) {
    points[i] = {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    };
  }
  return points;
};

const getAuthorUrl = (id) => {
  const userID = `0${id}`.slice(-2);
  return `img/avatars/user${userID}.png`;
};

const getAd = (userID, title, description, address) => {
  const author = {
    avatar: getAuthorUrl(userID),
  };

  const location = {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };

  const offer = {
    title,
    address,
    price: getRandomNumber(1, 100) * 100,
    type: TYPES[getRandomNumber(0, TYPES.length - 1)],
    rooms: ROOMS[getRandomNumber(0, 3)],
    guests: GUESTS[getRandomNumber(0, 3)],
    checkin: TIME_OF_CHECK[getRandomNumber(0, TIME_OF_CHECK.length - 1)],
    checkout: TIME_OF_CHECK[getRandomNumber(0, TIME_OF_CHECK.length - 1)],
    features: getRandomRangeFromArray(FEATURES),
    description,
    photos: getRandomRangeFromArray(PHOTOS),
  };

  return {author, offer, location};
};

const createCards = () => createPoints().map((point) => getAd(getRandomNumber(1,10), 'Сдаётся жильё', 'Сдам жильё. Недорого.', `${point.lat}, ${point.lng}`));

export {createCards};
