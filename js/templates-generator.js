const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderElement = (template, element, data, text) => {
  if (data) {
    template.querySelector(element).textContent = text;
  } else {
    template.querySelector(element).classList.add('hidden');
  }
};

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  if (card.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = `${card.author.avatar}`;
  }
  else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  renderElement(cardElement, '.popup__title', card.offer.title, `${card.offer.title}`);
  renderElement(cardElement, '.popup__text--address', card.offer.address, `${card.offer.address}`);
  renderElement(cardElement, '.popup__text--price', card.offer.price, `${card.offer.price} ₽/ночь`);
  renderElement(cardElement, '.popup__type', card.offer.type, offerTypes[card.offer.type]);
  renderElement(cardElement, '.popup__text--capacity', card.offer.rooms && card.offer.guests, `${card.offer.rooms} комнаты ${card.offer.guests} гостей`);
  renderElement(cardElement, '.popup__text--time', card.offer.checkin && card.offer.checkout, `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);
  renderElement(cardElement, '.popup__features', card.offer.features, `${card.offer.features}`);
  renderElement(cardElement, '.popup__description', card.offer.description, `${card.offer.description}`);

  if (card.offer.photos) {
    const cardPhotos = cardElement.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    const pictures = card.offer.photos.map((photo) => {
      const picture = document.createElement('img');
      picture.src = photo;
      picture.alt = 'Фотография жилья';
      picture.width = '45';
      picture.height = '40';
      picture.classList.add('popup__photo');
      return picture;
    });
    cardPhotos.append(...pictures);
  }
  else {
    cardElement.querySelector('.popup__photo').classList.add('hidden');
  }

  return cardElement;
};

export {createCard};
