const { months } = require('../constants/order');

  const parseDate = (dateString) => {
    const [day, monthStr, year] = dateString.split(" ");
    const month = months[monthStr.toLowerCase()];
    return new Date(year, month, parseInt(day)).getTime();
  };

  module.exports = { parseDate };
