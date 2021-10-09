const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_OF_CHECK = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

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

// Генерация url аватара автора
const getAuthorUrl = (id) => {
  const userID = `0${id}`.slice(-2);
  return `img/avatars/user${userID}.png`;
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
    title: title,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomNumber(1, 100) * 1000,
    type: TYPES[getRandomNumber(0, TYPES.length - 1)],
    rooms: getRandomNumber(1, 3),
    guests: getRandomNumber(1, 8),
    checkin: TIME_OF_CHECK[getRandomNumber(0, TIME_OF_CHECK.length - 1)],
    checkout: TIME_OF_CHECK[getRandomNumber(0, TIME_OF_CHECK.length - 1)],
    features: getRandomRangeFromArray(FEATURES),
    description: description,
    photos: getRandomRangeFromArray(PHOTOS),
  };

  return {author, offer, location};
};

// Создание массива из 10-ти объектов
const createAds = () => {
  const arrayOfAds = [];
  for (let i = 1; i <= 10; i++) {
    arrayOfAds.push(getAd(i, 'Сдаётся жильё', 'Сдам жильё. Недорого.'));
  }
  return arrayOfAds;
};
createAds();
