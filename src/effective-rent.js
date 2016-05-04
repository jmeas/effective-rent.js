// `month` – a 0-indexed month
// `year` – the year
// Returns the number of days in that month
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// `date` - a JavaScript Date in target month
// Returns a JavaScript Date representing the last day of that month
function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// `date` - The Date to be coerced to UTC time
// Returns a new `Date` object.
function treatAsUTC(date) {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

// Returns a Date in the month following `date`
function getNextMonth(date) {
  if (date.getMonth() == 11) {
    var current = new Date(date.getFullYear() + 1, 0, 1);
  } else {
    var current = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
  return current;
}

const millisecondsPerDay = 24 * 60 * 60 * 1000;

// Returns the number of days between `startDate` and `endDate`.
function daysBetween(startDate, endDate) {
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

// The number of days in a pay period
const daysInPayPeriod = 14;

const effectiveRent = {
  // `rent` – your monthly rent
  // `payDate` - a JavaScript Date object representing your pay day
  // Returns the effective rent for that pay period (assumes a 2 week pay period)
  compute({rent, payDate}) {
    const currentYear = payDate.getFullYear();
    const currentMonth = payDate.getMonth();
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);

    const rentPerDay = rent / daysInCurrentMonth;

    const lastDayOfMonth = getLastDayOfMonth(payDate);
    const daysLeftInMonth = daysBetween(payDate, lastDayOfMonth);

    // If the paycheck is contained solely in this month, then we're done
    if (daysLeftInMonth >= daysInPayPeriod) {
      return (rentPerDay * daysInPayPeriod).toFixed(2);
    }

    // Otherwise, we get the cost for the rest of the current month
    const thisMonthRent = rentPerDay * daysLeftInMonth;

    const nextMonthDate = getNextMonth(payDate);
    const nextMonthYear = nextMonthDate.getFullYear();
    const nextMonth = nextMonthDate.getMonth();
    const daysInNextMonth = daysInMonth(nextMonth, nextMonthYear);

    const rentPerDayNextMonth = rent / daysInNextMonth;

    // These are the days from this paycheck that are in the next month
    const daysLeft = daysInPayPeriod - daysLeftInMonth;
    const nextMonthRent = rentPerDayNextMonth * daysLeft;

    return (thisMonthRent + nextMonthRent).toFixed(2);
  }
};

export default effectiveRent;
