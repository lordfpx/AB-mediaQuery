!(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('abMediaQuery', function() {

  // For IE 9 and 10 (https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
  if (typeof window.CustomEvent !== 'function') {
    function CustomEvent( event, params ){
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }

  'use strict'; // voluntarily after window.CustomEvent polyfill

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

  function startsWith(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
  }


  var MediaQuery = function(opt) {
    if (!(this instanceof MediaQuery)) return new MediaQuery(opt);

    this.settings = extend({}, MediaQuery.defaults, opt);
    this.queries  = {};
    this.current  = [];

    this.init();
  };

  MediaQuery.defaults = {
    bp: {
      small:    '30em',
      medium:   '64em',
      large:    '80em',
      huge:     '90em'
    },
    delay:      200
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

      // 'tiny' rule since it's specific
      this.queries['tinyOnly'] = 'screen and (max-width: '+ (parseFloat(namedQueries.small)-0.01) +'em)';

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

        // add custom user rules if any:
        if (startsWith(key, '*')) {
          this.queries[key.replace('*','')] = namedQueries[key];
        }
      }
    },

    _getCurrentSize: function() {
      var that = this,
          newMediaQueries = [];

      for (var key in that.queries) {
        if (!that.queries.hasOwnProperty( key )) continue;
        if (window.matchMedia(that.queries[key]).matches) newMediaQueries.push(key);
      }

      return newMediaQueries;
    },

    _getQueries: function() {
      var metaMD = document.getElementById('AB-mediaQuery'),
          fontMD = window.getComputedStyle(metaMD, null).getPropertyValue('font-family'),
          extractedStyles = decodeURI(fontMD.trim().slice(1, -1));

      return isJson(extractedStyles) ? JSON.parse(extractedStyles) : this.settings.bp;
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

          if (newSize.join('|') !== that.current.join('|')) {
            that.current = newSize;
            window.dispatchEvent(event);
          }
        }, that.settings.delay);
      };
    },

    is: function(size) {
      var query = this.get(size);
      if (query) return window.matchMedia(query).matches;
    }
  };

  function abMediaQuery(opt) {
    if (typeof window.AB === 'undefined') window.AB = {};
    window.AB.mediaQuery = new MediaQuery(opt);
  }

  return abMediaQuery;
}));
