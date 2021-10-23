import {getRandomNumber, getRandomFloat, getRandomRangeFromArray} from './utils.js';
import {createCards} from './templates-generator.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_OF_CHECK = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

// Генерация url аватара автора
const getAuthorUrl = (id) => {
  const userID = `0${id}`.slice(-2);
  return `img/avatars/user${userID}.png`;
};

// Создание объекта для описания похожих объявлений
const getAd = (userID, title, description) => {
  const author = {
    avatar: getAuthorUrl(userID),
  };

  const location = {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };

  const offer = {
    title,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomNumber(1, 100) * 100,
    type: TYPES[getRandomNumber(0, TYPES.length - 1)],
    rooms: getRandomNumber(1, 3),
    guests: getRandomNumber(1, 8),
    checkin: TIME_OF_CHECK[getRandomNumber(0, TIME_OF_CHECK.length - 1)],
    checkout: TIME_OF_CHECK[getRandomNumber(0, TIME_OF_CHECK.length - 1)],
    features: getRandomRangeFromArray(FEATURES),
    description,
    photos: getRandomRangeFromArray(PHOTOS),
  };

  return {author, offer, location};
};

// Создание массива из 10-ти объектов
const createAds = () => {
  const arrayOfAds = [];
  //for (let i = 1; i <= 10; i++) {
  arrayOfAds.push(getAd(getRandomNumber(1,10), 'Сдаётся жильё', 'Сдам жильё. Недорого.'));
  //}
  return arrayOfAds;
};

const ads = createAds();
createCards(ads);

