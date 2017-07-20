# AB-mediaQuery
AB-mediaQuery is the JavaScript side of Media Queries. It proposes some useful methods for your developments.

It's damn small: **less than 1000 bytes** (uglyfied and GZipped).

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

The v1 is used on the French website [ENGIE](https://particuliers.engie.fr/).

---

## Compatibility

Because of the usage of `matchMedia` and `requestAnimationFrame`, compatibility start with IE 10. To rise compatibility up to IE 9, you can add [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) and [requestAnimationFrame polyfill](https://gist.github.com/paulirish/1579671).

---

## SETUP

### Classic usage
Just load the script on your page, just before `</body>`.

**No need to load [another-brick](https://github.com/lordfpx/AB) since it's already included into AB-interchange. You can use its features of course.**

### As a module
The best solution is to use browserify or Webpack and import 'abMediaQuery'.

```
import abMediaQuery from 'ab-mediaquery';
```

### in both cases:
Simply call `abMediaQuery` function your break points based on your needs:

```
abMediaQuery({
  // freely define your media queries here
  bp: {
    smallOnly:  'screen and (max-width: 767px)',
    mediumOnly: 'screen and (min-width: 768px) and (max-width: 1024px)',
    medium:     'screen and (min-width: 768px)',
    largeOnly:  'screen and (min-width: 1025px) and (max-width: 1280px)',
    large:      'screen and (min-width: 1025px)'
  }
});
```

---

## USAGE

### Get current breakpoints
That will return an array of current breakpoints
```
AB.mediaQuery.current;
```

### Check specific breakpoint case
Check if the window respects the specified media query and return true/false.

```
AB.mediaQuery.is('mediumOnly');
// will return true or false
```

### JS event
'changed.ab-mediaquery' event is automatically triggered when media query changes, you can listen:

```
window.addEventListener('changed.ab-mediaquery', function(){
  ...
});
```

