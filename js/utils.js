// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomNumber = (min, max) => {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = (min, max, numAfterPoint = 1) => {
  min = Math.min(Math.abs(min), Math.abs(max));
  max = Math.max(Math.abs(min), Math.abs(max));

  return +((Math.random() * (max - min)) + min).toFixed(numAfterPoint);
};

// Получаем массив строк случайной длины из массива
const getRandomRangeFromArray = (arrayToRange) => {
  const numOfElements = getRandomNumber(1, arrayToRange.length);
  const slice = arrayToRange.slice();
  const arr = [];
  for (let i = 1; i <= numOfElements; i++) {
    arr.push(slice[getRandomNumber(0, slice.length - 1)]);
    slice.splice(slice.indexOf(arr[arr.length - 1]), 1);
  }

  return arr;
};

export {getRandomNumber, getRandomFloat, getRandomRangeFromArray};
