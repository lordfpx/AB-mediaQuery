'use strict';

var AB = require('another-brick');

var settings = {
  bp: {}
};

var _init = function() {
  this.current = _getCurrent.call(this);
  _watcher.call(this);
};

var _getCurrent = function() {
  var sizes = [];

  for (var key in this.settings.bp) {
    if (!this.settings.bp.hasOwnProperty(key))
      continue;

    if (window.matchMedia(this.settings.bp[key]).matches)
      sizes.push(key);
  }

  return sizes;
};

var _watcher = function() {
  var that = this;

  window.addEventListener('resize', function() {
    if (!that._animated) {
      window.requestAnimationFrame(_updateSizes.bind(that));
      that._animated = true;
    }
  });
};

var _updateSizes = function() {
  var newSize = _getCurrent.call(this);

  this._animated = false;

  // check if it's updated
  if (newSize.join('|') !== this.current.join('|')) {
    this.current = newSize;
    window.dispatchEvent(new CustomEvent('changed.ab-mediaquery'));
  }
};


var Plugin = function(opt) {
  this.settings  = window.AB.extend(true, settings, opt);
  this.current   = [];
  this._animated = false;

  _init.call(this);
};

Plugin.prototype = {
  is: function(size) {
    return window.matchMedia(this.settings.bp[size]).matches;
  }
};

window.abMediaQuery = function(opt) {
  window.AB.mediaQuery = new Plugin(opt);
};
