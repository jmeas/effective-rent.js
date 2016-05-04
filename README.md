# effective-rent

Calculate your rent in a given pay period.

[![Travis build status](http://img.shields.io/travis/jmeas/effective-rent.svg?style=flat)](https://travis-ci.org/jmeas/effective-rent)
[![Code Climate](https://codeclimate.com/github/jmeas/effective-rent/badges/gpa.svg)](https://codeclimate.com/github/jmeas/effective-rent)
[![Test Coverage](https://codeclimate.com/github/jmeas/effective-rent/badges/coverage.svg)](https://codeclimate.com/github/jmeas/effective-rent)
[![Dependency Status](https://david-dm.org/jmeas/effective-rent.svg)](https://david-dm.org/jmeas/effective-rent)
[![devDependency Status](https://david-dm.org/jmeas/effective-rent/dev-status.svg)](https://david-dm.org/jmeas/effective-rent#info=devDependencies)

### Motivation

Rent is typically paid on a per-month basis, yet each month has a different
number of days. Therefore, in some months you're paying more per-day than in
other months.

Contrast this with biweekly pay-checks, which are distributed in every 2 weeks.
The approximation of 4 weeks per month breaks down on large time scales; over
the course of a year you'll end up calculating having spent an entire extra
month of rent.

This library helps you determine exactly how much you're paying out of each
pay check for rent.

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
