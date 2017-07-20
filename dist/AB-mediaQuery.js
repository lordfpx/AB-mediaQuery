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


var AB = __webpack_require__(1);

var Plugin = function(opt) {
  this.settings = window.AB.extend(true, Plugin.defaults, opt);
  this.queries  = this.settings.bp;
  this.current  = [];
  this.animated = false;

  this.init();
};

Plugin.defaults = {
  bp: {}
};

Plugin.prototype = {
  init: function() {
    this.current = this._getCurrent();
    this._watcher();

    return this;
  },

  _getCurrent: function() {
    var sizes = [];

    for (var key in this.queries) {
      if (!this.queries.hasOwnProperty(key))
        continue;

      if (window.matchMedia(this.queries[key]).matches)
        sizes.push(key);
    }

    return sizes;
  },

  _watcher: function() {
    var that  = this,
        event = new CustomEvent('changed.ab-mediaquery'),
        newSize, resizeTimer;

    window.onresize = function() {
      if (!that.animated) {
        window.requestAnimationFrame(that._updateSizes.bind(that));
        that.animated = true;
      }
    };
  },

  _updateSizes: function() {
    var newSize = this._getCurrent(),
        event   = new CustomEvent('changed.ab-mediaquery');

    this.animated = false;

    // check if it's updated
    if (newSize.join('|') !== this.current.join('|')) {
      this.current = newSize;
      window.dispatchEvent(event);
    }
  },

  is: function(size) {
    return window.matchMedia(this.queries[size]).matches;
  }
};

window.abMediaQuery = function(opt) {
  window.AB.mediaQuery = new Plugin(opt);
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// polyfill customEvent pour IE
;(function() {
  if ( typeof window.CustomEvent === "function" ) return false;
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

// main public AB object
window.AB = {
  // deep extend function
  extend: function() {
    var extended = {},
        deep     = false,
        i        = 0,
        length   = arguments.length;

    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]'){
      deep = arguments[0];
      i++;
    }

    var merge = function(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = window.AB.extend(true, extended[prop], obj[prop]);
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
  },

  // test if a string is a JSON
  isJson: function(str) {
    try {
      JSON.parse(str);
    } catch(e) {
      return false;
    }
    return true;
  },

  plugins: {}
};

/***/ })
/******/ ]);