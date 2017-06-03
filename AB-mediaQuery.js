;(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('abMediaQuery', function() {

  'use strict';

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