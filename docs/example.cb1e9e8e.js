parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"f6Zb":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3],a="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},n=function(e){var a=/\blang(?:uage)?-([\w-]+)\b/i,n=0,t={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof r?new r(e.type,t.util.encode(e.content),e.alias):Array.isArray(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(a,n){var r,i,o=t.util.type(a);switch(n=n||{},o){case"Object":if(i=t.util.objId(a),n[i])return n[i];for(var l in r={},n[i]=r,a)a.hasOwnProperty(l)&&(r[l]=e(a[l],n));return r;case"Array":return i=t.util.objId(a),n[i]?n[i]:(r=[],n[i]=r,a.forEach(function(a,t){r[t]=e(a,n)}),r);default:return a}}},languages:{extend:function(e,a){var n=t.util.clone(t.languages[e]);for(var r in a)n[r]=a[r];return n},insertBefore:function(e,a,n,r){var i=(r=r||t.languages)[e],o={};for(var l in i)if(i.hasOwnProperty(l)){if(l==a)for(var s in n)n.hasOwnProperty(s)&&(o[s]=n[s]);n.hasOwnProperty(l)||(o[l]=i[l])}var g=r[e];return r[e]=o,t.languages.DFS(t.languages,function(a,n){n===g&&a!=e&&(this[a]=o)}),o},DFS:function e(a,n,r,i){i=i||{};var o=t.util.objId;for(var l in a)if(a.hasOwnProperty(l)){n.call(a,l,a[l],r||l);var s=a[l],g=t.util.type(s);"Object"!==g||i[o(s)]?"Array"!==g||i[o(s)]||(i[o(s)]=!0,e(s,n,l,i)):(i[o(s)]=!0,e(s,n,null,i))}}},plugins:{},highlightAll:function(e,a){t.highlightAllUnder(document,e,a)},highlightAllUnder:function(e,a,n){var r={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};t.hooks.run("before-highlightall",r);for(var i,o=e.querySelectorAll(r.selector),l=0;i=o[l++];)t.highlightElement(i,!0===a,r.callback)},highlightElement:function(n,r,i){for(var o,l="none",s=n;s&&!a.test(s.className);)s=s.parentNode;s&&(l=(s.className.match(a)||[,"none"])[1].toLowerCase(),o=t.languages[l]),n.className=n.className.replace(a,"").replace(/\s+/g," ")+" language-"+l,n.parentNode&&(s=n.parentNode,/pre/i.test(s.nodeName)&&(s.className=s.className.replace(a,"").replace(/\s+/g," ")+" language-"+l));var g={element:n,language:l,grammar:o,code:n.textContent},c=function(e){g.highlightedCode=e,t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,t.hooks.run("after-highlight",g),t.hooks.run("complete",g),i&&i.call(g.element)};if(t.hooks.run("before-sanity-check",g),g.code)if(t.hooks.run("before-highlight",g),g.grammar)if(r&&e.Worker){var u=new Worker(t.filename);u.onmessage=function(e){c(e.data)},u.postMessage(JSON.stringify({language:g.language,code:g.code,immediateClose:!0}))}else c(t.highlight(g.code,g.grammar,g.language));else c(t.util.encode(g.code));else t.hooks.run("complete",g)},highlight:function(e,a,n){var i={code:e,grammar:a,language:n};return t.hooks.run("before-tokenize",i),i.tokens=t.tokenize(i.code,i.grammar),t.hooks.run("after-tokenize",i),r.stringify(t.util.encode(i.tokens),i.language)},matchGrammar:function(e,a,n,i,o,l,s){for(var g in n)if(n.hasOwnProperty(g)&&n[g]){if(g==s)return;var c=n[g];c="Array"===t.util.type(c)?c:[c];for(var u=0;u<c.length;++u){var h=c[u],d=h.inside,f=!!h.lookbehind,m=!!h.greedy,p=0,y=h.alias;if(m&&!h.pattern.global){var v=h.pattern.toString().match(/[imuy]*$/)[0];h.pattern=RegExp(h.pattern.source,v+"g")}h=h.pattern||h;for(var k=i,b=o;k<a.length;b+=a[k].length,++k){var w=a[k];if(a.length>e.length)return;if(!(w instanceof r)){if(m&&k!=a.length-1){if(h.lastIndex=b,!(j=h.exec(e)))break;for(var A=j.index+(f?j[1].length:0),O=j.index+j[0].length,x=k,N=b,P=a.length;x<P&&(N<O||!a[x].type&&!a[x-1].greedy);++x)A>=(N+=a[x].length)&&(++k,b=N);if(a[k]instanceof r)continue;S=x-k,w=e.slice(b,N),j.index-=b}else{h.lastIndex=0;var j=h.exec(w),S=1}if(j){f&&(p=j[1]?j[1].length:0);O=(A=j.index+p)+(j=j[0].slice(p)).length;var E=w.slice(0,A),C=w.slice(O),M=[k,S];E&&(++k,b+=E.length,M.push(E));var W=new r(g,d?t.tokenize(j,d):j,y,j,m);if(M.push(W),C&&M.push(C),Array.prototype.splice.apply(a,M),1!=S&&t.matchGrammar(e,a,n,k,b,!0,g),l)break}else if(l)break}}}}},tokenize:function(e,a){var n=[e],r=a.rest;if(r){for(var i in r)a[i]=r[i];delete a.rest}return t.matchGrammar(e,n,a,0,0,!1),n},hooks:{all:{},add:function(e,a){var n=t.hooks.all;n[e]=n[e]||[],n[e].push(a)},run:function(e,a){var n=t.hooks.all[e];if(n&&n.length)for(var r,i=0;r=n[i++];)r(a)}},Token:r};function r(e,a,n,t,r){this.type=e,this.content=a,this.alias=n,this.length=0|(t||"").length,this.greedy=!!r}if(e.Prism=t,r.stringify=function(e,a){if("string"==typeof e)return e;if(Array.isArray(e))return e.map(function(e){return r.stringify(e,a)}).join("");var n={type:e.type,content:r.stringify(e.content,a),tag:"span",classes:["token",e.type],attributes:{},language:a};if(e.alias){var i=Array.isArray(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(n.classes,i)}t.hooks.run("wrap",n);var o=Object.keys(n.attributes).map(function(e){return e+'="'+(n.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+n.tag+' class="'+n.classes.join(" ")+'"'+(o?" "+o:"")+">"+n.content+"</"+n.tag+">"},!e.document)return e.addEventListener?(t.disableWorkerMessageHandler||e.addEventListener("message",function(a){var n=JSON.parse(a.data),r=n.language,i=n.code,o=n.immediateClose;e.postMessage(t.highlight(i,t.languages[r],r)),o&&e.close()},!1),t):t;var i=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return i&&(t.filename=i.src,t.manual||i.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(t.highlightAll):window.setTimeout(t.highlightAll,16):document.addEventListener("DOMContentLoaded",t.highlightAll))),t}(a);"undefined"!=typeof module&&module.exports&&(module.exports=n),void 0!==e&&(e.Prism=n);
},{}],"mgKa":[function(require,module,exports) {
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
},{}],"gVCx":[function(require,module,exports) {
Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.js=Prism.languages.javascript;
},{}],"oOkP":[function(require,module,exports) {

},{}],"Zdfz":[function(require,module,exports) {
"use strict";var e=r(require("prismjs/components/prism-core"));function r(e){return e&&e.__esModule?e:{default:e}}function i(){var e=document.querySelector(".js-mediaquery"),r=["<ul>","<li>",'<p class="b">Current breakpoints (Array):</p>',"<code>"+AB.mediaQuery.current+"</code>","</li>","<li>",'<p class="b">Is breakpoint "smallOnly"? (boolean)</p> ',"<code>"+AB.mediaQuery.is("smallOnly")+"</code>","</li>","<li>",'<p class="b">Full AB.mediaQuery object:</p> ',"<pre><code>",JSON.stringify(AB.mediaQuery,null,2),"</code></pre>","</li>","</ul>"].join("");e.innerHTML=r}require("prismjs/components/prism-clike"),require("prismjs/components/prism-javascript"),require("prismjs/themes/prism.css"),AB.plugins.mediaQuery({bp:{smallOnly:"screen and (max-width: 767px)",mediumOnly:"screen and (min-width: 768px) and (max-width: 1024px)",medium:"screen and (min-width: 768px)",largeOnly:"screen and (min-width: 1025px) and (max-width: 1280px)",large:"screen and (min-width: 1025px)"}}),i(),console.log("Current breakpoints:",AB.mediaQuery.current),window.addEventListener("changed.ab-mediaquery",function(){i(),console.log("Current breakpoints:",AB.mediaQuery.current)});
},{"prismjs/components/prism-core":"f6Zb","prismjs/components/prism-clike":"mgKa","prismjs/components/prism-javascript":"gVCx","prismjs/themes/prism.css":"oOkP"}]},{},["Zdfz"], null)