# AB-mediaQuery
That's the JavaScript side of **Media Queries on mobile first projects**. It proposes you some very useful methods for your scripts.

Demo: [Codepen](http://codepen.io/lordfpx/pen/dXopOW?editors=0010)

NPM: https://www.npmjs.com/package/ab-mediaquery

> npm install ab-mediaquery

The plugin is **CommonJS** and **AMD** compliant, in **vanilla JS**, with **no dependencies**.

---

## Compatibility

Because of the usage of `matchMedia`, compatibility start with IE 10. To rise compatibility up to IE 9, you can add https://github.com/paulirish/matchMedia.js polyfill.

---

## SETUP

There are different ways to setup breakpoints and media queries rules. Default media queries are in **em** unit, here is why: http://zellwk.com/blog/media-query-units


### **Only JS with default settings**

Simply call `abMediaQuery` function:

```
abMediaQuery();
```

You can go further by changing default settings. You can change default breakpoints values in `bp` object and the debounce time on window resize with `delay` option.

```
abMediaQuery({
  bp: {
    small:  48em,
    medium: 64em,
    large:  80em,
    huge:   90em
  },
  delay: 200
});
```

**Beware**, you will need to use same media queries in your CSS. Here are media queries that will be generated on JS side. **Please, reflect them in your CSS**:
```
* small:      screen and (min-width: 0em)
* smallOnly:  screen and (max-width: 47.99em)
* medium:     screen and (min-width: 48em)
* mediumOnly: screen and (min-width: 48em) and (max-width: 63.99em)
* large:      screen and (min-width: 64em)
* largeOnly:  screen and (min-width: 64em) and (max-width: 79.99em)
* huge:       screen and (min-width: 80em)
* hugeOnly:   screen and (min-width: 80em) and (max-width: 89.99em)
```

### **JS and Sass: recommanded method**

#### Sass setup

First, define default media queries rules in **em**:

```
$ab-breakpoints: (
  small:  48em,
  medium: 64em,
  large:  80em,
  huge:   90em
);
```

OPTIONAL: Then you can add your own custom rules (even with other units like **px** or **rem**):

```
$ab-mq-myRules: (
  retina:         'screen and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  non-retina:     'not screen and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  my-media-query: 'screen and (min-width: 70em)',
  ...
);
```

Then import `_AB-mediaQuery.scss` in your SASS:

```
@import 'path/to/AB-mediaQuery'
```

#### JS setup

Simple call `abMediaQuery` function with no parameters (except `delay` if you want):

```
abMediaQuery();
```


---

## USAGE

### Current breakpoints

That will return an array of current breakpoints:

```
AB.mediaQuery.current;
```

### Check specific breakpoint case

Check if window respects the breakpoint specified and return **true/false**.

```
AB.mediaQuery.is('media-query-name-you-want-to-check);
```

### JS event
'changed.ab-mediaquery' event is automatically fired when the breakpoint change:

```
window.addEventListener('changed.ab-mediaquery', function(){
  ...
});
```

### Return the media query rule from breakpoint name

```
AB.mediaQuery.get('small');
```

