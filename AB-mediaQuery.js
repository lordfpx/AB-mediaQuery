;(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('abMediaQuery', function() {

  'use strict';

  var Plugin = function(opt) {
    this.settings = AB.extend(Plugin.defaults, opt);
    this.queries  = this.settings.bp;
    this.current  = [];

    this.init();
  };

  Plugin.defaults = {
    bp: {},
    delay: 200
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
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          newSize = that._getCurrent();

          // check if it's updated
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

  var abMediaQuery = function(opt) {
    AB.mediaQuery = new Plugin(opt);
  };

  return abMediaQuery;
}));