import {getRandomNumber} from './utils.js';
import {createCard} from './templates-generator.js';
import {changeFormState} from './form.js';
import {addMap, addMainPin, createMarker} from './map.js';
import {createPoints, getAd} from './data.js';

changeFormState();
addMap();
addMainPin();

createPoints().map((point) => {
  createMarker(createCard(getAd(getRandomNumber(1,10), 'Сдаётся жильё', 'Сдам жильё. Недорого.', `${point.lat}, ${point.lng}`)), point);
});
