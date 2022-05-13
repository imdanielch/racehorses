export const validateObject = obj => {
  console.log(obj);
  if (
    obj && // check for null or undefined
    Object.keys(obj).length !== 0 && // check if empty
    Object.getPrototypeOf(obj) === Object.prototype // check if object is an object
  ) {
    return true;
  }
  return false;
};

export const validateEmptyObject = obj => {
  if (
    obj && // check for null or undefined
    Object.keys(obj).length === 0 && // check if empty
    Object.getPrototypeOf(obj) === Object.prototype // check if object is an object
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateNumber = num => {
  if (num && num !== '' && typeof num === 'number' && num <= 10 && num > 0) {
    return true;
  } else {
    return false;
  }
};
