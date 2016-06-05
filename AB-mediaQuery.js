!(function(name, definition) {
  if (typeof module != 'undefined') module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('mediaQuery', function() {

  'use strict';

  function extend(){
    for (var i=1; i<arguments.length; i++) {
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) arguments[0][key] = arguments[i][key];
      }
    }
    return arguments[0];
  }

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  // For IE 9 and 10
  if (typeof window.CustomEvent !== "function") {
    function CustomEvent(event, params ){
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }

  var MediaQuery = function(opt) {
    if (!(this instanceof MediaQuery)) return new MediaQuery(opt);

    this.settings = extend({}, MediaQuery.defaults, opt);
    this.queries  = [];
    this.current  = '';

    this.init();
  };

  MediaQuery.defaults = {
    tiny:     0,
    small:    480,
    medium:   1024,
    large:    1280,
    huge:     1440,
    unit:     "px"
  };

  MediaQuery.prototype = {
    init: function() {
      // Create #AB-mediaQuery element to extract mediaQueries from generated font-family CSS rule
      var meta = document.createElement('meta');
      meta.id = 'AB-mediaQuery';
      document.getElementsByTagName('head')[0].appendChild(meta);

      var namedQueries = this.getQueries();
      for (var key in namedQueries) {
        if (!namedQueries.hasOwnProperty( key )) continue;

        if (key !== 'unit') {
          this.queries.push({
            name: key,
            value: 'screen and (min-width: ' + namedQueries[key] + namedQueries.unit + ')'
          });
        }
      }

      this.current = this._getCurrentSize();
      this._watcher();
      this._setVar();

      return this;
    },

    _setVar: function() {
      var namedQueries = this.getQueries();
      this.is = {};

      for (var key in namedQueries) {
        if (!namedQueries.hasOwnProperty(key) && key === 'unit') continue;
        switch (key) {
          case 'tiny':
            this.is[key + '_only'] = 'screen and (max-width: '+ (namedQueries.small-1) + namedQueries.unit +')';
            this.is[key + '_up']   = 'screen and (min-width: '+ namedQueries[key] + namedQueries.unit +')';
            break;
          case 'small':
            this.is[key + '_only'] = 'screen and (min-width: '+ namedQueries[key] + namedQueries.unit +') and (max-width: '+ (namedQueries.medium-1) + namedQueries.unit +')';
            this.is[key + '_up']   = 'screen and (min-width: '+ namedQueries[key] + namedQueries.unit +')';
            break;
          case 'medium':
            this.is[key + '_only'] = 'screen and (min-width: '+ namedQueries[key] + namedQueries.unit +') and (max-width: '+ (namedQueries.large-1) + namedQueries.unit +')';
            this.is[key + '_up']   = 'screen and (min-width: '+ namedQueries[key] + namedQueries.unit +')';
            break;
          case 'large':
            this.is[key + '_only'] = 'screen and (min-width: '+ namedQueries[key] + namedQueries.unit +') and (max-width: '+ (namedQueries.huge-1) + namedQueries.unit +')';
            this.is[key + '_up']   = 'screen and (min-width: '+ namedQueries[key] + namedQueries.unit +')';
            break;
          case 'huge':
            this.is[key + '_up']   = 'screen and (min-width: '+ namedQueries[key] + namedQueries.unit +')';
            break;
        }
      }
    },

    _getCurrentSize: function() {
      var matched;

      this.queries.forEach(function(el, i, array) {
        if (window.matchMedia(el.value).matches) matched = el;
      });

      if (typeof matched === 'object') {
        return matched.name;
      } else {
        return matched;
      }
    },

    getQueries: function() {
      var metaMD = document.getElementById('AB-mediaQuery');
      var fontMD = window.getComputedStyle(metaMD, null).getPropertyValue("font-family");
      var extractedStyles = decodeURI(fontMD.trim().slice(1, -1));
      return isJson(extractedStyles) ? JSON.parse(extractedStyles) : this.settings;
    },

    get: function(size) {
      if (typeof size === 'undefined') return;

      var queries = this.queries;

      for (var i = 0, len = queries.length; i < len; i++) {
        var thisQuery = queries[i];
        if (size === thisQuery.name) return thisQuery.value;
      }
    },

    _watcher: function() {
      var that = this,
          event = new Event('changed.ab-mediaquery'),
          newSize, resizeTimer;

      window.onresize = function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          newSize = that._getCurrentSize();

          if (newSize !== that.current) {
            that.current = newSize;
            window.dispatchEvent(event);
          }
        }, 200);
      };
    },

    atLeast: function(size) {
      var query = this.get(size);
      if (query) return window.matchMedia(query).matches;
    }
  };

  function mediaQuery(opt) {
    if (typeof window.AB === 'undefined') window.AB = {};
    window.AB.mediaQuery = new MediaQuery(opt);
  }

  return mediaQuery;
}));