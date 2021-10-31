import {changeFormState} from './form.js';
import {createCard} from './templates-generator.js';

const MAP = L.map('map-canvas');
const MARKER_GROUP = L.layerGroup().addTo(MAP);

const MAIN_PIN_ADDRESS = {
  lat: 35.67783,
  lng: 139.75849,
};

const MAIN_PIN_ICON = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

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

const adressInput = document.querySelector('#address');

const addMap = () => {
  MAP.on('load', () => {
    changeFormState(false);
    adressInput.value = `${MAIN_PIN_ADDRESS.lat}, ${MAIN_PIN_ADDRESS.lng}`;
  })
    .setView({lat: 35.67783, lng: 139.75849}, 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);
};

const addMainPin = () => {mainPinMarker
  .on('moveend', (evt) => {
    const markerTarget = evt.target;
    adressInput.value = `${markerTarget.getLatLng().lat.toFixed(5)}, ${markerTarget.getLatLng().lng.toFixed(5)}`;
  })
  .addTo(MAP);
};

const createMarker = (func, point) => {
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
    .addTo(MARKER_GROUP)
    .bindPopup(func);
};

const makeMarkers = (cards) => {
  cards.forEach((card) => {
    createMarker(() => createCard(card), card.location);
  });
};

export {addMap, addMainPin, makeMarkers};
