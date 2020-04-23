module.exports = {
  getCurrentDate() {
    let currentDate = new Date();

    function zerofy(digit) {
      let stringfromDigit = digit.toString();
      if (stringfromDigit.length === 1) {
        stringfromDigit = `0${stringfromDigit}`;
      }
      return stringfromDigit;
    }

    let year = currentDate.getFullYear();
    year = year.toString().substring(2, 4);

    let month = currentDate.getMonth() + 1;
    month = zerofy(month);

    let day = currentDate.getDate();
    day = zerofy(day);

    let hour = currentDate.getHours();
    hour = zerofy(hour);

    let minutes = currentDate.getMinutes();
    minutes = zerofy(minutes);

    let seconds = currentDate.getSeconds();
    seconds = zerofy(seconds);

    currentDate = `${hour}:${minutes}:${seconds} ${day}.${month}.${year}`;

    return currentDate;
  },
};
