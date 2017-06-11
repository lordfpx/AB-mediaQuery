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

  var abMediaQuery = function(opt) {
    AB.mediaQuery = new Plugin(opt);
  };

  return abMediaQuery;
}));