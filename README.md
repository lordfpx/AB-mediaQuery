<h1 align="center">AB-mediaQuery</h1>

<p align="center">
AB-mediaQuery is the JavaScript side of Media Queries. It proposes some useful methods for your responsive developments. This is a small, dependencie free and vanilla JavaScript components. Version 1 is used in the French website of <a href="https://particuliers.engie.fr" target="_blank">ENGIE</a>.
</p>

<p align="center">
It's damn small: <strong>less than 1000 bytes</strong> (uglyfied and GZipped).
</p>

<p align="center">
Have a look at the <a href="https://codepen.io/lordfpx/pen/MeaWmV?editors=0010" target="_blank">Codepen demonstration</a>.
</p>


<h2 align="center">Install</h2>

Install with npm:
```
npm install --save ab-mediaquery
````

Install with yarn:
```
yarn add ab-mediaquery
```

Because of the usage of `matchMedia` and `requestAnimationFrame`, compatibility start from IE 10. To rise compatibility up to IE 9, you can add [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) and [requestAnimationFrame polyfill](https://gist.github.com/paulirish/1579671).



<h2 align="center">Setup</h2>

You can then import it in your JS bundle (webpack, ES6, browserify...):
```js
import abMediaQuery from 'ab-mediaquery';
```

Or loading the js right before `</body>` if you are not using a builder.

Then call it from your JavaScript with your media queries:
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



<h2 align="center">Usage</h2>

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

