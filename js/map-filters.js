const DEFAULT_FILTER = 'any';
const LOW_PRICE_FILTER = 10000;
const HIGH_PRICE_FILTER = 50000;
const CARDS_COUNT = 10;

const mapFilters = document.querySelector('.map__filters');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelectorAll('#housing-features input');

const filterByType = (data) => data.offer.type === housingType.value || housingType.value === DEFAULT_FILTER;
const filterByRooms = (data) => data.offer.rooms === +housingRooms.value || housingRooms.value === DEFAULT_FILTER;
const filterByGuests = (data) => data.offer.guests === +housingGuests.value || housingGuests.value === DEFAULT_FILTER;

const filterByPrice = (data) => {
  const dataPrice = data.offer.price;
  let priceFilter = dataPrice === housingPrice.value;
  const defaultFilter = housingPrice.value === DEFAULT_FILTER;

  if (housingPrice.value === 'middle') {
    priceFilter = dataPrice > LOW_PRICE_FILTER && dataPrice < HIGH_PRICE_FILTER;
  } else if (housingPrice.value === 'low') {
    priceFilter = dataPrice < LOW_PRICE_FILTER;
  } else if (housingPrice.value === 'high') {
    priceFilter = dataPrice > HIGH_PRICE_FILTER;
  }
  return priceFilter || defaultFilter;
};

const filterByFeatures = (data) => {
  const selectedFeatures = document.querySelectorAll('input[name="features"]:checked');
  const dataFeatures = data.offer.features;

  for (let i = 0; i < selectedFeatures.length; i++) {
    if (selectedFeatures[i].checked && !(dataFeatures && dataFeatures.includes(selectedFeatures[i].value))) {
      return false;
    }
  }

  return true;
};

const filterCards = (cards) => {
  const filteredCards = [];
  for (const card of cards) {
    if (filterByType(card) && filterByPrice(card) && filterByRooms(card) && filterByGuests(card) && filterByFeatures(card)) {
      filteredCards.push(card);
      if (filteredCards.length >= CARDS_COUNT) {
        break;
      }
    }
  }
  return filteredCards;
};

const selectFilters = (cb) => {
  const selectsOfFilters = document.querySelectorAll('.map__filters select');

  selectsOfFilters.forEach((filter) => {
    filter.addEventListener('change', cb);
  });

  housingFeatures.forEach((feature) => {
    feature.addEventListener('change', cb);
  });

  mapFilters.addEventListener('reset', cb);
};

export { filterCards, selectFilters };
