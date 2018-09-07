# AB-mediaQuery

AB-mediaQuery is the JavaScript side of Media Queries. It's very simple, yet convenient tool for your developments.

This is small, dependencie free and vanilla JavaScript. Version 1 is used in the French website of [ENGIE](https://particuliers.engie.fr).

It's damn small: **less than 900 bytes** (uglyfied and GZipped)!

Have a look at the [Codepen demonstration](https://codepen.io/lordfpx/pen/MeaWmV?editors=0010).

[![Maintainability](https://api.codeclimate.com/v1/badges/0d5481a675183a5d3c01/maintainability)](https://codeclimate.com/github/lordfpx/AB-mediaQuery/maintainability)

## Install

Install with npm:
```bash
npm install --save ab-mediaquery
````

Because of the usage of `matchMedia` and `requestAnimationFrame`, compatibility start from IE 10. To rise compatibility up to IE 9, you can add [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) and [requestAnimationFrame polyfill](https://gist.github.com/paulirish/1579671).


## Setup

### Install
Just import it in your JS bundle (webpack, ES6, browserify...):
```js
import abMediaQuery from 'ab-mediaquery';
```

Or loading the js right before `</body>` if you are not using a builder.


### Init

```js
abMediaQuery({
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
abMediaQuery({
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
