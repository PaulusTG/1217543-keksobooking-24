const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = `${card.author.avatar}`;
  cardElement.querySelector('.popup__title').textContent = `${card.offer.title}`;
  cardElement.querySelector('.popup__text--address').textContent = `${card.offer.address}`;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypes[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = `${card.offer.features}`;
  cardElement.querySelector('.popup__description').textContent = `${card.offer.description}`;

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
  mapCanvas.appendChild(cardElement);
};

const createCards = (cards) => {
  cards.forEach((card) => {
    createCard(card);
  });
};

export {createCards};
