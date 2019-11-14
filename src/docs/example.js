import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

AB.plugins.mediaQuery({
  bp: {
    smallOnly:  'screen and (max-width: 767px)',
    mediumOnly: 'screen and (min-width: 768px) and (max-width: 1024px)',
    medium:     'screen and (min-width: 768px)',
    largeOnly:  'screen and (min-width: 1025px) and (max-width: 1280px)',
    large:      'screen and (min-width: 1025px)'
  }
});

function jsMediaQueryLog() {
  var logMediaQuery = document.querySelector('.js-mediaquery');
  var log = [
    '<ul>',
    '<li>',
    '<p class="b">Current breakpoints (Array):</p>',
    '<code>'+ AB.mediaQuery.current +'</code>',
    '</li>',
    '<li>',
    '<p class="b">Is breakpoint "smallOnly"? (boolean)</p> ',
    // check if current breakpoint is the speciied one and return true/false
    '<code>'+ AB.mediaQuery.is('smallOnly') +'</code>',
    '</li>',
    '<li>',
    '<p class="b">Full AB.mediaQuery object:</p> ',
    '<pre><code>',
    JSON.stringify(AB.mediaQuery, null, 2),
    '</code></pre>',
    '</li>',
    '</ul>'
  ].join('');

  logMediaQuery.innerHTML = log;
}

jsMediaQueryLog();
console.log('Current breakpoints:', AB.mediaQuery.current);

// 'changed.ab-mediaquery' event is automatically triggered when breakpoint change
window.addEventListener('changed.ab-mediaquery', function(){
  jsMediaQueryLog();
  console.log('Current breakpoints:', AB.mediaQuery.current);
});
