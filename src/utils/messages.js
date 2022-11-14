const moment = require('moment');

const formatMessages = (data) => {
  const { email, msg } = data;
  return {
    email,
    time: String(moment().format('D/M/YYYY h:mm a')),
    msg,
  };
};

module.exports = {
  formatMessages,
};