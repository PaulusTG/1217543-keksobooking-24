import {changeFormState} from './form.js';
import {addMap, addMainPin, makeMarkers} from './map.js';
import {createCards} from './data.js';

changeFormState();
addMap();
addMainPin();

const pins = createCards();
makeMarkers(pins);
