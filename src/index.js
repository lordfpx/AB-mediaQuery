'use strict';

window.AB = require('another-brick');

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
module.exports = window.AB;
