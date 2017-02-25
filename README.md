# AB-mediaQuery
That's the JavaScript side of Media Queries on mobile first projects. It proposes you some very useful methods for your scripts.

It's used on French website [ENGIE](https://particuliers.engie.fr/).

Demo: [Codepen](http://codepen.io/lordfpx/pen/dXopOW?editors=0010)

NPM: https://www.npmjs.com/package/ab-mediaquery

> npm install ab-mediaquery

The plugin is CommonJS and AMD compliant, with no dependencies.

## Compatibility

Because of the usage of `matchMedia`, compatibility start with IE 10. To rise compatibility up to IE 9, you can add https://github.com/paulirish/matchMedia.js/ polyfill.

---

## SETUP

There are different ways to setup breakpoints and media queries rules. Default media queries are in **em** unit, here is why: http://zellwk.com/blog/media-query-units/

### Only JS with default settings

Simply call `abMediaQuery` function with no parameters:
```
abMediaQuery();
```

You can go further by changing default settings, see below (**More options**) for available options.

```
* small:      screen and (min-width: 0em)
* smallOnly:  screen and (max-width: 47.99em)
* medium:     screen and (min-width: 48em)
* mediumOnly: screen and (min-width: 48em) and (max-width: 64em)
* large:      screen and (min-width: 64.01em)
* largeOnly:  screen and (min-width: 64.01em) and (max-width: 80em)
* huge:       screen and (min-width: 80.01em)
* hugeOnly:   screen and (min-width: 80.01em) and (max-width: 90em)
```

### JS with Sass: The power in your hands ;-)

#### Sass setup

First, define default media queries rules:
```
// unit must be in 'em'
$ab-breakpoints: (
  small:  48em,
  medium: 64em,
  large:  80em,
  huge:   90em
);
```

OPTIONAL: Then you can add your own custom rules (even with other units like px or rem)
```
$ab-mq-myRules: (
  retina:         'screen and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  non-retina:     'not screen and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  my-media-query: 'screen and (min-width: 70em)',
  ...
);
```

Then import `_AB-mediaQuery.scss`:
```
@import 'path/to/AB-mediaQuery'
```

#### JS setup

Simple call `abMediaQuery` function with no parameters:
```
abMediaQuery();
```

#### More options

You can change default breakpoints values with `bp` object and the debounce time on window resize with `delay` option.

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

---

## USAGE

### Get current breakpoints

That will return an array of current breakpoints
```
AB.mediaQuery.current;
```

### Check specific breakpoint case
Check if window respects the breakpoint specified and return true/false. You can check default media queries generated by the plugin:
* small:      All
* smallOnly:  Mobiles only
* medium:     From tablets
* mediumOnly: Tablets only
* large:      From small desktops
* largeOnly:  Small desktops only
* huge:       From large desktops
* hugeOnly:   Large desktops only

But also your custom rules define in your Sass through `$ab-mq-myRules` variable will be checked:

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

### Return media query rule from breakpoint name
```
AB.mediaQuery.get('small');
```

