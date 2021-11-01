import {changeFormState, setFormDefault, setFormSubmit} from './form.js';
import {addMap, addMainPin, makeMarkers} from './map.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';

changeFormState();
addMap();
addMainPin();

getData(makeMarkers, showAlert);
setFormSubmit(setFormDefault);
