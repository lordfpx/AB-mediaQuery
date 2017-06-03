// polyfill customEvent pour IE
;(function() {
  if ( typeof window.CustomEvent === "function" ) return false;
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

// main AB object
window.AB = {
  // extend function
  extend: function() {
    var extended = {},
        deep = false,
        i = 0,
        length = arguments.length;

    if (Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ){
      deep = arguments[0];
      i++;
    }

    var merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    for ( ; i < length; i++ ) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;
  },

  // tot test if a string can be a JSON
  isJson: function(str) {
    try { JSON.parse(str);
    } catch(e) { return false; }
    return true;
  },

  // where all AB plugins are stored
  plugins: {}
};