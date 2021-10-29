import {getRandomNumber, getRandomFloat, getRandomRangeFromArray} from './utils.js';
import {createCard} from './templates-generator.js';
import './form.js';
import { changeFormState } from './form.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_OF_CHECK = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const ROOMS = ['1', '2', '3', '100'];
const GUESTS = ['для 1', 'для 2', 'для 3', 'не для'];

const MAIN_PIN_ADDRESS = {
  lat: 35.67783,
  lng: 139.75849,
};
const MAIN_PIN_ICON = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const adressInput = document.querySelector('#address');

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

changeFormState();

const map = L.map('map-canvas')
  .on('load', () => {
    changeFormState(false);
    adressInput.value = `${MAIN_PIN_ADDRESS.lat}, ${MAIN_PIN_ADDRESS.lng}`;
  })
  .setView({lat: 35.67783, lng: 139.75849}, 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker  = L.marker(
  {
    lat: MAIN_PIN_ADDRESS.lat,
    lng: MAIN_PIN_ADDRESS.lng,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

mainPinMarker
  .on('moveend', (evt) => {
    const markerTarget = evt.target;
    adressInput.value = `${markerTarget.getLatLng().lat.toFixed(5)}, ${markerTarget.getLatLng().lng.toFixed(5)}`;
  })
  .addTo(map);

const points = [];
for (let i = 0; i < 10; i++) {
  points[i] = {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };
}

const markerGroup =   L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(createCard(getAd(getRandomNumber(1,10), 'Сдаётся жильё', 'Сдам жильё. Недорого.', `${lat}, ${lng}`)));
};

points.forEach((point) => {
  createMarker(point);
});
