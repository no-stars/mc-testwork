const isValidDate = (dateString) => {
  const re = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  return re.test(dateString);
}

const isValidNumber = (idString) => {
  const re = /^\d+$/;
  return re.test(idString);
}

const incDate = (date) => {
  return new Date(date.setDate(date.getDate() + 1));
}

const generateError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = { isValidDate, isValidNumber, incDate, generateError }