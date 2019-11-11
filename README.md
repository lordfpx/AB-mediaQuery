# AB-mediaQuery

**AB-mediaQuery** is the JavaScript side of Media queries. It's a very simple, yet very convenient tool for your developments.

This vanilla script is damn small: **less than 1 KB** (uglyfied and GZipped)!

Have a look at this [Codepen demonstration](https://codepen.io/lordfpx/pen/MeaWmV?editors=0010).

It's used on French websites of [ENGIE](https://particuliers.engie.fr) and [Gaz tarif règlementé](https://gaz-tarif-reglemente.fr/).

[![Maintainability](https://api.codeclimate.com/v1/badges/0d5481a675183a5d3c01/maintainability)](https://codeclimate.com/github/lordfpx/AB-mediaQuery/maintainability)


## Install

```bash
npm install --save ab-mediaquery
```


## Setup

Import in your JS bundle (webpack, ES6, browserify...):
```js
import abMediaQuery from 'ab-mediaquery';
```

(If you are not building your assets, simply load the script `AB-mediaQuery.min.js` in the `dist` folder.)

Init the script with:
```js
AB.plugins.mediaQuery({
  bp: {
    smallOnly:  'screen and (max-width: 767px)',
    mediumOnly: 'screen and (min-width: 768px) and (max-width: 1024px)',
    medium:     'screen and (min-width: 768px)',
    largeOnly:  'screen and (min-width: 1025px) and (max-width: 1280px)',
    large:      'screen and (min-width: 1025px)'
  }
});
```

Other example:

```js
AB.plugins.mediaQuery({
  bp: {
    tiny: "screen and (max-width: 575px)",
    small: "screen and (min-width: 576px)",
    medium: "screen and (min-width: 768px)",
    large: "screen and (min-width: 992px)",
    huge: "screen and (min-width: 1200px)"
  }
});
```


## Usage

- Get current breakpoints
  ```js
  AB.mediaQuery.current;
  // return an array of current breakpoints
  ```

- Check specific breakpoint case
  ```js
  AB.mediaQuery.is('mediumOnly');
  // will return true or false
  ```

- JavaScript event
  `changed.ab-mediaquery` event is triggered when media query changes, you can listen to it:

  ```js
  window.addEventListener('changed.ab-mediaquery', function(){
    ...
  });
  ```
