const GET_DATA_ADDRESS = 'https://24.javascript.pages.academy/keksobooking/data';
const SEND_DATA_ADDRESS = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(GET_DATA_ADDRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(() => {
      onError('Не удалось получить данные. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SEND_DATA_ADDRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
