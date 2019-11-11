/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anotherBrick = __webpack_require__(1); // dev mode
// var anotherBrick = require('another-brick');

var mediaQuery = function(opt) {
  window.AB.mediaQuery = (function() {
    var _settings = opt || {bp: {}};

    var _getCurrent = function() {
      var sizes = [];

      for (var key in _settings.bp) {
        if (_settings.bp.hasOwnProperty(key) && window.matchMedia(_settings.bp[key]).matches) {
          sizes.push(key);
        }
      }

      return sizes;
    };

    var _updateSizes = function() {
      var newSize = _getCurrent();

      // check if it's updated
      if (newSize.join('|') !== _currentStore.join('|')) {
        _currentStore = newSize;
        window.dispatchEvent(new CustomEvent('changed.ab-mediaquery'));
      }
    };

    var is = function(size) {
      if (_settings.bp[size])
        return window.matchMedia(_settings.bp[size]).matches;
    };

    // get current breakpoints
    var _currentStore = _getCurrent()

    // change on resize
    window.addEventListener('ab-resize', _updateSizes);

    return {
      get current() { return _currentStore; },
      is: is
    };
  })();
};


window.AB.plugins.mediaQuery = mediaQuery;
module.exports = mediaQuery;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// polyfill customEvent pour IE
;(function() {
  if (typeof window.CustomEvent === "function")
    return false;

  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

// throttle events with requestAnimationFrame
(function() {
  var throttle = function(type, name) {
    var running = false;
    var func = function() {
      if (running)
        return;

      running = true;
      window.requestAnimationFrame(function() {
        window.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    window.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle("resize", "ab-resize");
  throttle("scroll", "ab-scroll");
  throttle("keyup", "ab-keyup");
})();

// deep extend function
var extend = function() {
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]'){
    deep = arguments[0];
    i++;
  }

  var merge = function(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  for (; i < length; i++) {
    merge(arguments[i]);
  }

  return extended;
};

// test if a string is a JSON
var isJson = function(str) {
  try {
    JSON.parse(str);
  } catch(e) {
    return false;
  }
  return true;
};


window.AB = {
  runUpdaters: function(plugin) {
    if (this.options[plugin]) {
      this.plugins[plugin](this.options[plugin]);
    } else {
      for(var options in AB.options){
        if(this.options.hasOwnProperty(options)) {
          this.plugins[options](this.options[options]);
        }
      }
    }
  },
  plugins: {},
  options: {}
};


module.exports = {
  extend: extend,
  isJson: isJson,
  AB: window.AB
};


/***/ })
/******/ ]);