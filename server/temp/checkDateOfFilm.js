const moment = require('moment');

const checkDateOfFilm = ({ start_record, premiere_date }) => {
  const currentDate = moment();
  if (
    moment(currentDate).isBefore(moment(start_record, 'YYYY-MM-DD')) ||
    moment(currentDate).isAfter(moment(premiere_date, 'YYYY-MM-DD'))
  ) {
    return false;
  }
  return true;
};

const result = checkDateOfFilm({
  start_record: '2019-05-16',
  premiere_date: '2019-05-16'
});
console.log(result);
