(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["effectiveRent"] = factory();
	else
		root["effectiveRent"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	
	// The number of days since the month began
	function daysSinceMonthBegan(date) {
	  return date.getDate();
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
	
	var millisecondsPerDay = 24 * 60 * 60 * 1000;
	
	// Returns the number of days between `startDate` and `endDate`.
	function daysBetween(startDate, endDate) {
	  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
	}
	
	// The number of days in a pay period
	var daysInPayPeriod = 14;
	
	var effectiveRent = {
	  // `rent` – your monthly rent
	  // `payDate` - a JavaScript Date object representing your pay day
	  // Returns the effective rent for that pay period (assumes a 2 week pay period)
	
	  compute: function compute(_ref) {
	    var rent = _ref.rent;
	    var payDate = _ref.payDate;
	
	    var currentYear = payDate.getFullYear();
	    var currentMonth = payDate.getMonth();
	    var daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
	
	    var rentPerDay = rent / daysInCurrentMonth;
	
	    var lastDayOfMonth = getLastDayOfMonth(payDate);
	    var daysLeftInMonth = daysBetween(payDate, lastDayOfMonth);
	
	    // If the paycheck is contained solely in this month, then we're done
	    if (daysLeftInMonth >= daysInPayPeriod) {
	      return (rentPerDay * daysInPayPeriod).toFixed(2);
	    }
	
	    // Otherwise, we get the cost for the rest of the current month
	    var thisMonthRent = rentPerDay * daysLeftInMonth;
	
	    var nextMonthDate = getNextMonth(payDate);
	    var nextMonthYear = nextMonthDate.getFullYear();
	    var nextMonth = nextMonthDate.getMonth();
	    var daysInNextMonth = daysInMonth(nextMonth, nextMonthYear);
	
	    var rentPerDayNextMonth = rent / daysInNextMonth;
	
	    // These are the days from this paycheck that are in the next month
	    var daysLeft = daysInPayPeriod - daysLeftInMonth;
	    var nextMonthRent = rentPerDayNextMonth * daysLeft;
	
	    return (thisMonthRent + nextMonthRent).toFixed(2);
	  }
	};
	
	exports.default = effectiveRent;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=effective-rent.js.map