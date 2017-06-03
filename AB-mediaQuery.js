;(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('abMediaQuery', function() {

  'use strict';

  // For IE 9 and 10 (https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
  function customEventPolyfill(){
    if (typeof window.CustomEvent === 'function') return false;

    function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
  customEventPolyfill();

  function extend(){
    var extended = {},
        deep = false,
        i = 0,
        length = arguments.length;

    if (Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ){
      deep = arguments[0];
      i++;
    }

    var merge = function (obj) {
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

    for ( ; i < length; i++ ) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;
  }

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  var MediaQuery = function(opt) {
    if (!(this instanceof MediaQuery)) return new MediaQuery(opt);

    this.settings = extend({}, MediaQuery.defaults, opt);
    this.queries  = this.settings.bp;
    this.current  = [];

    this.init();
  };

  MediaQuery.defaults = {
    bp: {},
    delay: 200
  };

  MediaQuery.prototype = {
    init: function() {
      this.current = this._getCurrentSize();
      this._watcher();

      return this;
    },

    _getCurrentSize: function() {
      var newMediaQueries = [];

      for (var key in this.queries) {
        if (!this.queries.hasOwnProperty( key )) continue;
        if (window.matchMedia(this.queries[key]).matches) newMediaQueries.push(key);
      }

      return newMediaQueries;
    },

    _watcher: function() {
      var that = this,
          event = new CustomEvent('changed.ab-mediaquery'),
          newSize, resizeTimer;

      window.onresize = function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          newSize = that._getCurrentSize();

          if (newSize.join('|') !== that.current.join('|')) {
            that.current = newSize;
            window.dispatchEvent(event);
          }
        }, that.settings.delay);
      };
    },

    is: function(size) {
      return window.matchMedia(this.queries[size]).matches;
    }
  };

  function abMediaQuery(opt) {
    if (typeof window.AB === 'undefined') window.AB = {};
    window.AB.mediaQuery = new MediaQuery(opt);
  }

  return abMediaQuery;
}));