(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var p=this||self;function aa(a){a=a.s;const b=encodeURIComponent;let c="";a.platform&&(c+="&uap="+b(a.platform));a.platformVersion&&(c+="&uapv="+b(a.platformVersion));a.uaFullVersion&&(c+="&uafv="+b(a.uaFullVersion));a.architecture&&(c+="&uaa="+b(a.architecture));a.model&&(c+="&uam="+b(a.model));a.bitness&&(c+="&uab="+b(a.bitness));a.fullVersionList&&(c+="&uafvl="+b(a.fullVersionList.map(d=>b(d.brand)+";"+b(d.version)).join("|")));"undefined"!==typeof a.wow64&&(c+="&uaw="+Number(a.wow64));return c}
function ba(a,b){return a.h?a.m.slice(0,a.h.index)+b+a.m.slice(a.h.index):a.m+b}function ca(a){let b="&act=1&ri=1";a.i&&a.s&&(b+=aa(a));return ba(a,b)}function ea(a,b){return a.i&&a.j||a.o?1==b?a.i?a.j:ba(a,"&dct=1"):2==b?ba(a,"&ri=2"):ba(a,"&ri=16"):a.m}
var fa=class{constructor({url:a,X:b}){this.m=a;this.s=b;b=/[?&]dsh=1(&|$)/.test(a);this.i=!b&&/[?&]ae=1(&|$)/.test(a);this.o=!b&&/[?&]ae=2(&|$)/.test(a);if((this.h=/[?&]adurl=([^&]*)/.exec(a))&&this.h[1]){let c;try{c=decodeURIComponent(this.h[1])}catch(d){c=null}this.j=c}}};function q(a){var b;a:{if(b=p.navigator)if(b=b.userAgent)break a;b=""}return-1!=b.indexOf(a)};var r=class{constructor(a,b){this.h=b===ha?a:""}toString(){return this.h.toString()}};r.prototype.i=!0;var ia;try{new URL("s://g"),ia=!0}catch(a){ia=!1}var ka=ia,ha={},la=new r("about:invalid#zClosurez",ha);function ma(a,b){a:{const c=a.length,d="string"===typeof a?a.split(""):a;for(let f=0;f<c;f++)if(f in d&&b.call(void 0,d[f],f,a)){b=f;break a}b=-1}return 0>b?null:"string"===typeof a?a.charAt(b):a[b]};function na(a){let b=!1,c;return function(){b||(c=a(),b=!0);return c}};function oa(a,b){if(!(b instanceof r||b instanceof r)){b="object"==typeof b&&b.i?b.h.toString():String(b);b:{var c=b;if(ka){try{var d=new URL(c)}catch(f){c="https:";break b}c=d.protocol}else c:{d=document.createElement("a");try{d.href=c}catch(f){c=void 0;break c}c=d.protocol;c=":"===c||""===c?"https:":c}}"javascript:"===c&&(b="about:invalid#zClosurez");b=new r(b,ha)}a.href=b instanceof r&&b.constructor===r?b.h:"type_error:SafeUrl"};/*

 SPDX-License-Identifier: Apache-2.0
*/
class pa{constructor(a){this.ea=a}}function u(a){return new pa(b=>b.substr(0,a.length+1).toLowerCase()===a+":")}const qa=new pa(a=>/^[^:]*([/?#]|$)/.test(a));var ra=u("http"),sa=u("https"),ta=u("ftp"),ua=u("mailto"),va=u("intent"),wa=u("market"),xa=u("itms"),ya=u("itms-appss");const za=[u("data"),ra,sa,ua,ta,qa];function Aa(a,b=za){for(let c=0;c<b.length;++c){const d=b[c];if(d instanceof pa&&d.ea(a))return new r(a,ha)}}function Ba(a,b=za){return Aa(a,b)||la};function Da(){return q("iPhone")&&!q("iPod")&&!q("iPad")};function Ea(a){Ea[" "](a);return a}Ea[" "]=function(){};var Fa=Da(),Ga=q("iPad");var Ha=Da()||q("iPod"),Ia=q("iPad");var Ja={},Ka=null;
function La(a,b){void 0===b&&(b=0);if(!Ka){Ka={};for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),d=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var e=c.concat(d[f].split(""));Ja[f]=e;for(var g=0;g<e.length;g++){var h=e[g];void 0===Ka[h]&&(Ka[h]=g)}}}b=Ja[b];c=Array(Math.floor(a.length/3));d=b[64]||"";for(f=e=0;e<a.length-2;e+=3){var m=a[e],k=a[e+1];h=a[e+2];g=b[m>>2];m=b[(m&3)<<4|k>>4];k=b[(k&15)<<2|h>>6];h=b[h&63];c[f++]=g+m+k+h}g=0;h=d;switch(a.length-e){case 2:g=
a[e+1],h=b[(g&15)<<2]||d;case 1:a=a[e],c[f]=b[a>>2]+b[(a&3)<<4|g>>4]+h+d}return c.join("")};var Ma="undefined"!==typeof Uint8Array;const Na=!(q("Trident")||q("MSIE"))&&"function"===typeof p.btoa;const v=Symbol();function w(a,b){if(v)return a[v]|=b;if(void 0!==a.v)return a.v|=b;Object.defineProperties(a,{v:{value:b,configurable:!0,writable:!0,enumerable:!1}});return b}function Oa(a){v?a[v]&&(a[v]&=-17):void 0!==a.v&&(a.v&=-17)}function x(a){let b;v?b=a[v]:b=a.v;return null==b?0:b}function y(a,b){v?a[v]=b:void 0!==a.v?a.v=b:Object.defineProperties(a,{v:{value:b,configurable:!0,writable:!0,enumerable:!1}})}function Pa(a){w(a,1);return a}function z(a){return!!(x(a)&2)}
function B(a){w(a,18);return a}function Qa(a){w(a,16);return a}function Ra(a,b){y(b,(a|0)&-51)}function Sa(a,b){y(b,(a|18)&-41)};var Ta={};function Ua(a){return null!==a&&"object"===typeof a&&!Array.isArray(a)&&a.constructor===Object}let Va;var C;const Wa=[];y(Wa,23);C=Object.freeze(Wa);class Xa{constructor(a){this.S=0;this.R=a}next(){return this.S<this.R.length?{done:!1,value:this.R[this.S++]}:{done:!0,value:void 0}}[Symbol.iterator](){return this}}function Ya(a){var b=a.length;(b=b?a[b-1]:void 0)&&Ua(b)?b.g=1:a.push({g:1})};function Za(a,b,c,d){let f=!1;if(null!=a&&"object"===typeof a&&!(f=Array.isArray(a))&&a.J===Ta)return a;if(!f)return c?d&2?(a=b[$a])?b=a:(a=new b,B(a.l),b=b[$a]=a):b=new b:b=void 0,b;ab(a,d);return new b(a)}function ab(a,b){const c=x(a);let d=c;0===d&&(d|=b&16);d|=b&2;d!==c&&y(a,d)}const $a=Symbol();function D(a){return Array.from(a.h.keys()).sort(bb)}function gb(a,b=ib){const c=D(a);for(let d=0;d<c.length;d++){const f=c[d],e=a.h.get(c[d]);c[d]=[b(f),b(e)]}return c}function jb(a,b=ib){const c=[];a=a.h.entries();for(var d;!(d=a.next()).done;)d=d.value,d[0]=b(d[0]),d[1]=b(d[1]),c.push(d);return c}
var E=class{constructor(a,b,c,d=kb){c=x(a);c|=32;y(a,c);this.i=c;this.j=(this.m=b)?lb:nb;this.s=d;this.h=b=new Map;for(d=0;d<a.length;d++)c=a[d],b.set(c[0],c[1]);this.size=b.size}entries(){const a=D(this);for(let b=0;b<a.length;b++){const c=a[b];a[b]=[c,this.get(c)]}return new Xa(a)}keys(){const a=D(this);return new Xa(a)}values(){const a=D(this);for(let b=0;b<a.length;b++)a[b]=this.get(a[b]);return new Xa(a)}forEach(a,b){const c=D(this);for(let d=0;d<c.length;d++){const f=c[d];a.call(b,this.get(f),
f,this)}}set(a,b){if(this.i&2)throw Error("Cannot mutate an immutable Map");const c=this.h;if(null==b)return c.delete(a),this;c.set(a,this.j(b,this.m,this.o,this.i));this.size=c.size;return this}get(a){const b=this.h;if(b.has(a)){var c=b.get(a),d=this.i,f=this.m;f&&Array.isArray(c)&&d&16&&Qa(c);d=this.j(c,f,this.o,d);d!==c&&b.set(a,d);return d}}has(a){return this.h.has(a)}[Symbol.iterator](){return this.entries()}};function bb(a,b){a=""+a;b=""+b;return a>b?1:a<b?-1:0}
function lb(a,b,c,d){a=Za(a,b,!0,d);c&&(a=ob(a));return a}function nb(a){return a}function kb(a){return a}function ib(a){return a};function pb(a){const b=a.i+a.A;return a.u||(a.u=a.l[b]={})}function F(a,b,c){return-1===b?null:b>=a.i?a.u?a.u[b]:void 0:c&&a.u&&(c=a.u[b],null!=c)?c:a.l[b+a.A]}function G(a,b,c,d){if(x(a.l)&2)throw Error();return H(a,b,c,d)}function H(a,b,c,d){a.j&&(a.j=void 0);if(b>=a.i||d)return pb(a)[b]=c,a;a.l[b+a.A]=c;(c=a.u)&&b in c&&delete c[b];return a}
function qb(a,b,c,d,f){let e=F(a,b,d);Array.isArray(e)||(e=C);const g=x(e);g&1||Pa(e);if(f)g&2||B(e),c&1||Object.freeze(e);else{f=!(c&2);const h=g&2;c&1||!h?f&&g&16&&!h&&Oa(e):(e=Pa(Array.prototype.slice.call(e)),H(a,b,e,d))}return e}
function rb(a,b){const c=z(a.l);let d=qb(a,b,1,!1,c),f=x(d);if(!(f&4)){Object.isFrozen(d)&&(d=Pa(d.slice()),H(a,b,d,!1));let e=0,g=0;for(;e<d.length;e++){const h=d[e];null!=h&&(d[g++]=h)}g<e&&(d.length=g);f|=5;c&&(f|=18);y(d,f);f&2&&Object.freeze(d)}!c&&(f&2||Object.isFrozen(d))&&(d=Array.prototype.slice.call(d),w(d,5),H(a,b,d,!1));return d}let sb;
function tb(a,b,c){{const g=z(a.l);b:{var d=F(a,b),f=g,e=!1;if(null==d){if(f){a=sb||(sb=new E(B([])));break b}d=[]}else if(d.constructor===E){if(0==(d.i&2)||f){a=d;break b}d=jb(d)}else Array.isArray(d)?e=z(d):d=[];if(f){if(!d.length){a=sb||(sb=new E(B([])));break b}e||(e=!0,B(d))}else if(e)for(e=!1,d=Array.prototype.slice.call(d),f=0;f<d.length;f++){const h=d[f]=Array.prototype.slice.call(d[f]);Array.isArray(h[1])&&(h[1]=B(h[1]))}e||(x(d)&32?Oa(d):x(a.l)&16&&Qa(d));e=new E(d,c);H(a,b,e,!1);a=e}null==
a?c=a:(!g&&c&&(a.o=!0),c=a)}return c}function J(a,b,c){const d=F(a,c,!1);b=Za(d,b,!1,x(a.l));b!==d&&null!=b&&H(a,c,b,!1);return b}function K(a,b,c){b=J(a,b,c);if(null==b)return b;if(!z(a.l)){const d=ob(b);d!==b&&(b=d,H(a,c,b,!1))}return b}
function ub(a){var b=x(a.l),c=!!(b&2);var d=vb,f=!!(b&2);a.h||(a.h={});var e=a.h[7];var g=qb(a,7,3,void 0,f);if(e)f||(f=Object.isFrozen(e),c&&!f?Object.freeze(e):!c&&f&&(e=Array.prototype.slice.call(e),a.h[7]=e));else{var h=g;e=[];f=!!(b&2);g=!!(x(h)&2);const l=h;!f&&g&&(h=Array.prototype.slice.call(h));var m=b|(g?2:0);b=g;let t=0;for(;t<h.length;t++){var k=h[t];var n=d;Array.isArray(k)?(ab(k,m),k=new n(k)):k=void 0;void 0!==k&&(b||(b=!!(2&x(k.l))),e.push(k))}a.h[7]=e;m=x(h);d=m|33;d=b?d&-9:d|8;m!=
d&&(b=h,Object.isFrozen(b)&&(b=Array.prototype.slice.call(b)),y(b,d),h=b);l!==h&&H(a,7,h);(f||c&&g)&&B(e);c&&Object.freeze(e)}a=qb(a,7,3,void 0,c);if(!(c||x(a)&8)){for(c=0;c<e.length;c++)f=e[c],g=ob(f),f!==g&&(e[c]=g,a[c]=g.l);w(a,8)}return e}
function wb(a,b,c,d){if(x(a.l)&2)throw Error();var f=null==c?C:Pa([]);if(null!=c){var e=!!c.length;for(var g=0;g<c.length;g++){const h=c[g];e=e&&!z(h.l);f[g]=h.l}e=(e?8:0)|1;g=x(f);(g&e)!==e&&(Object.isFrozen(f)&&(f=Array.prototype.slice.call(f)),y(f,g|e));a.h||(a.h={});a.h[b]=c}else a.h&&(a.h[b]=void 0);return H(a,b,f,d)}function L(a,b){return null==a?b:a}function M(a,b){return L(F(a,b),"")}function P(a,b){a=F(a,b);return L(null==a?a:!!a,!1)}function R(a,b,c=0){return L(F(a,b),c)};let xb;function yb(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "object":if(a)if(Array.isArray(a)){if(0!==(x(a)&128))return a=Array.prototype.slice.call(a),Ya(a),a}else{if(Ma&&null!=a&&a instanceof Uint8Array){if(Na){for(var b="";10240<a.length;)b+=String.fromCharCode.apply(null,a.subarray(0,10240)),a=a.subarray(10240);b+=String.fromCharCode.apply(null,a);a=btoa(b)}else a=La(a);return a}if(a instanceof E)return gb(a)}}return a};function zb(a,b,c,d){if(null!=a){if(Array.isArray(a))a=Ab(a,b,c,void 0!==d);else if(Ua(a)){const f={};for(let e in a)f[e]=zb(a[e],b,c,d);a=f}else a=b(a,d);return a}}function Ab(a,b,c,d){const f=x(a);d=d?!!(f&16):void 0;a=Array.prototype.slice.call(a);for(let e=0;e<a.length;e++)a[e]=zb(a[e],b,c,d);c(f,a);return a}function Bb(a){return zb(a,Cb,Db)}function Cb(a){return a.J===Ta?a.toJSON():a instanceof E?gb(a,Bb):yb(a)}function Db(a,b){a&128&&Ya(b)};function Eb(a,b,c=Sa){if(null!=a){if(Ma&&a instanceof Uint8Array)return b?a:new Uint8Array(a);if(Array.isArray(a)){const d=x(a);if(d&2)return a;if(b&&!(d&32)&&(d&16||0===d))return y(a,d|18),a;a=Ab(a,Eb,d&4?Sa:c,!0);b=x(a);b&4&&b&2&&Object.freeze(a);return a}a.J===Ta?a=Fb(a):a instanceof E&&(b=B(jb(a,Eb)),a=new E(b,a.m,a.j,a.s));return a}}
function Gb(a,b,c,d,f,e,g){(a=a.h&&a.h[c])?(d=x(a),d&2?d=a:(e=Array.prototype.map.call(a,Fb,void 0),Sa(d,e),Object.freeze(e),d=e),wb(b,c,d,f)):G(b,c,Eb(d,e,g),f)}function Fb(a){if(z(a.l))return a;a=Hb(a,!0);B(a.l);return a}
function Hb(a,b){const c=a.l;var d=Qa([]),f=a.constructor.h;f&&d.push(f);f=a.u;if(f){d.length=c.length;d.fill(void 0,d.length,c.length);var e={};d[d.length-1]=e}0!==(x(c)&128)&&Ya(d);b=b||z(a.l)?Sa:Ra;e=a.constructor;xb=d;d=new e(d);xb=void 0;a.U&&(d.U=a.U.slice());e=!!(x(c)&16);const g=f?c.length-1:c.length;for(let h=0;h<g;h++)Gb(a,d,h-a.A,c[h],!1,e,b);if(f)for(const h in f)Gb(a,d,+h,f[h],!0,e,b);return d}function ob(a){if(!z(a.l))return a;const b=Hb(a,!1);b.j=a;return b};function Ib(a){Va=!0;try{return JSON.stringify(a.toJSON(),Jb)}finally{Va=!1}}
var S=class{constructor(a,b,c){null==a&&(a=xb);xb=void 0;var d=this.constructor.h;if(null==a){a=d?[d]:[];var f=!0;y(a,48)}else{if(!Array.isArray(a))throw Error();if(d&&d!==a[0])throw Error();var e=w(a,0)|32;f=0!==(16&e);if(128&e)throw Error();y(a,e)}this.A=d?0:-1;this.h=void 0;this.l=a;a:{e=this.l.length;d=e-1;if(e&&(e=this.l[d],Ua(e))){this.u=e;this.i=d-this.A;break a}void 0!==b&&-1<b?(this.i=Math.max(b,d+1-this.A),this.u=void 0):this.i=Number.MAX_VALUE}if(this.u&&"g"in this.u)throw Error('Unexpected "g" flag in sparse object of message that is not a group type.');
if(c){b=f&&!0;f=this.i;let h;for(d=0;d<c.length;d++)if(e=c[d],e<f){e+=this.A;var g=a[e];g?Kb(g,b):a[e]=C}else h||(h=pb(this)),(g=h[e])?Kb(g,b):h[e]=C}}toJSON(){const a=this.l;return Va?a:Ab(a,Cb,Db)}};function Kb(a,b){if(Array.isArray(a)){var c=x(a),d=1;!b||c&2||(d|=16);(c&d)!==d&&y(a,c|d)}}S.prototype.J=Ta;S.prototype.toString=function(){return this.l.toString()};function Jb(a,b){return yb(b)};var Lb=class extends S{constructor(){super()}};var Mb=class extends S{constructor(a){super(a)}};var Nb=class extends S{constructor(a){super(a)}};var vb=class extends S{constructor(a){super(a)}B(){return M(this,3)}W(a){G(this,5,a)}};var T=class extends S{constructor(a){super(a)}B(){return M(this,1)}W(a){G(this,2,a)}};var Ob=class extends S{constructor(a){super(a)}};var Qb=class extends S{constructor(a){super(a,-1,Pb)}},Pb=[6,7];var Sb=class extends S{constructor(a){super(a,-1,Rb)}},Rb=[17];var Tb=class extends S{constructor(a){super(a)}};var Ub=class extends S{constructor(){super()}};var Vb={capture:!0},Wb={passive:!0},Xb=na(function(){let a=!1;try{const b=Object.defineProperty({},"passive",{get:function(){a=!0}});p.addEventListener("test",null,b)}catch(b){}return a});function Yb(a){return a?a.passive&&Xb()?a:a.capture||!1:!1}function U(a,b,c,d){a.addEventListener&&a.addEventListener(b,c,Yb(d))};function Zb(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)};var $b=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ac(a){var b=a.indexOf("#");0>b&&(b=a.length);var c=a.indexOf("?");if(0>c||c>b){c=b;var d=""}else d=a.substring(c+1,b);return[a.slice(0,c),d,a.slice(b)]}function bc(a,b){return b?a?a+"&"+b:b:a}function cc(a,b){if(!b)return a;a=ac(a);a[1]=bc(a[1],b);return a[0]+(a[1]?"?"+a[1]:"")+a[2]}
function dc(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)dc(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}function ec(a){var b=[],c;for(c in a)dc(c,a[c],b);return b.join("&")}function fc(){var a=Zb();a=null!=a?"="+encodeURIComponent(String(a)):"";return cc("https://pagead2.googlesyndication.com/pagead/gen_204","zx"+a)}var gc=/#|$/;
function hc(a,b){var c=a.search(gc);a:{var d=0;for(var f=b.length;0<=(d=a.indexOf(b,d))&&d<c;){var e=a.charCodeAt(d-1);if(38==e||63==e)if(e=a.charCodeAt(d+f),!e||61==e||38==e||35==e)break a;d+=f+1}d=-1}if(0>d)return null;f=a.indexOf("&",d);if(0>f||f>c)f=c;d+=b.length+1;return decodeURIComponent(a.slice(d,-1!==f?f:0).replace(/\+/g," "))}
function ic(a,b){a=ac(a);var c=a[1],d=[];c&&c.split("&").forEach(function(f){var e=f.indexOf("=");b.hasOwnProperty(0<=e?f.slice(0,e):f)||d.push(f)});a[1]=bc(d.join("&"),ec(b));return a[0]+(a[1]?"?"+a[1]:"")+a[2]};function jc(a,b){if(a)for(const c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(a[c],c,a)}var kc=a=>{a.preventDefault?a.preventDefault():a.returnValue=!1};let lc=[];const mc=()=>{const a=lc;lc=[];for(const b of a)try{b()}catch(c){}};
var rc=a=>{lc.push(a);1==lc.length&&(window.Promise?Promise.resolve().then(mc):window.setImmediate?setImmediate(mc):setTimeout(mc,0))},sc=a=>{var b=V;"complete"===b.readyState||"interactive"===b.readyState?rc(a):b.addEventListener("DOMContentLoaded",a)},tc=a=>{var b=window;"complete"===b.document.readyState?rc(a):b.addEventListener("load",a)};function uc(a=document){return a.createElement("img")};function vc(a,b,c=null,d=!1){wc(a,b,c,d)}function wc(a,b,c,d){a.google_image_requests||(a.google_image_requests=[]);const f=uc(a.document);if(c||d){const e=g=>{c&&c(g);if(d){g=a.google_image_requests;const h=Array.prototype.indexOf.call(g,f,void 0);0<=h&&Array.prototype.splice.call(g,h,1)}f.removeEventListener&&f.removeEventListener("load",e,Yb());f.removeEventListener&&f.removeEventListener("error",e,Yb())};U(f,"load",e);U(f,"error",e)}f.src=b;a.google_image_requests.push(f)}
function xc(a,b){var c;if(c=a.navigator)c=a.navigator.userAgent,c=/Chrome/.test(c)&&!/Edge/.test(c)?!0:!1;c&&a.navigator.sendBeacon?a.navigator.sendBeacon(b):vc(a,b,void 0,!1)};let yc=0;function zc(a){return(a=Ac(a,document.currentScript))&&a.getAttribute("data-jc-version")||"unknown"}function Ac(a,b=null){return b&&b.getAttribute("data-jc")===String(a)?b:document.querySelector(`[${"data-jc"}="${a}"]`)}
function Bc(a){if(!(.01<Math.random())){const b=Ac(a,document.currentScript);a=`https://${b&&"true"===b.getAttribute("data-jc-rcd")?"pagead2.googlesyndication-cn.com":"pagead2.googlesyndication.com"}/pagead/gen_204?id=jca&jc=${a}&version=${zc(a)}&sample=${.01}`;xc(window,a)}};var V=document,W=window;const Cc=[ra,sa,ua,ta,qa,wa,xa,va,ya];function Dc(a,b){if(a instanceof r)return a;const c=Ba(a,Cc);c===la&&b(a);return c}var Ec=a=>{var b=`${"http:"===W.location.protocol?"http:":"https:"}//${"pagead2.googlesyndication.com"}/pagead/gen_204`;return c=>{c=ec({id:"unsafeurl",ctx:a,url:c});c=cc(b,c);navigator.sendBeacon&&navigator.sendBeacon(c,"")}};var Fc=a=>{var b=V;try{return b.querySelectorAll("*["+a+"]")}catch(c){return[]}};class Gc{constructor(a,b){this.error=a;this.context=b.context;this.msg=b.message||"";this.id=b.id||"jserror";this.meta={}}};const Hc=RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)");var Ic=class{constructor(a,b){this.h=a;this.i=b}},Jc=class{constructor(a,b){this.url=a;this.V=!!b;this.depth=null}};function Kc(a,b){const c={};c[a]=b;return[c]}function Lc(a,b,c,d,f){const e=[];jc(a,function(g,h){(g=Mc(g,b,c,d,f))&&e.push(h+"="+g)});return e.join(b)}
function Mc(a,b,c,d,f){if(null==a)return"";b=b||"&";c=c||",$";"string"==typeof c&&(c=c.split(""));if(a instanceof Array){if(d=d||0,d<c.length){const e=[];for(let g=0;g<a.length;g++)e.push(Mc(a[g],b,c,d+1,f));return e.join(c[d])}}else if("object"==typeof a)return f=f||0,2>f?encodeURIComponent(Lc(a,b,c,d,f+1)):"...";return encodeURIComponent(String(a))}function Nc(a){let b=1;for(const c in a.i)b=c.length>b?c.length:b;return 3997-b-a.j.length-1}
function Oc(a,b){let c="https://pagead2.googlesyndication.com"+b,d=Nc(a)-b.length;if(0>d)return"";a.h.sort(function(e,g){return e-g});b=null;let f="";for(let e=0;e<a.h.length;e++){const g=a.h[e],h=a.i[g];for(let m=0;m<h.length;m++){if(!d){b=null==b?g:b;break}let k=Lc(h[m],a.j,",$");if(k){k=f+k;if(d>=k.length){d-=k.length;c+=k;f=a.j;break}b=null==b?g:b}}}a="";null!=b&&(a=f+"trn="+b);return c+a}class Pc{constructor(){this.j="&";this.i={};this.m=0;this.h=[]}};function Qc(){var a=Rc,b=window.google_srt;0<=b&&1>=b&&(a.h=b)}function Sc(a,b,c,d=!1,f){if((d?a.h:Math.random())<(f||.01))try{let e;c instanceof Pc?e=c:(e=new Pc,jc(c,(h,m)=>{var k=e;const n=k.m++;h=Kc(m,h);k.h.push(n);k.i[n]=h}));const g=Oc(e,"/pagead/gen_204?id="+b+"&");g&&vc(p,g)}catch(e){}}class Tc{constructor(){this.h=Math.random()}};let Uc=null;function Vc(){const a=p.performance;return a&&a.now&&a.timing?Math.floor(a.now()+a.timing.navigationStart):Date.now()}function Wc(){const a=p.performance;return a&&a.now?a.now():null};class Xc{constructor(a,b){var c=Wc()||Vc();this.label=a;this.type=b;this.value=c;this.duration=0;this.uniqueId=Math.random();this.taskId=this.slotId=void 0}};const X=p.performance,Yc=!!(X&&X.mark&&X.measure&&X.clearMarks),Zc=na(()=>{var a;if(a=Yc){var b;if(null===Uc){Uc="";try{a="";try{a=p.top.location.hash}catch(c){a=p.location.hash}a&&(Uc=(b=a.match(/\bdeid=([\d,]+)/))?b[1]:"")}catch(c){}}b=Uc;a=!!b.indexOf&&0<=b.indexOf("1337")}return a});function $c(a){a&&X&&Zc()&&(X.clearMarks(`goog_${a.label}_${a.uniqueId}_start`),X.clearMarks(`goog_${a.label}_${a.uniqueId}_end`))}
class ad{constructor(){var a=window;this.i=[];this.j=a||p;let b=null;a&&(a.google_js_reporting_queue=a.google_js_reporting_queue||[],this.i=a.google_js_reporting_queue,b=a.google_measure_js_timing);this.h=Zc()||(null!=b?b:1>Math.random())}start(a,b){if(!this.h)return null;a=new Xc(a,b);b=`goog_${a.label}_${a.uniqueId}_start`;X&&Zc()&&X.mark(b);return a}end(a){if(this.h&&"number"===typeof a.value){a.duration=(Wc()||Vc())-a.value;var b=`goog_${a.label}_${a.uniqueId}_end`;X&&Zc()&&X.mark(b);!this.h||
2048<this.i.length||this.i.push(a)}}};function bd(a){let b=a.toString();a.name&&-1==b.indexOf(a.name)&&(b+=": "+a.name);a.message&&-1==b.indexOf(a.message)&&(b+=": "+a.message);if(a.stack){a=a.stack;var c=b;try{-1==a.indexOf(c)&&(a=c+"\n"+a);let d;for(;a!=d;)d=a,a=a.replace(RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),"$1");b=a.replace(RegExp("\n *","g"),"\n")}catch(d){b=c}}return b}
function cd(a,b,c){let d,f;try{a.h&&a.h.h?(f=a.h.start(b.toString(),3),d=c(),a.h.end(f)):d=c()}catch(e){c=!0;try{$c(f),c=a.s(b,new Gc(e,{message:bd(e)}),void 0,void 0)}catch(g){a.o(217,g)}if(c){let g,h;null==(g=window.console)||null==(h=g.error)||h.call(g,e)}else throw e;}return d}function dd(a,b){var c=ed;return(...d)=>cd(c,a,()=>b.apply(void 0,d))}
class fd{constructor(a=null){this.j=Rc;this.i=null;this.s=this.o;this.h=a;this.m=!1}pinger(){return this.j}o(a,b,c,d,f){f=f||"jserror";let e;try{const N=new Pc;var g=N;g.h.push(1);g.i[1]=Kc("context",a);b.error&&b.meta&&b.id||(b=new Gc(b,{message:bd(b)}));if(b.msg){g=N;var h=b.msg.substring(0,512);g.h.push(2);g.i[2]=Kc("msg",h)}var m=b.meta||{};b=m;if(this.i)try{this.i(b)}catch(I){}if(d)try{d(b)}catch(I){}d=N;m=[m];d.h.push(3);d.i[3]=m;d=p;m=[];let Ca;b=null;do{var k=d;try{var n;if(n=!!k&&null!=k.location.href)b:{try{Ea(k.foo);
n=!0;break b}catch(I){}n=!1}var l=n}catch(I){l=!1}l?(Ca=k.location.href,b=k.document&&k.document.referrer||null):(Ca=b,b=null);m.push(new Jc(Ca||""));try{d=k.parent}catch(I){d=null}}while(d&&k!=d);for(let I=0,nc=m.length-1;I<=nc;++I)m[I].depth=nc-I;k=p;if(k.location&&k.location.ancestorOrigins&&k.location.ancestorOrigins.length==m.length-1)for(l=1;l<m.length;++l){var t=m[l];t.url||(t.url=k.location.ancestorOrigins[l-1]||"",t.V=!0)}var A=m;let cb=new Jc(p.location.href,!1);k=null;const db=A.length-
1;for(t=db;0<=t;--t){var O=A[t];!k&&Hc.test(O.url)&&(k=O);if(O.url&&!O.V){cb=O;break}}O=null;const xd=A.length&&A[db].url;0!=cb.depth&&xd&&(O=A[db]);e=new Ic(cb,O);if(e.i){A=N;var Q=e.i.url||"";A.h.push(4);A.i[4]=Kc("top",Q)}var eb={url:e.h.url||""};if(e.h.url){var fb=e.h.url.match($b),da=fb[1],oc=fb[3],pc=fb[4];Q="";da&&(Q+=da+":");oc&&(Q+="//",Q+=oc,pc&&(Q+=":"+pc));var qc=Q}else qc="";da=N;eb=[eb,{url:qc}];da.h.push(5);da.i[5]=eb;Sc(this.j,f,N,this.m,c)}catch(N){try{Sc(this.j,f,{context:"ecmserr",
rctx:a,msg:bd(N),url:e&&e.h.url},this.m,c)}catch(Ca){}}return!0}};class gd{};let Rc,ed;const Y=new ad;var hd=()=>{window.google_measure_js_timing||(Y.h=!1,Y.i!=Y.j.google_js_reporting_queue&&(Zc()&&Array.prototype.forEach.call(Y.i,$c,void 0),Y.i.length=0))};(a=>{Rc=null!=a?a:new Tc;"number"!==typeof window.google_srt&&(window.google_srt=Math.random());Qc();ed=new fd(Y);ed.i=b=>{const c=yc;0!==c&&(b.jc=String(c),b.shv=zc(c))};ed.m=!0;"complete"==window.document.readyState?hd():Y.h&&U(window,"load",()=>{hd()})})();
var Z=(a,b)=>dd(a,b),id=a=>{var b=gd;var c="T";b.T&&b.hasOwnProperty(c)||(c=new b,b.T=c);b=[];!a.eid&&b.length&&(a.eid=b.toString());Sc(Rc,"gdn-asoch",a,!0)};function jd(a=window){return a};var kd=(a,b)=>{b=M(a,2)||b;if(!b)return"";if(P(a,13))return b;const c=/[?&]adurl=([^&]+)/.exec(b);if(!c)return b;const d=[b.slice(0,c.index+1)];tb(a,4).forEach((f,e)=>{d.push(encodeURIComponent(e)+"="+encodeURIComponent(f)+"&")});d.push(b.slice(c.index+1));return d.join("")},ld=(a,b=[])=>{b=0<b.length?b:Fc("data-asoch-targets");a=tb(a,1,Qb);const c=[];for(let h=0;h<b.length;++h){var d=b[h].getAttribute("data-asoch-targets"),f=d.split(","),e=!0;for(let m of f)if(!a.has(m)){e=!1;break}if(e){e=a.get(f[0]);
for(d=1;d<f.length;++d){var g=a.get(f[d]);e=Hb(e,!1).toJSON();g=g.toJSON();const m=Math.max(e.length,g.length);for(let k=0;k<m;++k)null==e[k]&&(e[k]=g[k]);e=new Qb(e)}f=tb(e,4);null!=F(e,5)&&f.set("nb",R(e,5,0).toString());c.push({element:b[h],data:e})}else id({type:1,data:d})}return c},od=(a,b,c,d)=>{c=kd(b,c);if(0!==c.length){if("2"===hc(c,"ase")&&1087!==d){let e;if(609===d)e=4;else{var f;e=(null==(f=V.featurePolicy)?0:f.allowedFeatures().includes("attribution-reporting"))?6:5}f="";md(c)?f=nd(ca(new fa({url:c})),
"nis",e.toString()):c=nd(c,"nis",e.toString());a.setAttribute("attributionsrc",f)}oa(a,Dc(c,Ec(d)));a.target||(a.target=null!=F(b,11)?M(b,11):"_top")}},pd=a=>{for(const b of a)if(a=b.data,"A"==b.element.tagName&&!P(a,1)){const c=b.element;od(c,a,c.href,609)}},md=a=>!/[?&]dsh=1(&|$)/.test(a)&&/[?&]ae=1(&|$)/.test(a),qd=a=>{const b=p.oneAfmaInstance;if(b)for(const c of a)if((a=c.data)&&void 0!==J(a,Ob,8)){const d=M(K(a,Ob,8),4);if(d){b.fetchAppStoreOverlay(d,void 0,M(K(a,Ob,8),6));break}}},rd=(a,b=
500)=>{const c=[],d=[];for(var f of a)(a=f.data)&&void 0!==J(a,T,12)&&(d.push(K(a,T,12)),c.push(K(a,T,12).B()));f=(e,g)=>{if(g)for(const h of d)g[h.B()]&&h.W(!0)};a=p.oneAfmaInstance;for(const e of c){let g;null==(g=a)||g.canOpenAndroidApp(e,f,()=>{},b)}},td=(a,b,c,d,f)=>{if(!b||void 0===J(b,Ob,8))return!1;const e=K(b,Ob,8);let g=M(e,2);tb(b,10).forEach((k,n)=>{var l=g;n=encodeURIComponent(n);const t=encodeURIComponent(k);k=new RegExp("[?&]"+n+"=([^&]+)");const A=k.exec(l);console.log(A);n=n+"="+
t;g=A?l.replace(k,A[0].charAt(0)+n):l.replace("?","?"+n+"&")});sd(b)&&P(b,15)&&!/[?&]label=/.test(c)&&(c=nd(c,"label","deep_link_fallback"));const h=k=>d.openStoreOverlay(k,void 0,M(e,6)),m=k=>xc(W,k);return d.redirectForStoreU2({clickUrl:c,trackingUrl:M(e,3),finalUrl:g,pingFunc:f?m:d.click,openFunc:(null==a?0:P(a,1))?h:d.openIntentOrNativeApp,isExternalClickUrl:P(b,13)})},vd=(a,b,c,d,f,e,g,h=!1)=>{f=P(f,15);const m=md(e);!a||!b||f&&m||(e=h?ud(e):ud(e,g.click));e&&e.startsWith("intent:")?g.openIntentOrNativeApp(e):
c?d?g.openBrowser(e):g.openChromeCustomTab(e):g.openSystemBrowser(e,{useFirstPackage:!0,useRunningProcess:!0})},ud=(a,b=null)=>{if(null!==b){const c=new fa({url:a});if(c.i&&c.j||c.o)return b(ca(c)),ea(c,1)}else return{X:b}={},b=new fa({url:a,X:b}),b.i&&b.j||b.o?navigator.sendBeacon?navigator.sendBeacon(ca(b),"")?ea(b,1):ea(b,2):ea(b,0):a;return a},wd=(a,b=!0,c=!1)=>{let d=!1;c&&W.navigator&&W.navigator.sendBeacon&&(d=W.navigator.sendBeacon(a));d||(b&&W.fetch?W.fetch(a,{method:"GET",keepalive:!0,mode:"no-cors"}).then(f=>
{f.ok||vc(W,a)}):vc(W,a))},nd=(a,b,c)=>{b=encodeURIComponent(String(b));c=encodeURIComponent(String(c));return a.replace("?","?"+b+"="+c+"&")},sd=a=>{for(const b of ub(a))if(3===R(b,1,0)&&M(b,2))return!0;return!1};var yd=(a,b)=>a&&(a=a.match(b+"=([^&]+)"))&&2==a.length?a[1]:"";var zd=class extends S{constructor(){super()}};function Ad(a,b){return G(a,2,b)}function Bd(a,b){return G(a,3,b)}function Cd(a,b){return G(a,4,b)}function Dd(a,b){return G(a,5,b)}function Ed(a,b){return G(a,9,b)}function Fd(a,b){return wb(a,10,b)}function Gd(a,b){return G(a,11,b)}function Hd(a,b){return G(a,1,b)}function Id(a,b){return G(a,7,b)}var Kd=class extends S{constructor(){super(void 0,-1,Jd)}},Jd=[10,6];const Ld="platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");function Md(a){let b;return null!=(b=a.google_tag_data)?b:a.google_tag_data={}}function Nd(a){let b,c;return"function"===typeof(null==(b=a.navigator)?void 0:null==(c=b.userAgentData)?void 0:c.getHighEntropyValues)}
function Od(){var a=window;if(!Nd(a))return null;const b=Md(a);if(b.uach_promise)return b.uach_promise;a=a.navigator.userAgentData.getHighEntropyValues(Ld).then(c=>{null!=b.uach||(b.uach=c);return c});return b.uach_promise=a}
function Pd(a){let b;return Gd(Fd(Dd(Ad(Hd(Cd(Id(Ed(Bd(new Kd,a.architecture||""),a.bitness||""),a.mobile||!1),a.model||""),a.platform||""),a.platformVersion||""),a.uaFullVersion||""),(null==(b=a.fullVersionList)?void 0:b.map(c=>{var d=new zd;d=G(d,1,c.brand);return G(d,2,c.version)}))||[]),a.wow64||!1)}function Qd(){let a,b;return null!=(b=null==(a=Od())?void 0:a.then(c=>Pd(c)))?b:null};function Rd(a){for(const b of a)if("A"==b.element.tagName){a=b.element;const c=b.data;null==F(c,2)&&G(c,2,a.href)}}function Sd(a,b){return ma(a,c=>c.element===b)}function Td(a){sc(Z(556,()=>{new Ud(a||{})}))}
function Vd(a,b,c,d){if(!P(d,13)){var f=c.href;var e=/[?&]adurl=([^&]+)/.exec(f);f=e?[f.slice(0,e.index),f.slice(e.index)]:[f,""];for(oa(c,Dc(f[0],Ec(557)));!c.id;)if(e="asoch-id-"+Zb(),!V.getElementById(e)){c.id=e;break}e=c.id;"function"===typeof window.xy&&window.xy(b,c,V.body);"function"===typeof window.mb&&window.mb(c);"function"===typeof window.bgz&&window.bgz(e);"function"===typeof window.ja&&window.ja(e,d?R(d,5,0):0);"function"===typeof window.vti&&window.vti(e);a.o&&"function"===typeof window.ss&&
(a.O?window.ss(e,1,a.o):window.ss(a.o,1));0<f.length&&(a=0<a.D.length&&(null==d||null==F(d,19))?c.href+"&uach="+encodeURIComponent(a.D)+f[1]:c.href+f[1],oa(c,Dc(a,Ec(557))))}}async function Wd(a,b,c,d){let f="";var e=p.oneAfmaInstance;if(e&&(b.preventDefault(),f=await e.appendClickSignalsAsync(c.href)||"",a.L&&(e=await e.getNativeClickMeta()))){if(e.customClickGestureEligible)return;f=nd(f,"nas",e.encodedNas)}Xd(a,b,c,d,f)}
function Xd(a,b,c,d,f){const e=P(a.i,2),g=e&&300<Date.now()-a.N,h=p.oneAfmaInstance;h?(kc(b),(()=>{let m=h.logScionEventAndAddParam(f);if(!a.s&&d&&void 0!==J(d,T,12)){var k=K(d,T,12).B();if(0<ub(d).length)for(const n of ub(d));P(K(d,T,12),2)?(h.click(m),h.openAndroidApp(k),k=!0):k=!1}else k=!1;k||td(a.C,d,m,h,a.Z)||vd(e,g,a.ba,a.s,d,m,h,a.aa)})()):(P(a.i,21)&&c.href&&"_blank"!==c.target&&(a.m=hc(c.href,"ai")||"")&&(a.j="clicked"),b=window,a.Y&&b.pawsig&&"function"===typeof b.pawsig.clk?b.pawsig.clk(c):
g&&(b="2"===hc(c.href,"ase")&&md(c.href)?ud(c.href,()=>{}):a.ca?ud(c.href,m=>{W.fetch(m,{method:"GET",keepalive:!0,mode:"no-cors"})}):ud(c.href),b!==c.href&&oa(c,Dc(b,Ec(599)))));g&&(a.N=Date.now());Bc(a.M)}
var Ud=class{constructor(a){this.s=Ha||Fa||Ia||Ga;var b=Fc("data-asoch-meta");if(1!==b.length)id({type:2,data:b.length});else{this.M=70;this.i=new Sb(JSON.parse(b[0].getAttribute("data-asoch-meta"))||[]);this.K=a["extra-meta"]?new Sb(JSON.parse(a["extra-meta"])):null;this.L="true"===a["is-fsn"];this.C=a["ios-store-overlay-config"]?new Tb(JSON.parse(a["ios-store-overlay-config"])):null;this.ba="true"===a["use-cct-over-browser"];this.Z="true"===a["send-ac-click-ping-by-js"];this.P="true"===a["correct-redirect-url-for-och-15-click"];
this.aa="true"===a["send-click-ping-by-js-in-och"];this.Y="true"===a["enable-paw"];this.ca="true"===a["async-using-fetch"];this.j=this.m="";this.G=this.F=-1;this.D="";b=Qd();null!=b&&b.then(d=>{d=Ib(d);for(var f=[],e=0,g=0;g<d.length;g++){var h=d.charCodeAt(g);255<h&&(f[e++]=h&255,h>>=8);f[e++]=h}this.D=La(f,3)});this.h=ld(this.i);this.da=Number(a["deeplink-and-android-app-validation-timeout"])||500;this.N=-Infinity;this.o=M(this.i,5)||"";this.O=P(this.i,11);this.K&&(this.O=P(this.K,11));this.I=this.H=
null;P(this.i,3)||(pd(this.h),G(this.i,3,!0));Rd(this.h);a=p.oneAfmaInstance;!this.s&&a&&rd(this.h,this.da);var c;if(a&&(null==(c=this.C)?0:P(c,2)))switch(c=()=>{const d=L(F(this.C,4),0);0<d?p.setTimeout(()=>{qd(this.h)},d):qd(this.h)},R(this.C,3,0)){case 1:a.runOnOnShowEvent(c);break;case 2:tc(c);break;default:qd(this.h)}U(V,"click",Z(557,d=>{a:if(!d.defaultPrevented||this.H===d){for(var f,e,g=d.target;(!f||!e)&&g;){e||"A"!=g.tagName||(e=g);var h=g.hasAttribute("data-asoch-targets"),m=g.hasAttribute("data-asoch-fixed-value");
if(!f)if(m)f=new Qb(JSON.parse(g.getAttribute("data-asoch-fixed-value"))||[]);else if("A"==g.tagName||h)if(h=h&&"true"===g.getAttribute("data-asoch-is-dynamic")?ld(this.i,[g]):this.h,h=Sd(h,g))f=h.data;g=g.parentElement}if(g=f&&!P(f,1)){if(d.defaultPrevented){var k=e,n=f;if(this.H===d&&this.I){e=new Nb(this.I);f=M(n,9);var l="";switch(R(e,4,1)){case 2:if(L(F(e,2),0))l="blocked_fast_click";else if(M(e,1)||M(e,7))l="blocked_border_click";break;case 3:l=V,l=l.getElementById?l.getElementById("common_15click_anchor"):
null,"function"===typeof window.copfcChm&&l&&(n=Hb(n,!1),G(n,5,12),tb(n,4).set("nb",(12).toString()),(g=Sd(this.h,l))?g.data=n:this.h.push({element:l,data:n}),!this.P&&k&&(Vd(this,d,k,n),G(n,2,k.href)),window.copfcChm(d,kd(n,l.href),null,void 0!==J(e,Mb,10)?Ib(K(e,Mb,10)):null),this.P&&Vd(this,d,l,n)),l="onepointfiveclick_first_click"}f&&l&&wd(f+"&label="+l,!1);Bc(this.M)}break a}h=f;for(l of rb(h,6))wd(l)}if(e&&g){f=g?f:null;(l=Sd(this.h,e))?l=l.data:(l=new Qb,G(l,2,e.href),G(l,11,e.target||"_top"),
this.h.push({element:e,data:l}));od(e,f||l,M(l,2),557);Vd(this,d,e,f);for(n of rb(this.i,17))l=n,g=V.body,h={},"function"===typeof window.CustomEvent?m=new CustomEvent(l,h):(m=document.createEvent("CustomEvent"),m.initCustomEvent(l,!!h.bubbles,!!h.cancelable,h.detail)),g.dispatchEvent(m);if(null==f?0:null!=F(f,19)){n=new Lb;G(n,1,R(f,5,0));l=yd(e.href,"nx");""!=l&&G(n,2,+l);l=yd(e.href,"ny");""!=l&&G(n,3,+l);l=yd(e.href,"bg");""!=l&&G(n,4,l);l=yd(e.href,"nm");""!=l&&G(n,5,+l);l=yd(e.href,"mb");""!=
l&&G(n,6,+l);l=M(f,19);g=null!=F(f,20)?L(F(f,20),0):null;n=Ib(n);h=this.D;m=jd(p);const t=new Ub;G(t,1,l);null!==g&&G(t,2,g);null!==h&&G(t,3,h);G(t,4,n);null==m||null==(k=m.fence)||k.reportEvent({eventType:"click",eventData:JSON.stringify(t),destination:["buyer"]})}P(this.i,16)||this.L?Wd(this,d,e,f):(k="",(n=p.oneAfmaInstance)&&(k=n.appendClickSignals(e.href)),Xd(this,d,e,f,k))}}}),Vb);!a&&P(this.i,21)&&(U(W,"pagehide",Z(1037,()=>{if(this.m&&this.j&&(this.j+="+pagehide",this.G=Date.now(),-1!==this.F)){var d=
{id:"visibilityBeforePagehide",payload:this.j,delay:this.G-this.F,isios:this.s,clickstring:this.m};wd(ic(fc(),d),!1,!0)}})),U(V,"visibilitychange",Z(1067,()=>{if("visible"===V.visibilityState)this.m=this.j="",this.G=this.F=-1;else if("hidden"===V.visibilityState&&this.j&&this.m){this.F=Date.now();var d={id:"visibilityhidden",payload:this.j,isios:this.s,clickstring:this.m};wd(ic(fc(),d),!1,!0)}})));this.o&&"function"===typeof window.ss&&U(V.body,"mouseover",Z(626,()=>{window.ss(this.o,0)}),Wb);"function"===
typeof window.ivti&&window.ivti(window);c=window;c.googqscp&&"function"===typeof c.googqscp.registerCallback&&c.googqscp.registerCallback((d,f)=>{this.H=d;this.I=f})}}};var Yd=Z(555,a=>Td(a));yc=70;const Zd=Ac(70,document.currentScript);if(null==Zd)throw Error("JSC not found 70");const $d={},ae=Zd.attributes;for(let a=ae.length-1;0<=a;a--){const b=ae[a].name;0===b.indexOf("data-jcp-")&&($d[b.substring(9)]=ae[a].value)}Yd($d);}).call(this);
