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
    this.queries  = {};
    this.current  = '';

    this.init();
  };

  MediaQuery.defaults = {
    small:    '30em',
    medium:   '64em',
    large:    '80em',
    huge:     '90em'
  };

  MediaQuery.prototype = {
    init: function() {
      this._defineQueries();
      this.current = this._getCurrentSize();
      this._watcher();

      return this;
    },

    _defineQueries: function() {
      // Create #AB-mediaQuery element to extract mediaQueries from generated font-family CSS rule
      var meta = document.createElement('meta');
      meta.id = 'AB-mediaQuery';
      document.getElementsByTagName('head')[0].appendChild(meta);

      var namedQueries = this._getQueries();

      // 'tiny' has specific rules
      this.queries['tinyOnly'] = 'screen and (max-width: '+ (parseFloat(namedQueries.small)-0.01) +'em)';
      this.queries['tiny']     = 'screen';

      // define other media queries
      for (var key in namedQueries) {
        if (!namedQueries.hasOwnProperty( key )) continue;

        switch (key) {
          case 'small':
            this.queries[key + 'Only'] = 'screen and (min-width: '+ namedQueries[key] +') and (max-width: '+ (parseFloat(namedQueries.medium)-0.01) +'em)';
            this.queries[key]          = 'screen and (min-width: '+ namedQueries[key] +')';
            break;
          case 'medium':
            this.queries[key + 'Only'] = 'screen and (min-width: '+ namedQueries[key] +') and (max-width: '+ (parseFloat(namedQueries.large)-0.01) +'em)';
            this.queries[key]          = 'screen and (min-width: '+ namedQueries[key] +')';
            break;
          case 'large':
            this.queries[key + 'Only'] = 'screen and (min-width: '+ namedQueries[key] +') and (max-width: '+ (parseFloat(namedQueries.huge)-0.01) +'em)';
            this.queries[key]          = 'screen and (min-width: '+ namedQueries[key] +')';
            break;
          case 'huge':
            this.queries[key]          = 'screen and (min-width: '+ namedQueries[key] +')';
            break;
        }
      }
    },

    _getCurrentSize: function() {
      var matched,
          that = this;

      for (var key in that.queries) {
        if (!that.queries.hasOwnProperty( key )) continue;
        if (window.matchMedia(that.queries[key]).matches) matched = key;
      }

      if (typeof matched === 'object') return matched.name;
      return matched;
    },

    _getQueries: function() {
      var metaMD = document.getElementById('AB-mediaQuery'),
          fontMD = window.getComputedStyle(metaMD, null).getPropertyValue("font-family"),
          extractedStyles = decodeURI(fontMD.trim().slice(1, -1));

      return isJson(extractedStyles) ? JSON.parse(extractedStyles) : this.settings;
    },

    get: function(size) {
      if (typeof size === 'undefined') return;
      return this.queries[size];
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
        }, 150);
      };
    },

    is: function(size) {
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