'use strict';

var AB = require('another-brick');

window.abMediaQuery = function(opt) {
  window.AB.mediaQuery = (function() {
    var _settings = opt || {bp: {}},
        _animated = false;

    var _getCurrent = function() {
      var sizes = [];

      for (var key in _settings.bp) {
        if (!_settings.bp.hasOwnProperty(key))
          continue;

        if (window.matchMedia(_settings.bp[key]).matches)
          sizes.push(key);
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

      _animated = false;
    };

    var is = function(size) {
      if (_settings.bp[size])
        return window.matchMedia(_settings.bp[size]).matches;
    };

    // get current breakpoints
    var _currentStore = _getCurrent()

    // change on resize
    window.addEventListener('resize', function() {
      if (!_animated) {
        window.requestAnimationFrame(_updateSizes);
        _animated = true;
      }
    });

    return {
      get current() { return _currentStore; },
      is: is
    };
  })();
};
