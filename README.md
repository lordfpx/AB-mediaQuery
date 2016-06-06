# AB-mediaQuery
That's the JavaScript side of Media Queries. It proposes you some very useful methods for your scripts.
That plugin is in vanilla JS, with no dependencies.

Demo: [Codepen](http://codepen.io/lordfpx/pen/dXopOW?editors=0010)

NPM: https://www.npmjs.com/package/ab-mediaquery

> npm install ab-mediaquery

The plugin is CommonJS and AMD compliant.


## Usage

Define your breakpoints in your Sass or Less. include `AB-mediaQuery.scss` or `AB-mediaQuery.less` and edit breakpoints on your needs.

That must be in EM: http://zellwk.com/blog/media-query-units/. Here is a calculator if needed: http://pxtoem.com/


You then only need to call that function to create `AB.mediaQuery` object and bind the breakpoint 'watcher':
```
mediaQuery();
```

In case you don't want to use Sass/Less definition, you can specify breakpoints on initialization:
```
mediaQuery({
  small:    '480em',
  medium:   '1024em',
  large:    '1280em',
  huge:     '1440em'
});
```


## What you get

Return the current breakpoint. Can be 'tiny', 'small', 'medium', 'large' or 'huge':

```
AB.mediaQuery.current;
```

Check if window respects the breakpoint specified and return true/false. You can check:
* tiny
* tinyOnly
* small
* smallOnly
* medium
* mediumOnly
* large
* largeOnly
* huge

```
AB.mediaQuery.is('smallOnly');
```

'changed.ab-mediaquery' event is automatically triggered when breakpoint change:
```
window.addEventListener('changed.ab-mediaquery', function(){
  ...
});
```

Return media query rule from breakpoint name:
```
AB.mediaQuery.get('small');
```

