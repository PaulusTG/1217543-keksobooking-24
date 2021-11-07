const DEFAULT_FILTER = 'any';
const LOW_PRICE_FILTER = 10000;
const HIGH_PRICE_FILTER = 50000;

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelectorAll('#housing-features input');

const compareType = (data) => {
  const typeFilter = data.offer.type === housingType.value;
  const defaultFilter = housingType.value === DEFAULT_FILTER;
  return typeFilter || defaultFilter;
};

const comparePrice = (data) => {
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

const compareRooms = (data) => {
  const roomFilter = data.offer.rooms === +housingRooms.value;
  const defaultFilter = housingRooms.value === DEFAULT_FILTER;
  return roomFilter || defaultFilter;
};

const compareGuests = (data) => {
  const guestFilter = data.offer.guests === +housingGuests.value;
  const defaultFilter = housingGuests.value === DEFAULT_FILTER;
  return guestFilter || defaultFilter;
};

const compareFutures = (data) => {
  const selectedFeatures = document.querySelectorAll('input[name="features"]:checked');
  const dataFeatures = data.offer.features;
  let filter = true;

  for (let i = 0; i < selectedFeatures.length; i++) {
    if (selectedFeatures[i].checked && !(dataFeatures && dataFeatures.includes(selectedFeatures[i].value))) {
      filter = false;
      break;
    }
  }

  return filter;
};

const compare = (data) => compareType(data) && comparePrice(data) && compareRooms(data) && compareGuests(data) && compareFutures(data);

const selectTypeFilter = (cb) => {
  housingType.addEventListener('change', () => {
    cb();
  });
};

const selectPriceFilter = (cb) => {
  housingPrice.addEventListener('change', () => {
    cb();
  });
};

const selectRoomFilter = (cb) => {
  housingRooms.addEventListener('change', () => {
    cb();
  });
};

const selectGuestFilter = (cb) => {
  housingGuests.addEventListener('change', () => {
    cb();
  });
};

const selectFeatureFilter = (cb) => {
  housingFeatures.forEach((feature) => {
    feature.addEventListener('change', () => {
      cb();
    });
  });
};

export { compare, selectTypeFilter, selectPriceFilter, selectRoomFilter, selectGuestFilter, selectFeatureFilter };
