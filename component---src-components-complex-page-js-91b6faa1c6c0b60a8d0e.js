(self.webpackChunkgatsby_complex_mdx_pages=self.webpackChunkgatsby_complex_mdx_pages||[]).push([[690],{7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.default=e.exports,e.exports.__esModule=!0},3646:function(e,t,r){var n=r(7228);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},9100:function(e,t,r){var n=r(9489),o=r(7067);function u(t,r,c){return o()?(e.exports=u=Reflect.construct,e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=u=function(e,t,r){var o=[null];o.push.apply(o,t);var u=new(Function.bind.apply(e,o));return r&&n(u,r.prototype),u},e.exports.default=e.exports,e.exports.__esModule=!0),u.apply(null,arguments)}e.exports=u,e.exports.default=e.exports,e.exports.__esModule=!0},9713:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},7067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.default=e.exports,e.exports.__esModule=!0},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,r){var n=r(3646),o=r(6860),u=r(379),c=r(8206);e.exports=function(e){return n(e)||o(e)||u(e)||c()},e.exports.default=e.exports,e.exports.__esModule=!0},379:function(e,t,r){var n=r(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},6725:function(e,t,r){var n=r(3395);e.exports={MDXRenderer:n}},3395:function(e,t,r){var n=r(9100),o=r(319),u=r(9713),c=r(7316),l=["scope","children"];function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p=r(7294),i=r(4983).mdx,f=r(9480).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,u=c(e,l),s=f(t),d=p.useMemo((function(){if(!r)return null;var e=a({React:p,mdx:i},s),t=Object.keys(e),u=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(o(t),[""+r])).apply(void 0,[{}].concat(o(u)))}),[r,t]);return p.createElement(d,a({},u))}},6371:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return a}});var n=r(7294),o=r(6725),u=r(2718),c=r(7740);function l(e){var t=e.children;return n.createElement("main",{className:"w-full"},t)}function s(e){var t=e.children;return n.createElement("aside",{className:"w-full sm:w-[60%] p-3 border border-gray-200 rounded-md sm:mt-0 mt-5"},t)}function a(e){var t=e.data.allFile.nodes.reduce((function(e,t){return e[t.fields.sectionName]=t.childMdx,e}),{}),r=t.content,a=t.aside;return n.createElement(u.Z,null,r&&n.createElement(l,null,n.createElement(c.Z,null,r.frontmatter.title),n.createElement(o.MDXRenderer,null,r.body)),a&&n.createElement(s,null,n.createElement(o.MDXRenderer,null,a.body)))}}}]);
//# sourceMappingURL=component---src-components-complex-page-js-91b6faa1c6c0b60a8d0e.js.map