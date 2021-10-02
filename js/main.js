// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min >= 0 && max >= 0) {
    if (max < min) {
      const swap = max;
      max = min;
      min = swap;
    }
    if (max > min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return min;
  }
  return 'Используйте диапазон положительных чисел';
};
getRandomNumber(0, 1);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = (min, max, numAfterPoint) => {
  if (min >= 0 && max >= 0) {
    if (max < min) {
      const swap = max;
      max = min;
      min = swap;
    }
    if (max > min) {
      return +((Math.random() * (max - min)) + min).toFixed(numAfterPoint);
    }
    return min;
  }
  return 'Используйте диапазон положительных чисел';
};
getRandomFloat(0.1, 0, 1);
