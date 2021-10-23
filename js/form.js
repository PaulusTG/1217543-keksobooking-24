const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapChildrens = mapFilters.querySelectorAll('.map__filter');
const mapFieldset = mapFilters.querySelector('fieldset');

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');

  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFieldset.disabled = true;
  mapChildrens.forEach((mapChildren) => {
    mapChildren.disabled = true;
  });
};

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');

  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFieldset.disabled = false;
  mapChildrens.forEach((mapChildren) => {
    mapChildren.disabled = false;
  });
};

export {disableForm, enableForm};
