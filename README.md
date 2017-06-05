# AB-mediaQuery
AB-mediaQuery is the JavaScript side of Media Queries. It proposes some useful methods for your developments.

**This is the version 2. It's meant to be simpler to setup that v1.**

- [Codepen demo](https://codepen.io/lordfpx/pen/MeaWmV?editors=0010)
- [NPM](https://www.npmjs.com/package/ab-mediaquery)

```
> npm install ab-mediaquery
```
or
```
> yarn add ab-mediaquery
```

The plugin is **CommonJS** and **AMD** compliant (UMD).

The only dependency is [anotherBrick](https://github.com/lordfpx/AB#readme). It's a tiny script used by all AB collection.

The v1 is used on French website [ENGIE](https://particuliers.engie.fr/).

---

## Compatibility

Because of the usage of `matchMedia`, compatibility start with IE 10. To rise compatibility up to IE 9, you can add https://github.com/paulirish/matchMedia.js/ polyfill.

---

## SETUP

### Classic usage
You need to put AB.js (from [anotherBrick](https://github.com/lordfpx/AB)) script before loading AB-mediaQuery.js.

### As a module
The best solution is to use browserify or Webpack. First import 'AB', then 'abMediaQuery'.

```
import AB from 'another-brick';
import abMediaQuery from 'ab-mediaquery';
```

### For both solutions
Simply call `abMediaQuery` function with some parameters:
```
abMediaQuery({
  // freely define your media queries here
  bp: {
    smallOnly: 'screen and (max-width: 767px)',
    mediumOnly: 'screen and (min-width: 768px) and (max-width: 1024px)',
    medium: 'screen and (min-width: 768px)',
    largeOnly: 'screen and (min-width: 1025px) and (max-width: 1280px)',
    large: 'screen and (min-width: 1025px)'
  },

  // the debounce delay on window resize (default 200)
  delay: 200
});
```

Set a reasonable debounce delay to keep good performances.

---

## USAGE

### Get current breakpoints
That will return an array of current breakpoints
```
AB.mediaQuery.current;
```

### Check specific breakpoint case
Check if window respects the specified media query and return true/false.

```
AB.mediaQuery.is('mediumOnly');
// will return true or false
```

### JS event
'changed.ab-mediaquery' event is automatically triggered when breakpoints change:

```
window.addEventListener('changed.ab-mediaquery', function(){
  ...
});
```

