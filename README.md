# AB-mediaQuery
That's the JavaScript side of Media Queries. It proposes you some very useful methods for your developments.

**This version 2 is a simplified and, hopefully, easier version to set up of AB-mediaQuery.**

Demo: [Codepen](https://codepen.io/lordfpx/pen/MeaWmV?editors=0010)

NPM: https://www.npmjs.com/package/ab-mediaquery

> npm install ab-mediaquery

The plugin is CommonJS and AMD compliant, with no dependencies.

## Compatibility

Because of the usage of `matchMedia`, compatibility start with IE 10. To rise compatibility up to IE 9, you can add https://github.com/paulirish/matchMedia.js/ polyfill.

---

## SETUP

There are different ways to setup media queries rules. I encourage you to use **em** units, here is why: http://zellwk.com/blog/media-query-units/

### Only JS with default settings

Simply call `abMediaQuery` function with some parameters:
```
abMediaQuery({
  // define your media queries here
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

Set a reasonable debounce delay to prevent too much browser work.

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
AB.mediaQuery.is('media-query-name-you-want-to-check);
```

### JS event
'changed.ab-mediaquery' event is automatically triggered when breakpoints change:

```
window.addEventListener('changed.ab-mediaquery', function(){
  ...
});
```

