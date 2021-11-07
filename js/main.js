import { changeFormState, setFormDefault, setFormSubmit } from './form.js';
import { addMap, addMainPin, makeMarkers } from './map.js';
import { selectTypeFilter, selectPriceFilter, selectRoomFilter, selectGuestFilter, selectFeatureFilter } from './map-filters.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;

changeFormState();
addMap();
addMainPin();

getData((pins) => {
  makeMarkers(pins);
  selectTypeFilter(debounce(() => makeMarkers(pins), RERENDER_DELAY));
  selectPriceFilter(debounce(() => makeMarkers(pins), RERENDER_DELAY));
  selectRoomFilter(debounce(() => makeMarkers(pins), RERENDER_DELAY));
  selectGuestFilter(debounce(() => makeMarkers(pins), RERENDER_DELAY));
  selectFeatureFilter(debounce(() => makeMarkers(pins), RERENDER_DELAY));
}, showAlert);
setFormSubmit(setFormDefault);
