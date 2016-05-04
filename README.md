# effective-rent

Calculate your rent in a given pay period.

[![Travis build status](http://img.shields.io/travis/jmeas/effective-rent.svg?style=flat)](https://travis-ci.org/jmeas/effective-rent)
[![Code Climate](https://codeclimate.com/github/jmeas/effective-rent/badges/gpa.svg)](https://codeclimate.com/github/jmeas/effective-rent)
[![Test Coverage](https://codeclimate.com/github/jmeas/effective-rent/badges/coverage.svg)](https://codeclimate.com/github/jmeas/effective-rent)
[![Dependency Status](https://david-dm.org/jmeas/effective-rent.svg)](https://david-dm.org/jmeas/effective-rent)
[![devDependency Status](https://david-dm.org/jmeas/effective-rent/dev-status.svg)](https://david-dm.org/jmeas/effective-rent#info=devDependencies)

### Motivation

Rent is typically paid on a per-month basis, but different months have different
numbers of days. Therefore, the amount you pay each _day_ in rent is not
constant; it depends on the month.

Contrast this with biweekly pay-checks, which are distributed every 2 weeks, and
are independent of the number of days in a given month.

The challenge that this library solves is determining how much of each paycheck
goes toward your rent. Approximating 4 weeks (2 pay checks) per month is fine
for short time scales, but is inadequate for long-term calculations. For
instance, over the course of a year that approximation counts a whole extra
month of rent for the year.

This library calculates exactly how much of a given paycheck is going toward
rent.

### Installation

The preferred installation method is through `npm`.

`npm install effective-rent`

### Example Usage

```js
import effectiveRent from 'effective-rent';

// A pay date of January 1st, 2016
const payDate = new Date(2016, 0, 1);
// A rent of $2000 per month
const rent = 2000;

effectiveRent.compute({rent, payDate});
// => '903.23'
```

### API

##### `effectiveRent.compute(options)`

Computes the effective rent given `options`. There are two valid options:

- `payDate` - a JavaScript Date object representing the date that you were paid
- `rent` - how much your rent is each month

Returns a string representing the effective rent for that paycheck.
