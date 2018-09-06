'use strict';

var AB = require('another-brick');

var _init = function() {
  this.current = _getCurrent.call(this);
  _watcher.call(this);
};

var _watcher = function() {
  var that = this;

  window.addEventListener('resize', function () {
    if (!that._animated) {
      window.requestAnimationFrame(_updateSizes.bind(that));
      that._animated = true;
    }
  });
};

var _getCurrent = function() {
  var sizes = [];

  for (var key in this.queries) {
    if (!this.queries.hasOwnProperty(key))
      continue;

    if (window.matchMedia(this.queries[key]).matches)
      sizes.push(key);
  }

  return sizes;
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

var settings = {
  bp: {}
};


var Plugin = function(opt) {
  this.settings = window.AB.extend(true, settings, opt);
  this.queries  = this.settings.bp;
  this.current  = [];
  this._animated = false;

  _init.call(this);
};

Plugin.prototype = {
  is: function(size) {
    return window.matchMedia(this.queries[size]).matches;
  }
};

window.abMediaQuery = function(opt) {
  window.AB.mediaQuery = new Plugin(opt);
};
